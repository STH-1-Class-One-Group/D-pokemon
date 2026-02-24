import { Link } from 'react-router-dom';
import './Home.css'; //

export default function Home() {
    return (
        <div className="home-container">
        {/* 제목 */}
        <h1 className="home-title">
            <span className="highlight">D-Pokemon</span><br />
            나만의 도감
        </h1>

        {/* 버튼 영역 */}
        <div className="button-group">
            <Link to="/pokedex">
            <button className="home-btn btn-pokedex">
                🔍 도감 보러가기
            </button>
            </Link>

            <Link to="/quiz">
            <button className="home-btn btn-quiz">
                🎮 퀴즈 풀러가기
            </button>
            </Link>
        </div>
        </div>
    );
}