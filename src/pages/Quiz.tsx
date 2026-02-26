import React, { useState, useEffect } from "react";
import Loading from "../components/common/Loading"; // 기존 로딩 컴포넌트 활용

const Quiz = () => {
    const [pokemon, setPokemon] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [userInput, setUserInput] = useState("");
    const [message, setMessage] = useState("이 포켓몬의 이름은 무엇일까요?");

    // 1. 비동기로 랜덤 포켓몬 가져오기 (설명하기 좋은 포인트!)
    const fetchRandomPokemon = async () => {
        setLoading(true);
        setMessage("이 포켓몬의 이름은 무엇일까요?");
        setUserInput("");

        try {
            const randomId = Math.floor(Math.random() * 151) + 1;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const data = await response.json();
            setPokemon(data);
        } catch (error) {
            console.error("퀴즈 로딩 실패:", error);
            setMessage("데이터를 가져오지 못했습니다.");
        } finally {
            setLoading(false); // 성공하든 실패하든 로딩 종료
        }
    };

    useEffect(() => {
        fetchRandomPokemon();
    }, []);

    const checkAnswer = () => {
        // 실무 팁: 한글 이름으로 체크하려면 추가 로직이 필요하지만, 
        // 우선 영어 이름으로 테스트해보세요!
        if (userInput.toLowerCase() === pokemon.name.toLowerCase()) {
            setMessage("정답입니다! 🎉");
        } else {
            setMessage(`틀렸습니다! 정답은 ${pokemon.name}입니다. 😢`);
        }
    };

    if (loading) return <Loading />;

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>포켓몬 퀴즈</h2>
            {pokemon && (
                <div>
                    {/* 포켓몬 이미지를 실루엣 처리하면 더 퀴즈 같아져요! */}
                    <img
                        src={pokemon.sprites.front_default}
                        alt="quiz"
                        style={{ width: "200px", filter: message.includes("정답") || message.includes("틀렸") ? "none" : "brightness(0)" }}
                    />
                    <p>{message}</p>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="이름을 입력하세요"
                    />
                    <button onClick={checkAnswer}>정답 확인</button>
                    <button onClick={fetchRandomPokemon} style={{ marginLeft: "10px" }}>다음 문제</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;