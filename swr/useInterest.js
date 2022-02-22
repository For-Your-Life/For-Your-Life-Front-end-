import useSWR from 'swr';
import axios from 'axios';
import nookies from 'nookies';
export default function useInterest() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // 요청헤더
  const accessToken = nookies.get();
  const headers = { Authorization: `Bearer ${accessToken.TOKEN}` };
  // 요청에 사용할 axios를 미리 fetcher에 등록해준다.
  // 이건 선택사항으로 SWR에서 제공하는 fetcher를 사용하려면 이 코드를 삭제하자.
  const fetcher = async url => {
    const resp = await axios.get(url, { headers });
    return resp.data;
  };
  // data와 mutate와 error를 useSWR에서 반환한다.
  // mutate는 캐쉬된 값을 바꿔주기도 하고 다시 요청하는 등 state의 업데이트를 위한 함수이다.
  const { data, mutate, error } = useSWR(`${API_URL}/interest`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
