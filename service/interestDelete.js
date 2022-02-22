import axios from 'axios';
import nookies from 'nookies';

export default async function interestDelete(id) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const accessToken = nookies.get();
  const headers = { Authorization: `Bearer ${accessToken.TOKEN}` };

  try {
    await axios({
      method: 'delete',
      url: `${API_URL}/interest/${id}`,
      headers,
    });
  } catch (err) {
    return err;
  }
}
