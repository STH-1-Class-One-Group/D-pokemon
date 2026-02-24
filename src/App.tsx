import { useEffect, useState, useRef } from 'react';
import Pokedex from './pages/Pokedex';
import { getPokemonList } from './api/pokemonapi'; 
import { type PokemonSummary } from './types/pokemon';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonSummary[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);

  // [중요!] 1. 처음에 20마리를 불러오는 '진짜' 첫 비동기 요청입니다.
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
  }, []); // 빈 배열 [] 이므로 딱 한 번만 실행됨

  // 2. 추가 데이터를 가져오는 함수
  const loadMore = async () => {
    if (isLoading) return; // 이미 가져오는 중이면 중복 요청 방지 (비동기 제어)

    setIsLoading(true);
    try {
      const newOffset = offset + 20;
      const data = await getPokemonList(20, newOffset);
      
      if (data && data.length > 0) {
        setPokemonList(prev => [...prev, ...data]); // 기존 리스트 + 새 데이터 (누적)
        setOffset(newOffset); // 다음 번을 위해 번호 업데이트
        console.log("➕ 추가 데이터 로드 완료!", newOffset);
      }
    } catch (error) {
      console.error("추가 로드 에러:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. 경비원(Observer) 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 화면에 바닥이 보이고, 로딩 중이 아닐 때만 실행
        if (entries[0].isIntersecting && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.5 } // 50% 정도 보이면 미리 불러오기 (더 부드러움)
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
    // 의존성 배열에 loadMore에 필요한 값들을 넣어줍니다.
  }, [offset, isLoading]); 

  return (
    <div className="App">
      <Pokedex pokemonList={pokemonList} />

      {/* 바닥 감지용 타겟 */}
      <div ref={observerTarget} style={{ height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {isLoading && <p style={{ color: '#888' }}>새로운 포켓몬을 찾는 중... 🔍</p>}
      </div>
    </div>
  );
}

export default App;