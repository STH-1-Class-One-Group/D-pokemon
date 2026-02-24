<<<<<<< HEAD
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import Quiz from './pages/Quiz';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 모든 페이지에 공통 상단바/하단바를 적용하기 위해 Layout으로 감쌉니다 */}
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
=======
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
>>>>>>> origin/feature/core-api-mk
