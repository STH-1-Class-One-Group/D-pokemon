// src/types/pokemon.ts

// 리스트 요청 시 응답받는 기본 형태
export interface PokemonSummary {
  id: number;
  name: string;      // 영문 이름 (기존)
  url: string;
  korean_name?: string; // 추가: 한글 이름 (API 응답 전엔 없을 수 있으니 ? 사용)
  // ... 기타 기존 속성들
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