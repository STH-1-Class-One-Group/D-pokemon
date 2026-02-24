// src/components/common/BottomNav.tsx
import './BottomNav.css';

export default function BottomNav() {
    return (
        // style={...} 삭제하고 className 사용!
        <nav className="bottom-nav">
        <ul>
            <li>홈</li>
            <li>도감</li>
            <li>퀴즈</li>
        </ul>
        </nav>
    );
}