import { useNavigate } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import kakaoLoginImage from '../../assets/kakao_login.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const handleKakaoLogin = async () => {
    if (window.Kakao.Auth.getAccessToken()) {
      try {
        await window.Kakao.API.request({
          url: '/v1/user/unlink',
        });
      } catch (error) {
        console.error('앱 연결 해제 실패:', error);
      }
    }
  };

  const kakaoOnSuccess = data => {
    console.log('로그인 성공:', data);
    const accessToken = data.response.access_token;
    navigate('/home');
  };

  const kakaoOnFailure = error => {
    console.error('로그인 실패:', error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
        render={({ onClick }) => (
          <img
            src={kakaoLoginImage}
            alt="Kakao Login"
            onClick={() => {
              handleKakaoLogin();
              onClick();
            }}
            className="cursor-pointer"
          />
        )}
      />
    </div>
  );
};

export default LoginPage;
