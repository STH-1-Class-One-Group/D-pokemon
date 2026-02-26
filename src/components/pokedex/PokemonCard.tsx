import React, { useState } from 'react';
import './Pokedex.css';
// import PokemonModal from './PokemonModal'; 
import cardBackImg from '../../assets/cardback.jpg'; 

interface PokemonCardProps {
    id: number;
    name: string;
    url: string;
    korean_name?: string;
}

function PokemonCard({ id, name, url, korean_name }: PokemonCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // 예: "https://pokeapi.co/.../1/" -> 1 추출
    const safeId = id || parseInt(url.split('/').filter(Boolean).pop() || '0');
    
    // 번호를 "001" 형태로 예쁘게 만듭니다.
    const formattedId = String(safeId).padStart(3, '0');

    // 이미지 주소 생성
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${safeId}.png`;

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="flip-card" onClick={handleCardClick}>
                <div className="flip-card-inner">
                    
                    {/* 앞면 */}
                    <div className="flip-card-front">
                        {/* 번호 (좌측 상단 고정) */}
                        <span className="card-number">
                            No.{formattedId}
                        </span>
                        
                        {/* 이미지 (원형 배경) */}
                        <div className="image-placeholder">
                            <img
                                src={imageUrl}
                                alt={korean_name || name}
                                loading="lazy"
                            />
                        </div>
                        
                        {/* 이름 */}
                        <h3 className="card-name">
                            {korean_name || name}
                        </h3>
                    </div>

                    {/* 뒷면 */}
                    <div className="flip-card-back">
                        <img src={cardBackImg} alt="Card Back" />
                    </div>

                </div>
            </div>
            {/* {isModalOpen && <PokemonModal id={safeId} onClose={() => setIsModalOpen(false)} />} */}
        </>
    );
}

export default PokemonCard;