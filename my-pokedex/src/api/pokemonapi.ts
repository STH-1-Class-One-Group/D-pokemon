import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
});

// 한 마리 상세 정보 (객체 응용 공부용)
export const getPokemonDetail = async (id: number | string) => {
    const response = await api.get(`pokemon/${id}`);
    return response.data;
};

// 여러 마리 목록 (비동기 처리 공부용)
export const getPokemonList = async (limit = 20) => {
    const response = await api.get(`pokemon?limit=${limit}`);
    return response.data.results;
};