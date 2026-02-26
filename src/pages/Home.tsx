import { useNavigate } from 'react-router-dom';
import { FaGithub, FaBookOpen, FaGamepad } from "react-icons/fa"; // 아이콘 추가
import './Home.css';
import mainLogoImg from '../assets/dokemon-logo.png'; 

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* 배경 오버레이 (어둡게) */}
            <div className="overlay"></div>

            <main className="home-content">
                {/* 깔끔한 카드형 컨테이너 */}
                <div className="glass-card">
                    <img 
                        src={mainLogoImg} 
                        alt="DOKEMON" 
                        className="home-main-logo" 
                    />

                    <p className="sub-title">탐색과 도전이 함께하는 포켓몬 도감</p>

                    <div className="button-group">
                        <button className="modern-btn pokedex-btn" onClick={() => navigate('/pokedex')}>
                            <div className="icon-circle"><FaBookOpen /></div>
                            <span>도감 보러가기</span>
                        </button>
                        
                        <button className="modern-btn quiz-btn" onClick={() => navigate('/quiz')}>
                            <div className="icon-circle"><FaGamepad /></div>
                            <span>퀴즈 도전하기</span>
                        </button>
                    </div>
                </div>
            </main>

            <footer className="home-footer">
                <a 
                    href="https://github.com/STH-1-Class-One-Group/d-pokemon" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-link"
                >
                    <FaGithub size={24} /> 
                    <span className="github-text">STH-1-Class-One-Group</span>
                </a>
            </footer>
        </div>
    );
};

export default Home;