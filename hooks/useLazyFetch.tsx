import axios from 'axios';
import { useState } from 'react';

export default function useLazyFetch(url: string) {
  const [data, setData] = useState<any>(),
    [error, setError] = useState<string>(),
    [loading, setLoading] = useState<boolean>(false);

  async function handleFetch(body: object) {
    setLoading(true);
    try {
      const { data: resData } = await axios.post(
        '/api/' + url,
        body
      );
      setData(resData);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  return {
    api: handleFetch,
    data,
    error,
    loading,
  };
}
