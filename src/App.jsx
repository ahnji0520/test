import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  useEffect(() => {
    // Kakao SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoClientId);
      console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
