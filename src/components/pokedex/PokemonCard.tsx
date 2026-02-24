interface PokemonCardProps {
    name: string;
    url: string;
}

function PokemonCard({ name, url }: PokemonCardProps) {
    const id = url.split('/').filter(Boolean).pop();
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
        <div className="pokemon-card">
            <div className="image-placeholder">
                <img
                    src={imageUrl}
                    alt={name}
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
                    {name}
                </h3>
            </div>
        </div>
    );
}

export default PokemonCard;