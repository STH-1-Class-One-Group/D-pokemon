// 1. 입구(Props) 수정: korean_name을 추가로 받을 수 있게 합니다.
interface PokemonCardProps {
    name: string;
    url: string;
    korean_name?: string; // 추가! (한글 이름이 없을 수도 있으니 ?를 붙여요)
}

// 2. 구조 분해 할당 부분에 korean_name 추가
function PokemonCard({ name, url, korean_name }: PokemonCardProps) {
    const id = url.split('/').filter(Boolean).pop();
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
        <div className="pokemon-card">
            <div className="image-placeholder">
                <img
                    src={imageUrl}
                    alt={korean_name || name} // alt 태그도 한글이 좋겠죠?
                    style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                />
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <span style={{ fontSize: '12px', color: '#888', fontWeight: 'bold' }}>
                    #{id?.padStart(3, '0')}
                </span>
                <h3 style={{
                    margin: '5px 0 0 0',
                    textTransform: 'capitalize',
                    fontSize: '1.1rem'
                }}>
                    {/* 3. 여기를 수정! 한글 이름이 있으면 보여주고, 없으면 영어를 보여줍니다. */}
                    {korean_name || name}
                </h3>
            </div>
        </div>
    );
}

export default PokemonCard;