// SearchBar.tsx 내부 예시
const filteredList = pokemonList.filter((pokemon) => 
  // 기존: pokemon.name.includes(searchTerm)
  // 변경: 한글 이름을 기준으로 검색
  pokemon.korean_name?.includes(searchTerm)
);