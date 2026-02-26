import axios from 'axios';
import { type PokemonSummary } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// 1. [메인] 포켓몬 리스트 가져오기 (기존 기능 유지)
export const getPokemonList = async (limit: number, offset: number): Promise<PokemonSummary[]> => {
  console.group(`📡 포켓몬 리스트 요청 (Offset: ${offset})`);
  console.time('⏱️ 리스트 로딩 시간');

  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const basicList = response.data.results;
    
    const detailedList = await Promise.all(
      basicList.map(async (pokemon: any) => {
        const id = parseInt(pokemon.url.split('/').filter(Boolean).pop());
        
        // 상세(species) 정보 요청 (한글 이름용)
        try {
          const speciesRes = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
          const koreanName = speciesRes.data.names.find((n: any) => n.language.name === 'ko')?.name;
          return {
            ...pokemon,
            id: id,
            korean_name: koreanName || pokemon.name 
          };
        } catch (e) {
          return { ...pokemon, id: id, korean_name: pokemon.name };
        }
      })
    );

    console.timeEnd('⏱️ 리스트 로딩 시간');
    console.groupEnd();
    return detailedList;

  } catch (error) {
    console.error("🚨 리스트 불러오기 실패:", error);
    console.groupEnd();
    return [];
  }
};

// 2. [상세] 모달용 데이터 가져오기 (특성/기술 한글화 추가!) ✨ 핵심 수정
export const getPokemonDetail = async (id: number) => {
  console.log(`🔍 상세 정보 요청 ID: ${id}`);
  
  try {
    const pokemonRes = await axios.get(`${BASE_URL}/pokemon/${id}`);
    const speciesRes = await axios.get(`${BASE_URL}/pokemon-species/${id}`);

    // (1) 타입 한글 변환
    const typesWithKorean = await Promise.all(
      pokemonRes.data.types.map(async (t: any) => {
        const typeRes = await axios.get(t.type.url);
        const name = typeRes.data.names.find((n: any) => n.language.name === 'ko')?.name;
        return name || t.type.name;
      })
    );

    // (2) ✨ 특성(Abilities) 한글 변환 (여기가 없어서 안 떴던 것!)
    const abilitiesWithKorean = await Promise.all(
        pokemonRes.data.abilities.map(async (a: any) => {
            const abilityRes = await axios.get(a.ability.url);
            const name = abilityRes.data.names.find((n: any) => n.language.name === 'ko')?.name;
            return name || a.ability.name;
        })
    );

    // (3) ✨ 기술(Moves) 한글 변환 (너무 많아서 상위 15개만)
    const movesWithKorean = await Promise.all(
        pokemonRes.data.moves.slice(0, 15).map(async (m: any) => {
            const moveRes = await axios.get(m.move.url);
            const name = moveRes.data.names.find((n: any) => n.language.name === 'ko')?.name;
            return name || m.move.name;
        })
    );

    // (4) 한글 설명
    const flavorTextEntry = speciesRes.data.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'ko'
    );
    const description = flavorTextEntry ? flavorTextEntry.flavor_text : "설명이 없습니다.";

    // 모달이 사용할 최종 데이터 조립
    const detailData = {
      id: pokemonRes.data.id,
      name: speciesRes.data.names.find((n: any) => n.language.name === 'ko')?.name || pokemonRes.data.name,
      korean_name: speciesRes.data.names.find((n: any) => n.language.name === 'ko')?.name,
      height: pokemonRes.data.height / 10, // m
      weight: pokemonRes.data.weight / 10, // kg
      types: typesWithKorean,         // ["풀", "독"]
      abilities: abilitiesWithKorean, // ["심록", "엽록소"]
      moves: movesWithKorean,         // ["몸통박치기", ...]
      description: description,
      image: pokemonRes.data.sprites.other['official-artwork'].front_default
    };

    console.log("✨ 상세 데이터 준비 완료:", detailData);
    return detailData;

  } catch (error) {
    console.error(`🚨 상세 정보(${id}) 불러오기 실패:`, error);
    throw error;
  }
};