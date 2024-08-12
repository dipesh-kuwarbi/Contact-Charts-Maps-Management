import { useQuery } from 'react-query';
import axios from 'axios';

const fetchGlobalData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/all');
  return data;
};

const useGlobalData = () => {
  return useQuery('globalData', fetchGlobalData);
};

export default useGlobalData;
