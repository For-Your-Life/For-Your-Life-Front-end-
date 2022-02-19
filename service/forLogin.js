import axios from 'axios';
import nookies from 'nookies';
class ForLogin {
  // login 요청이 오면 사용자의 정보를 post 요청으로 보내고 토큰과 닉네임을 받아온다.
  async login(user) {
    try {
      // mock 서버에서 테스트 용으로 get을 보내면 아무 토큰이나 받아와진다.
      // 프로덕트 단계에서 실제 API를 post 요청으로 보내주자.
      const data = await axios.get(`http://localhost:4000/login`);
      // 받은 토큰과 닉네임을 쿠키에 넣어준다.
      nookies.set(null, 'TOKEN', data.data[0].token, {
        path: '/',
      });
      nookies.set(null, 'nickname', data.data[0].nickname, {
        path: '/',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
export default ForLogin;
