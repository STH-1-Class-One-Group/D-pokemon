import { type PokemonSummary } from '../types/pokemon';
import PokemonList from '../components/pokedex/PokemonList';
import '../components/pokedex/pokedex.css';

interface PokedexProps {
    pokemonList: PokemonSummary[];
}

function Pokedex({ pokemonList }: PokedexProps) {
    return (
        <div className="pokedex-container">
            <div className="search-section">
                <input
                    type="text"
                    placeholder="포켓몬을 검색하세요!"
                    className="search-input"
                />
            </div>

            <div className="quiz-banner">
                <p>오늘의 포켓몬 퀴즈에 도전해보세요!</p>
                <button className="quiz-button">퀴즈 시작</button>
            </div>

            <h1>포켓몬 도감</h1>
            <PokemonList list={pokemonList} />
        </div>
    );
}

export default Pokedex;