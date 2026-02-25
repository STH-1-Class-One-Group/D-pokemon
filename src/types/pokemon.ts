// src/types/pokemon.ts

// 리스트 요청 시 응답받는 기본 형태
export interface PokemonSummary {
  name: string;
  url: string; // 상세 정보를 가져올 수 있는 주소
}

// 우리가 실제 도감 카드에 보여줄 알맹이
export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string; // 기본 이미지
    other: {
      'official-artwork': {
        front_default: string; // 고화질 이미지
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
} 