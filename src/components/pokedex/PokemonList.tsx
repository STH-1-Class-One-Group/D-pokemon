// src/components/pokedex/PokemonList.tsx
import './pokedex.css';
import { type PokemonSummary } from '../../types/pokemon'; // 경로 주의! 한 단계 더 올라가야 할 수도 있어요.
import PokemonCard from './PokemonCard'; // 기존에 있던 카드 컴포넌트

// 1. props의 타입을 정의해줍니다.
interface PokemonListProps {
    list: PokemonSummary[];
}

// 2. 함수에서 list를 받도록 설정합니다.
function PokemonList({ list }: PokemonListProps) {
    return (
        <div className="pokemon-list">
            {/* 3. 이제 가짜 데이터 대신 진짜 list를 사용해서 화면을 그립니다! */}
            {list.map((pokemon) => (
                <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
            ))}
        </div>
    );
}

export default PokemonList;