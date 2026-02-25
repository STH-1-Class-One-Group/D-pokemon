import React from 'react';
import type { PokemonSummary } from '../../types/pokemon'; // 1. 타입 임포트 확인!

// 2. 부모(Pokedex.tsx 등)로부터 받아올 데이터의 규격을 정합니다 (Interface)
interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  pokemonList: PokemonSummary[]; // 이 줄이 있어야 pokemonList를 쓸 수 있어요!
}

// 3. 컴포넌트 인자(Props) 부분에 위에서 정한 규격을 연결합니다.
const SearchBar = ({ searchTerm, setSearchTerm, pokemonList }: SearchBarProps) => {
  
  // 4. 한글 이름으로 필터링하는 로직
  const filteredList = pokemonList.filter((pokemon: PokemonSummary) => 
    pokemon.korean_name?.includes(searchTerm) // 'any' 에러를 피하기 위해 타입을 명시함
  );

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="포켓몬 이름을 입력하세요 (ex. 피카츄)"
      />
      {/* 검색 결과 UI 로직... */}
    </div>
  );
};

export default SearchBar;