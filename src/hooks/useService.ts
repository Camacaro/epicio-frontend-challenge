/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { IuseService } from '../ts/interfaces';

export const useService = ({ url, method = 'GET', headers = {} }: IuseService) => {
  const isMounted = useRef(true);
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const loadData = async (): Promise<void> => {
      setIsLoading(true)

      const resp = await axios({
        baseURL: url,
        url,
        method,
        headers,
        data: {},
      })


      if(isMounted) {
        setData(resp.data || []);
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  return {isLoading, data}
}