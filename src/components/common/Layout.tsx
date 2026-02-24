import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div>
        {/* 여기에 나중에 Header가 들어갈 거예요 */}
        <main>
            <Outlet /> 
        </main>
        {/* 여기에 나중에 BottomNav가 들어갈 거예요 */}
    </div>
    );
}