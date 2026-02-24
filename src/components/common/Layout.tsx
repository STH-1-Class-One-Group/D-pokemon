import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import './Layout.css'; // 레이아웃 전용 CSS 연결

export default function Layout() {
    return (
        <div className="layout-container">
        {/* 1. 모든 페이지 공통 상단바 */}
        <Header />

        {/* 2. 각 페이지의 내용이 갈아끼워지는 영역 */}
        <main className="main-content">
            <Outlet />
        </main>

        {/* 3. 모바일 전용 하단 탭바 */}
        <BottomNav />
        </div>
    );
}