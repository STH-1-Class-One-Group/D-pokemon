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
                    key={pokemon.id}       // (1) 리액트 내부 식별용 key
                    id={pokemon.id}        // (2) 카드 컴포넌트에 넘겨줄 id props
                    name={pokemon.name}
                    url={pokemon.url}
                    korean_name={pokemon.korean_name} 
                />
))}
        </div>
    );
}

export default PokemonList;