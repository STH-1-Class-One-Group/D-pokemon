import { useState, useEffect, useRef } from "react";
import { getPokemonList } from '../api/pokemonapi'; 
import { type PokemonSummary } from '../types/pokemon';
import PokemonList from '../components/pokedex/PokemonList';
import '../components/pokedex/Pokedex.css';

function Pokedex() {
    const [pokemonList, setPokemonList] = useState<PokemonSummary[]>([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    // 👷‍♂️ 데이터를 가져오는 함수
    const loadMore = async () => {
        // 이미 로딩 중이거나 데이터를 다 가져왔다면 중단 🛡️
        if (isLoading) return; 
        
        setIsLoading(true);
        try {
            const data = await getPokemonList(20, offset);
            
            if (data && data.length > 0) {
                console.log(`🔥 데이터 로드 완료 (offset: ${offset}):`, data);
                
                setPokemonList(prev => [...prev, ...data]);
                setOffset(prevOffset => prevOffset + 20);
            }
        } catch (error) {
            console.error("데이터 로드 중 에러 발생:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 🕵️‍♂️ [무한 스크롤 & 초기 로드 통합]
    // 4번 섹션(초기 로드용 useEffect)을 지우고 이 감시자가 첫 로드까지 담당하게 합니다.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // 바닥이 보이고 로딩 중이 아닐 때만 실행
                if (entries[0].isIntersecting && !isLoading) {
                    loadMore();
                }
            },
            { threshold: 0.1 } // 살짝만 보여도 감지하도록 설정
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [isLoading, offset]); // 로딩 상태와 offset이 변할 때 감시 조건을 갱신합니다.

    return (
        <div className="pokedex-container">
            <div className="search-section">
                <input type="text" placeholder="포켓몬을 검색하세요!" className="search-input" />
            </div>

            <div className="quiz-banner">
                <p>오늘의 포켓몬 퀴즈에 도전해보세요!</p>
                <button className="quiz-button">퀴즈 시작</button>
            </div>

            <h1>포켓몬 도감</h1>

            {/* 포켓몬 목록 🎮 */}
            <PokemonList list={pokemonList} />

            {/* 무한 스크롤 감지 바닥 🏁 */}
            <div 
                ref={observerTarget} 
                style={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                {isLoading && <p>새로운 포켓몬을 불러오는 중... 🏃‍♂️</p>}
            </div>
        </div>
    );
}

export default Pokedex;