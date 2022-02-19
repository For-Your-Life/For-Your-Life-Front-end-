import axios from 'axios';

export default async function signUp(user) {
  await axios.post(`http://localhost:4000/users`, user);
}
