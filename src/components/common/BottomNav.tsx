import { Link } from 'react-router-dom'; // 링크 기능 불러오기
import './BottomNav.css';

export default function BottomNav() {
    return (
        <nav className="bottom-nav">
        <ul>
            <li>
            <Link to="/">홈</Link>
            </li>
            <li>
            <Link to="/pokedex">도감</Link>
            </li>
            <li>
            <Link to="/quiz">퀴즈</Link>
            </li>
        </ul>
        </nav>
    );
}