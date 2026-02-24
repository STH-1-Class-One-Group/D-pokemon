// src/components/pokedex/PokemonCard.tsx

// 1. 부모(PokemonList)로부터 받을 데이터의 형식을 정의합니다.
interface PokemonCardProps {
    name: string;
    url: string;
}

// 2. 받은 데이터로 개별 포켓몬 카드를 그리는 컴포넌트입니다.
function PokemonCard({ name, url }: PokemonCardProps) {
    return (
        <div style={{
            border: '1px solid #ddd',
            padding: '15px',
            margin: '10px',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            textAlign: 'center'
        }}>
            {/* 포켓몬 이름 표시 */}
            <h3 style={{ margin: '0 0 10px 0', textTransform: 'capitalize' }}>{name}</h3>
            {/* 데이터 연결 확인을 위한 URL 표시 (나중에 이미지로 바꿀 예정!) */}
            <p style={{ fontSize: '10px', color: '#888', wordBreak: 'break-all' }}>{url}</p>
        </div>
    );
}

export default PokemonCard;