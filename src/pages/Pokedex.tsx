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
    
    // 검색 관련 상태 분리
    const [inputValue, setInputValue] = useState("");    // 사용자가 입력 중인 값
    const [finalSearchTerm, setFinalSearchTerm] = useState(""); // 엔터로 확정된 검색어
    
    const observerTarget = useRef<HTMLDivElement>(null);

    // 데이터를 가져오는 함수 (기존 로직 유지)
    const loadMore = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const data = await getPokemonList(20, offset);

            if (data && data.length > 0) {
                console.log(`데이터 로드 완료 (offset: ${offset}):`, data);
                setPokemonList(prev => [...prev, ...data]);
                setOffset(prevOffset => prevOffset + 20);
            }
        } catch (error) {
            console.error("데이터 로드 중 에러 발생:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 무한 스크롤 감시자 (기존 로직 유지)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [isLoading, offset]);

    // 엔터 키 감지 핸들러
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // 엔터를 누르는 순간만 최종 검색어를 업데이트하여 필터링을 트리거합니다.
            setFinalSearchTerm(inputValue);
        }
    };

    // 필터링 로직 (확정된 검색어 finalSearchTerm 기준)
    const filteredPokemon = pokemonList.filter((pokemon) => {
        const search = finalSearchTerm.toLowerCase();
        if (!search) return true; // 검색어가 없으면 전체 리스트 표시

        return (
            pokemon.korean_name?.includes(search) || 
            pokemon.name.toLowerCase().includes(search)
        );
    });

    return (
        <div className="pokedex-container">
            {/* 1. 상단 검색 영역 */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="포켓몬 이름을 입력하세요. (영문/한글)"
                    className="search-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} // 글자 입력 시 상태만 업데이트
                    onKeyDown={handleKeyDown} // 엔터 입력 시 필터링 실행
                />
            </div>

            {/* 2. 도감 제목 */}
            <h1>포켓몬 도감</h1>

            {/* 3. 포켓몬 목록 영역 (필터링된 리스트 전달) */}
            <PokemonList list={filteredPokemon} />

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
                {isLoading && <Loading />}
            </div>
        </div>
    );
}

export default Pokedex;