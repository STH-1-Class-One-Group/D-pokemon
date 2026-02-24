// components/pokedex/PokemonList.tsx
import React from 'react';
import './PokemonList.css'; // 임시 CSS 파일

const PokemonList = () => {
    // 민권님이 API를 완성하기 전까지 우리가 쓸 가짜 데이터
    const dummyData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));

    return (
        <div className="card-grid"> {/* 피그마 레이어 이름과 통일 */}
            {dummyData.map((item) => (
                <div key={item.id} className="pokemon-card">
                    <div className="image-placeholder">포켓몬 이미지</div>
                    <div className="pokemon-name">포켓몬 이름</div>
                </div>
            ))}
        </div>
    );
};

export default PokemonList;