import React, { useState, useEffect } from "react";
import Loading from "../components/common/Loading";
import "./quiz.css"; // 일반 CSS 파일 임포트

const Quiz = () => {
    const [pokemon, setPokemon] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [userInput, setUserInput] = useState("");
    const [message, setMessage] = useState("이 포켓몬은 누구일까요?");
    const [isAnswered, setIsAnswered] = useState(false);

    const fetchRandomPokemon = async () => {
        setLoading(true);
        setMessage("이 포켓몬은 누구일까요?");
        setUserInput("");
        setIsAnswered(false);

        try {
            const randomId = Math.floor(Math.random() * 151) + 1;
            const [res, speciesRes] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`),
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomId}`)
            ]);
            const data = await res.json();
            const speciesData = await speciesRes.json();
            
            // 한국어 이름 추출
            const koreanName = speciesData.names.find((n: any) => n.language.name === "ko").name;

            setPokemon({ ...data, koreanName });
        } catch (error) {
            console.error("퀴즈 로딩 실패:", error);
            setMessage("오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomPokemon();
    }, []);

    const checkAnswer = () => {
        if (!pokemon || isAnswered) return;
        setIsAnswered(true);
        
        if (userInput.trim() === pokemon.koreanName) {
            setMessage(`정답입니다! 🎉 (${pokemon.koreanName})`);
        } else {
            setMessage(`틀렸습니다! 정답은 '${pokemon.koreanName}'입니다. 😢`);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="container">
            <h1 className="title">포켓몬 퀴즈</h1>
            
            {pokemon && (
                <div className="card">
                    <img
                        src={pokemon.sprites.other["official-artwork"].front_default}
                        alt="pokemon"
                        className="pokemonImage"
                        style={{ filter: isAnswered ? "none" : "brightness(0)" }}
                    />
                    
                    {/* 조건부 클래스: 정답/오답 여부에 따라 색상 변경 */}
                    <p className={`message ${message.includes("정답입니다") ? "correct" : message.includes("틀렸습니다") ? "wrong" : ""}`}>
                        {message}
                    </p>

                    <input
                        type="text"
                        className="inputField"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                        placeholder="이름을 입력하세요"
                        disabled={isAnswered}
                    />

                    <div className="buttonGroup">
                        <button onClick={checkAnswer} className="btn submitBtn">정답 확인</button>
                        <button onClick={fetchRandomPokemon} className="btn nextBtn">다음 문제</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;