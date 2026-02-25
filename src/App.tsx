import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import Quiz from './pages/Quiz';
import './App.css';

function App() {
  // 짐을 다 옮겼으니 여기 있던 모든 useState와 useEffect는 지웠습니다! ✨

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* ✅ Pokedex는 이제 스스로 데이터를 관리하니까 props를 다 지워줍니다! */}
          <Route path="/pokedex" element={<Pokedex />} />

          <Route path="/quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;