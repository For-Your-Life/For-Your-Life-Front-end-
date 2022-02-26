import axios from 'axios';
export default async function getAddress() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const { data } = await axios({
      method: 'get',
      url: `${API_URL}/address`,
    });
    return data;
  } catch (err) {
    return err;
  }
}
