import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Line } from 'react-chartjs-2'
import 'leaflet/dist/leaflet.css'
import markerIcon from './location.png'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useCountryData, useGlobalData, useGraphData } from '../store/hooks'
import Home from './Home'
import { icon } from 'leaflet'
import Loader from '../components/common/Loader'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

const ChartsAndMaps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chart' | 'map'>('map')

  const { data: globalData, isLoading: isGlobalLoading } = useGlobalData()
  const { data: countryData, isLoading: isCountryLoading } = useCountryData()
  const { data: graphData, isLoading: isGraphLoading } = useGraphData()

  const chartData = {
    labels: Object.keys(graphData?.cases || {}),
    datasets: [
      {
        label: "Deaths",
        data:  Object.values(graphData?.deaths || {}),
        backgroundColor: "#FF5C5C",
        borderColor: "#FF5C5C",
        pointBorderColor: "#FF5C5C",
      },
      {
        label: "Cases",
        data:  Object.values(graphData?.cases || {}),
        backgroundColor: "#5C5CFF",
        borderColor: "#5C5CFF",
        pointBorderColor: "#5C5CFF",
      },
      {
        label: "Recovered",
        data: Object.values(graphData?.recovered || {}),
        backgroundColor: "#8AFF8A",
        borderColor: "#8AFF8A",
        pointBorderColor: "#8AFF8A",
      }
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#ddd',
        },
        ticks: {
          color: '#333',
        },
      },
      y: {
        grid: {
          color: '#ddd',
        },
        ticks: {
          color: '#333',
        },
      },
    },
  }

  const ICON = icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
  })

  return (
    <Home>
      <Loader  isLoading = {activeTab === 'map' ?  isCountryLoading : isGraphLoading}/>
      <div className="flex flex-col max-h-[85vh] justify-between p-4 overflow-y-auto">
        <div>
          <button
            className={`py-2 px-4 ${activeTab === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-l-lg`}
            onClick={() => setActiveTab('chart')}
          >
            Chart
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'map' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-r-lg`}
            onClick={() => setActiveTab('map')}
          >
            Map
          </button>

          {activeTab === 'map' && (
            <div className="mt-4 bg-gray-500 rounded-lg shadow-xl">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '600px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {countryData?.map((country) => (
                  <Marker
                    key={country.countryInfo.iso2 + country.countryInfo.lat}
                    icon={ICON}
                    position={[
                      country.countryInfo.lat,
                      country.countryInfo.long,
                    ]}
                  >
                    <Popup>
                      <p className="text-xl font-bold capitalize">{country.country}</p>
                        <ul>
                          <li className="font-semibold text-blue-400">
                            Active: {country.active}
                          </li>
                          <li className="font-semibold text-red-400">
                            Deaths: {country.deaths}
                          </li>
                          <li className="font-semibold text-green-500">
                            Recovered: {country.recovered}
                          </li>
                        </ul>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </div>
        {activeTab === 'chart' && (
          <div className="mt-8 max-h-[70vh] bg-gray-200 rounded-lg shadow-xl">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </Home>
  )
}

export default ChartsAndMaps
