/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import Error from '../interfaces/error.interface';

interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly data: any;
  readonly refetch: Function
}

export default function useFetch(url: string, body: object):Fetch {
  const [data, setData] = useState<any>(),
    [error, setError] = useState<Error>(),
    [loading, setLoading] = useState<boolean>(false);

  async function handleFetch(newBody?: object) {
    setLoading(true);
    try {
      const { data: resData } = await axios.post(
        '/api/' + url,
        newBody || body
      );
      setData(resData);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    handleFetch();
  }, []);
  return {
    refetch: handleFetch,
    data,
    error,
    loading,
  };
}
