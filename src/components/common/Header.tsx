import { Link } from 'react-router-dom';
import pokeball from '../../assets/pokeball-icon-size_64.png'; // 아이콘 이미지 불러오기
import './Header.css';

export default function Header() {
    return (
        <header className="header">
            {/* 왼쪽: 로고 + 제목 (아이콘 추가) */}
            <h1 className="header-title">
                <Link to="/" className="logo-container">
                    <img src={pokeball} alt="Pokeball" className="header-icon" />
                    <span>D-Pokemon</span>
                </Link>
            </h1>

            {/* 오른쪽: PC 전용 메뉴 */}
            <nav className="header-menu">
                <Link to="/">Home</Link>
                <span className="divider">|</span>
                <Link to="/pokedex">Pokedex</Link>
                <span className="divider">|</span>
                <Link to="/quiz">Quiz</Link>
            </nav>
        </header>
    );
}