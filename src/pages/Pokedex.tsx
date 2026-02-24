import React from 'react';
import PokemonList from '../components/pokedex/PokemonList';

const Pokedex = () => {
    return (
        <div className="pokedex-container">
            <div className="search-section">
                <input type="text" placeholder="포켓몬을 검색하세요" className="search-input" />
            </div>
            <div className="quiz-banner">
                <p>카드를 클릭해 포켓몬 정보를 학습하고 퀴즈에 도전하세요!</p>
                <button className="quiz-button">포켓몬 퀴즈</button>
            </div>
            <h1>포켓몬 도감</h1>
            <PokemonList />
        </div>
    );
};

export default Pokedex;