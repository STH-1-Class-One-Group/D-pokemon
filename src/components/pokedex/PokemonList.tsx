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
                <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
            ))}
        </div>
    );
}

export default PokemonList;