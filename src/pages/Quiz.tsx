import React, { useState, useEffect } from "react";
import Loading from "../components/common/Loading";
import "./Quiz.css";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
    const navigate = useNavigate();
    const [isStarted, setIsStarted] = useState(false);
    const [options, setOptions] = useState<any[]>([]);
    const [correctPokemon, setCorrectPokemon] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [isNextLoading, setIsNextLoading] = useState(false); 
    const [message, setMessage] = useState("실루엣만 보고 맞춰보세요!");
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizCount, setQuizCount] = useState(1);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const MAX_QUIZ = 10;

    const fetchQuizData = async (isFirst: boolean = false) => {
        if (isFirst) setLoading(true);
        else setIsNextLoading(true);

        setIsAnswered(false);
        setSelectedId(null);
        setMessage("실루엣만 보고 맞춰보세요!");
        
        try {
            const randomIds: number[] = [];
            while (randomIds.length < 4) {
                const id = Math.floor(Math.random() * 151) + 1;
                if (!randomIds.includes(id)) randomIds.push(id);
            }

            const pokemonData = await Promise.all(
                randomIds.map(async (id) => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                    const data = await res.json();
                    return {
                        id,
                        name: data.names.find((n: any) => n.language.name === "ko").name,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                    };
                })
            );

            setOptions(pokemonData);
            setCorrectPokemon(pokemonData[Math.floor(Math.random() * 4)]);
        } catch (error) {
            console.error("데이터 로드 실패", error);
        } finally {
            setLoading(false);
            setIsNextLoading(false);
        }
    };

    const startQuiz = async () => {
        setLoading(true);
        await fetchQuizData(false);
        setIsStarted(true);
        setLoading(false);
    };

    const handleAnswer = (id: number) => {
        if (isAnswered || isNextLoading) return;
        setSelectedId(id);
        setIsAnswered(true);
        if (id === correctPokemon.id) {
            setScore(prev => prev + 1);
            setMessage("정답입니다! 🎉");
        } else {
            setMessage("아쉽네요! 틀렸습니다. 😢");
        }
    };

    const handleNext = () => {
        if (quizCount < MAX_QUIZ) {
            setQuizCount(prev => prev + 1);
            fetchQuizData(false);
        } else {
            setIsFinished(true);
        }
    };

    // 로딩 화면
    if (loading) return <Loading />;

    // 메인 렌더링 (범위를 가두기 위해 quiz-page-wrapper 추가)
    return (
        <div className="quiz-page-wrapper">
            <div className="quiz-page-container">
                {!isStarted ? (
                    /* 인트로 화면 */
                    <div className="glass-card intro-card">
                        <h1 className="main-title">포켓몬 능력 고사</h1>
                        <div className="button-group-vertical">
                            <button onClick={startQuiz} className="action-btn primary">퀴즈 시작하기!</button>
                            <button onClick={() => navigate("/pokedex")} className="action-btn secondary">도감 공부하기</button>
                        </div>
                    </div>
                ) : isFinished ? (
                    /* 결과 화면 */
                    <div className="glass-card result-card">
                        <h1 className="main-title">퀴즈 종료!</h1>
                        <div className="final-score-box">
                            <p className="score-label">최종 점수</p>
                            <h2 className="score-value">{score} / {MAX_QUIZ}</h2>
                        </div>
                        <p className="result-comment">
                            {score >= 8 ? "당신은 진정한 포켓몬 마스터! 🏆" : "조금 더 공부하면 마스터가 될 수 있어요! 💪"}
                        </p>
                        <div className="button-group-vertical">
                            <button onClick={() => window.location.reload()} className="action-btn primary">다시 도전하기</button>
                            <button onClick={() => navigate("/")} className="action-btn secondary">홈으로 돌아가기</button>
                        </div>
                    </div>
                ) : (
                    /* 퀴즈 진행 화면 */
                    <div className={`glass-card quiz-main ${isNextLoading ? "fetching" : ""}`}>
                        <div className="quiz-header">
                            <h2 className="quiz-question">이 포켓몬은 누구일까요?</h2>
                            <span className="quiz-score-badge">문제 {quizCount} / {MAX_QUIZ}</span>
                        </div>
                        <p className="quiz-subtitle">{message}</p>

                        <div className="silhouette-container">
                            <img
                                src={correctPokemon?.image}
                                className={`pokemon-img ${isAnswered ? "revealed" : "silhouette"} ${isNextLoading ? "loading-img" : ""}`}
                                alt="pokemon"
                            />
                        </div>

                        <div className="options-grid">
                            {options.map((opt) => (
                                <button
                                    key={opt.id}
                                    disabled={isNextLoading || isAnswered}
                                    onClick={() => handleAnswer(opt.id)}
                                    className={`option-btn ${isAnswered ? (opt.id === correctPokemon.id ? "correct" : opt.id === selectedId ? "wrong" : "") : ""}`}
                                >
                                    {isAnswered && opt.id === correctPokemon.id && <span className="icon">✔</span>}
                                    {isAnswered && opt.id === selectedId && opt.id !== correctPokemon.id && <span className="icon">✖</span>}
                                    {opt.name}
                                </button>
                            ))}
                        </div>

                        {isAnswered && (
                            <button onClick={handleNext} className="next-step-btn">
                                {quizCount === MAX_QUIZ ? "결과 보기" : "다음 문제"}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;