// src/components/pokedex/PokemonCard.tsx

interface PokemonCardProps {
    name: string;
    url: string;
}

function PokemonCard({ name, url }: PokemonCardProps) {
    // 1. URL에서 도감 번호(ID)를 추출합니다. (예: .../pokemon/1/ -> 1)
    const id = url.split('/').filter(Boolean).pop();

    // 2. 고화질 공식 아트워크 이미지 주소입니다.
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
        <div className="pokemon-card">
            {/* 이미지 영역 */}
            <div className="image-placeholder">
                <img
                    src={imageUrl}
                    alt={name}
                    style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                />
            </div>

            {/* 정보 영역 */}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <span style={{ fontSize: '12px', color: '#888', fontWeight: 'bold' }}>
                    #{id?.padStart(3, '0')}
                </span>
                <h3 style={{
                    margin: '5px 0 0 0',
                    textTransform: 'capitalize',
                    fontSize: '1.1rem'
                }}>
                    {name}
                </h3>
            </div>
        </div>
    );
}

export default PokemonCard;