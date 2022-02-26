import useSWR from 'swr';

export default function useLatLng() {
  const { data, mutate } = useSWR('address', () => window.address);
  return {
    data: data || 0,
    mutate: count => {
      window.count = count;
      return mutate();
    },
  };
}
