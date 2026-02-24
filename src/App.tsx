import { useEffect, useState, useRef } from 'react';
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
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);

  // 1. 처음 20마리 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const data = await getPokemonList(20, 0);
        setPokemonList(data);
        console.log("🔥 첫 데이터 로드 완료!");
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // 2. 추가 데이터를 가져오는 함수
  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newOffset = offset + 20;
      const data = await getPokemonList(20, newOffset);
      if (data && data.length > 0) {
        setPokemonList(prev => [...prev, ...data]);
        setOffset(newOffset);
      }
    } catch (error) {
      console.error("추가 로드 에러:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. 바닥 감지 경비원(Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => observer.disconnect();
  }, [offset, isLoading]); 

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={
            <>
              <Pokedex pokemonList={pokemonList} />
              {/* 바닥 감지용 타겟을 Pokedex 하단에 배치 */}
              <div ref={observerTarget} style={{ height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {isLoading && <p style={{ color: '#888' }}>새로운 포켓몬을 찾는 중... 🔍</p>}
              </div>
            </>
          } />
          <Route path="/quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;