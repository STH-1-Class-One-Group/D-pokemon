// src/components/common/Header.tsx
import './Header.css';

    export default function Header() {
    return (
        // style={...} 삭제하고 className 사용!
        <header className="header">
        <h1>D-Pokemon</h1>
        {/* 메뉴가 필요하면 여기에 추가 */}
        </header>
    );
}