// pages/Pokedex.tsx
import React from 'react';
import PokemonList from '../components/pokedex/PokemonList';

const Pokedex = () => {
    return (
        <div className="pokedex-page">
            <h1>포켓몬 도감</h1>
            <PokemonList />
        </div>
    );
};

export default Pokedex;