import axios from 'axios';
// PokemonDetail 타입이 아직 없으실 수 있어서 일단 any로 처리하거나 
// types/pokemon.ts에 정의되어 있다면 import { PokemonSummary, PokemonDetail } from ... 로 쓰시면 됩니다.
import { type PokemonSummary } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// 1. [메인] 포켓몬 리스트 가져오기 (로그 강화 + 한글 패치)
export const getPokemonList = async (limit: number, offset: number): Promise<PokemonSummary[]> => {
  // [로그] 요청 그룹 시작
  console.group(`포켓몬 리스트 요청 (Offset: ${offset})`);
  console.time('API 소요 시간');

  try {
    // 기본 리스트 요청
    const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const basicList = response.data.results;
    
    console.log(`1차 데이터 수신 (${basicList.length}마리)`);

    // 병렬로 한글 이름 가져오기
    const detailedList = await Promise.all(
      basicList.map(async (pokemon: any) => {
        const id = parseInt(pokemon.url.split('/').filter(Boolean).pop());
        
        // 상세(species) 정보 요청
        const speciesRes = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
        
        // 한글 이름 추출
        const koreanName = speciesRes.data.names.find((n: any) => n.language.name === 'ko')?.name;

        return {
          ...pokemon,
          id: id,
          korean_name: koreanName || pokemon.name // 한글 없으면 영어
        };
      })
    );

    console.log("최종 데이터 변환 완료:", detailedList);
    console.timeEnd('API 소요 시간');
    console.groupEnd(); // 로그 그룹 종료

    return detailedList;

  } catch (error) {
    console.error("리스트 불러오기 실패:", error);
    console.groupEnd();
    return [];
  }
};

// 2. [신규] 상세 모달용 데이터 가져오기 (앞으로 쓰실 것!)
// 카드를 클릭했을 때 호출될 함수입니다.
export const getPokemonDetail = async (id: number) => {
  console.log(`🔍 상세 정보 요청 ID: ${id}`);
  
  try {
    // 포켓몬 기본 정보 (키, 몸무게, 이미지, 타입 등)
    const pokemonRes = await axios.get(`${BASE_URL}/pokemon/${id}`);
    // 포켓몬 종 정보 (한글 설명, 분류 등)
    const speciesRes = await axios.get(`${BASE_URL}/pokemon-species/${id}`);

    // 한글 타입 이름 가져오기 (조금 복잡하지만 고퀄리티를 위해!)
    const typesWithKorean = await Promise.all(
      pokemonRes.data.types.map(async (t: any) => {
        const typeUrl = t.type.url;
        const typeRes = await axios.get(typeUrl);
        const koreanType = typeRes.data.names.find((n: any) => n.language.name === 'ko')?.name;
        return { slot: t.slot, name: koreanType || t.type.name };
      })
    );

    // 한글 설명(Flavor Text) 찾기
    const flavorTextEntry = speciesRes.data.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'ko'
    );
    const description = flavorTextEntry ? flavorTextEntry.flavor_text : "설명이 없습니다.";

    const detailData = {
      id: pokemonRes.data.id,
      name: speciesRes.data.names.find((n: any) => n.language.name === 'ko')?.name || pokemonRes.data.name,
      height: pokemonRes.data.height / 10, // m 단위 변환
      weight: pokemonRes.data.weight / 10, // kg 단위 변환
      types: typesWithKorean.map(t => t.name), // ["풀", "독"]
      description: description, // "태어날 때부터 등에 식물의 씨앗이..."
      stats: pokemonRes.data.stats // 공격, 방어 등 스탯
    };

    console.log( "상세 데이터 로드 완료:", detailData);
    return detailData;

  } catch (error) {
    console.error(`상세 정보(${id}) 불러오기 실패:`, error);
    throw error;
  }
};