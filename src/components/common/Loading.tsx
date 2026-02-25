// src/components/common/Loading.tsx
import React from 'react';
import './Layout.css'; // 간단한 애니메이션용 CSS

const Loading = () => {
    return (
        <div className="loading-spinner-container">
            <div className="pokemon-spinner"></div>
            <p>포켓몬을 찾아오는 중...</p>
        </div>
    );
};

export default Loading;