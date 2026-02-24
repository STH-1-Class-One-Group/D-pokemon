// src/api/pokemonapi.ts
import axios from 'axios';
import { type PokemonSummary } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// C파트 재혁님의 '무한 스크롤'을 위해 limit와 offset을 인자로 받습니다.
export const getPokemonList = async (limit: number = 20, offset: number = 0) => {
  try {
    // 비동기(async/await)로 데이터를 가져옵니다.
    const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    
    // 결과값: { results: [ {name, url}, ... ] }
    return response.data.results as PokemonSummary[];
  } catch (error) {
    console.error("포켓몬 리스트를 가져오는데 실패했습니다.", error);
    return [];
  }
};