import React from 'react';
import PokemonList from '../components/pokedex/PokemonList';

const Pokedex = () => {
    return (
        /* 아래 div에 'pokedex-container' 클래스를 추가했습니다. 
            이제 CSS에서 .pokedex-container h1 { ... } 로 접근하여 
            디자인을 확실하게 바꿀 수 있습니다. 
        */
        <div className="pokedex-container">
            <h1>포켓몬 도감</h1>
            <PokemonList />
        </div>
    );
};

export default Pokedex;