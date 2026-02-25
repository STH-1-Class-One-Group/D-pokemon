// src/api/pokemonapi.ts
import axios from 'axios';
import { type PokemonSummary } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// 예시 코드 (민권님의 기존 코드 구조에 맞춰 적용하세요)
export const getPokemonList = async (limit: number, offset: number) => {
  // 1. 기본 리스트 가져오기
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const basicList = response.data.results;

  // 2. 각 포켓몬의 상세 정보(한글 이름)를 병렬로 가져오기 (Promise.all 활용!)
  const detailedList = await Promise.all(
    basicList.map(async (pokemon: any) => {
      const id = pokemon.url.split('/').filter(Boolean).pop(); // URL에서 ID 추출
      const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      
      // 한글 이름 찾기
      const koreanNameRow = speciesRes.data.names.find((name: any) => name.language.name === 'ko');
      
      return {
        ...pokemon,
        id: Number(id),
        korean_name: koreanNameRow ? koreanNameRow.name : pokemon.name // 한글 이름 없으면 영어로 대체
      };
    })
  );

  return detailedList;
};