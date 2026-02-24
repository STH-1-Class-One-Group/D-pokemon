export default function BottomNav() {
    return (
        <nav style={{ position: 'fixed', bottom: 0, width: '100%', background: '#eee' }}>
        <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none', padding: '10px' }}>
            <li>홈</li>
            <li>도감</li>
            <li>퀴즈</li>
        </ul>
        </nav>
    );
}