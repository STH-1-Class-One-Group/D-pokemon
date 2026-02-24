import { Link } from 'react-router-dom'; // 링크 이동 기능
import './Header.css';

export default function Header() {
    return (
        <header className="header">
        {/* 왼쪽: 로고/제목 */}
        <h1 className="header-title">
            <Link to="/">D-Pokemon</Link>
        </h1>

        {/* 오른쪽: PC 전용 메뉴 (와이어프레임처럼) */}
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