// src/App.tsx (임시 테스트용)
import { useEffect } from 'react';
import { getPokemonList } from './api/pokemonapi';

function App() {
  useEffect(() => {
    const testFetch = async () => {
      const data = await getPokemonList(20, 0);
      console.log("🔥 API 연결 성공! 포켓몬 20마리:", data);
    };
    testFetch();
  }, []);

  return <div>배포 및 API 테스트 중...</div>;
}