import { useState, useEffect, useRef } from "react";
import { getPokemonList } from '../api/pokemonapi';
import { type PokemonSummary } from '../types/pokemon';
import PokemonList from '../components/pokedex/PokemonList';
import Loading from '../components/common/Loading';
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
            {/* 1. 상단 검색 영역 (중앙 정렬 유지) */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="포켓몬을 검색하세요!"
                    className="search-input"
                />
            </div>

            {/* ❌ 퀴즈 배너 섹션 삭제됨 */}

            {/* 2. 도감 제목 (CSS에서 align-self: center 적용으로 중앙 배치) */}
            <h1>포켓몬 도감</h1>

            {/* 3. 포켓몬 목록 영역 */}
            <PokemonList list={pokemonList} />

            {/* 4. 무한 스크롤 감지 및 로딩 표시 영역 */}
            <div
                ref={observerTarget}
                style={{ 
                    height: '100px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    width: '100%' 
                }}
            >
                {/* 로딩 중일 때만 Loading 컴포넌트 노출 */}
                {isLoading && <Loading />}
            </div>
        </div>
    );
}

export default Pokedex;