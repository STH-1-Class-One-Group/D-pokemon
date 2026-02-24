import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import Quiz from './pages/Quiz';
import { getPokemonList } from './api/pokemonapi'; 
import { type PokemonSummary } from './types/pokemon';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonSummary[]>([]); 

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getPokemonList(20, 0); 
        setPokemonList(data); 
        console.log("🔥 데이터 저장 완료!", data);
      } catch (error) {
        console.error("❌ 로드 실패:", error);
      }
    };
    fetchPokemons();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* 재혁님의 pokemonList 데이터를 Pokedex 페이지로 전달합니다 */}
          <Route path="/pokedex" element={<Pokedex pokemonList={pokemonList} />} />
          <Route path="/quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;