import './Pokedex.css';
import { type PokemonSummary } from '../../types/pokemon';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
    list: PokemonSummary[];
}

function PokemonList({ list }: PokemonListProps) {
    return (
        <div className="pokemon-list">
            {list.map((pokemon) => (
    <PokemonCard 
        key={pokemon.id}
        name={pokemon.name}
        url={pokemon.url}
        // 👇 바로 이 줄을 추가해야 최종적으로 카드에 한글 이름이 전달됩니다!
        korean_name={pokemon.korean_name} 
    />
))}
        </div>
    );
}

export default PokemonList;