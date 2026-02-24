import React from 'react';
import './pokedex.css'; // 이 연결이 핵심입니다.

const PokemonList = () => {
    const dummyPokemons = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `포켓몬 ${i + 1}`,
    }));

    return (
        <div className="pokemon-grid">
            {dummyPokemons.map((pokemon) => (
                <div key={pokemon.id} className="pokemon-card">
                    <div className="image-placeholder">No Image</div>
                    <p className="pokemon-name">{pokemon.name}</p>
                </div>
            ))}
        </div>
    );
};

export default PokemonList;