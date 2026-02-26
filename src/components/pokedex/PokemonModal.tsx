import React, { useEffect, useState } from 'react';
import { getPokemonDetail } from '../../api/pokemonapi';
import './Pokedex.css'; // 스타일은 Pokedex.css에 몰아서 작성

interface PokemonModalProps {
    id: number;
    onClose: () => void;
}

const PokemonModal: React.FC<PokemonModalProps> = ({ id, onClose }) => {
    const [pokemon, setPokemon] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getPokemonDetail(id);
                setPokemon(data);
            } catch (error) {
                console.error("모달 데이터 로드 실패", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        
        // 모달 켜지면 배경 스크롤 막기
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, [id]);

    if (!pokemon && !loading) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                
                {loading ? (
                    <div className="modal-loading">데이터 분석 중...</div>
                ) : (
                    <>
                        {/* 헤더: 이름과 번호 */}
                        <div className="modal-header">
                            <h2>{pokemon.name}</h2>
                            <span className="modal-id">No.{String(pokemon.id).padStart(3, '0')}</span>
                        </div>

                        <div className="modal-body">
                            {/* 왼쪽: 이미지와 신체 정보 */}
                            <div className="modal-section-left">
                                <img src={pokemon.image} alt={pokemon.name} className="modal-image" />
                                <div className="modal-stats">
                                    <p><strong>키:</strong> {pokemon.height}m</p>
                                    <p><strong>무게:</strong> {pokemon.weight}kg</p>
                                </div>
                            </div>

                            {/* 오른쪽: 타입과 특성 */}
                            <div className="modal-section-right">
                                <div className="info-group">
                                    <h3>타입</h3>
                                    <div className="tag-container">
                                        {pokemon.types.map((type: string, i: number) => (
                                            <span key={i} className={`type-tag ${type}`}>{type}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="info-group">
                                    <h3>특성</h3>
                                    <div className="tag-container">
                                        {pokemon.abilities.map((ability: string, i: number) => (
                                            <span key={i} className="ability-tag">{ability}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="info-group description-box">
                                    <h3>도감 설명</h3>
                                    <p>{pokemon.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* 하단: 기술 목록 (스크롤 가능) */}
                        <div className="modal-footer">
                            <h3>주요 기술</h3>
                            <div className="moves-grid">
                                {pokemon.moves.map((move: string, i: number) => (
                                    <span key={i} className="move-tag">{move}</span>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PokemonModal;