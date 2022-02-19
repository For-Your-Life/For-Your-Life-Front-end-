import axios from 'axios';
import nookies from 'nookies';
export default async function userModify(user) {
  // 요청헤더
  const accessToken = nookies.get();
  const headers = { Authorization: `Bearer ${accessToken.TOKEN}` };
  try {
    await axios({
      method: 'put', //you can set what request you want to be
      url: 'http://localhost:4000/users/1',
      data: user,
      headers,
    });
  } catch (err) {
    return err;
  }
}
