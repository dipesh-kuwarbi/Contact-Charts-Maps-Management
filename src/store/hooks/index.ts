import { useQuery } from 'react-query'
import axios from 'axios'

// Define interfaces for the API responses
interface GlobalData {
  cases: number
  deaths: number
  recovered: number
}

interface CountryData {
  country: string
  countryInfo: {
    iso2: string
    lat: number
    long: number
  }
  active: number
  recovered: number
  deaths: number
}

interface GraphData {
  cases: Record<string, number>
  deaths: Record<string, number>
  recovered: Record<string, number>
}

// Fetch functions
const fetchGlobalData = async (): Promise<GlobalData> => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/all')
  return data
}

const fetchCountryData = async (): Promise<CountryData[]> => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/countries')
  return data
}

const fetchGraphData = async (): Promise<GraphData> => {
  const { data } = await axios.get(
    'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
  )
  return data
}

// Custom hooks
export const useGlobalData = () => {
  return useQuery<GlobalData>('globalData', fetchGlobalData)
}

export const useCountryData = () => {
  return useQuery<CountryData[]>('countryData', fetchCountryData)
}

export const useGraphData = () => {
  return useQuery<GraphData>('graphData', fetchGraphData)
}
