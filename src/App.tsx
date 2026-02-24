import { useEffect, useState } from 'react';
import Pokedex from './pages/Pokedex';
import { getPokemonList } from './api/pokemonapi'; 
import { type PokemonSummary } from './types/pokemon'; // 포켓몬 데이터의 타입을 불러옵니다.
import './App.css';

function App() {
  // 1. 바구니에 담길 데이터가 PokemonSummary 배열이라는 것을 알려줍니다.
  const [pokemonList, setPokemonList] = useState<PokemonSummary[]>([]); 

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // 2. 민권님이 만든 함수로 데이터를 가져옵니다.
        const data = await getPokemonList(20, 0); 
        
        // 3. 가져온 데이터를 바구니에 저장합니다.
        setPokemonList(data); 
        
        console.log("🔥 데이터 저장 완료!", data);
      } catch (error) {
        console.error("❌ 로드 실패:", error);
      }
    };
    fetchPokemons();
  }, []);

  return (
    <div className="App">
      {/* 4. 저장된 리스트를 Pokedex로 전달합니다. */}
      <Pokedex pokemonList={pokemonList} />
    </div>
  );
}

export default App;