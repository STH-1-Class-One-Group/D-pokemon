// src/pages/Pokedex.tsx
import { type PokemonSummary } from '../types/pokemon';
import PokemonList from '../components/pokedex/PokemonList';
import '../components/pokedex/pokedex.css'; // CSS 파일 경로 확인!

interface PokedexProps {
    pokemonList: PokemonSummary[];
}

function Pokedex({ pokemonList }: PokedexProps) {
    return (
        /* 1. 전체를 감싸는 컨테이너 */
        <div className="pokedex-container">

            {/* 2. 검색 섹션 (UI만 먼저 배치) */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="포켓몬을 검색하세요!"
                    className="search-input"
                />
            </div>

            {/* 3. 퀴즈 배너 */}
            <div className="quiz-banner">
                <p>오늘의 포켓몬 퀴즈에 도전해보세요!</p>
                <button className="quiz-button">퀴즈 시작</button>
            </div>

            {/* 4. 도감 제목 */}
            <h1>포켓몬 도감</h1>

            {/* 5. 실제 카드 리스트 (그리드 레이아웃 적용됨) */}
            <PokemonList list={pokemonList} />

        </div>
    );
}

export default Pokedex;