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
} from 'chart.js'
import { useCountryData, useGlobalData, useGraphData } from '../store/hooks'
import Home from './Home'
import { icon } from 'leaflet'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

const ChartsAndMaps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chart' | 'map'>('map')

  const { data: globalData, isLoading: isGlobalLoading } = useGlobalData()
  const { data: countryData, isLoading: isCountryLoading } = useCountryData()
  const { data: graphData, isLoading: isGraphLoading } = useGraphData()

  if (!globalData || isGlobalLoading || isCountryLoading || isGraphLoading)
    return <div>Loading...</div>

  const chartData = {
    labels: Object.keys(graphData?.cases || {}),
    datasets: [
      {
        label: 'Cases',
        data: Object.values(graphData?.cases || {}),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `Cases: ${tooltipItem.raw}`,
        },
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(75, 192, 192, 0.8)',
        borderWidth: 1,
      },
      legend: {
        display: true,
        labels: {
          color: '#333',
        },
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
            <div className="mt-8">
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
                    key={country.countryInfo.iso2}
                    icon={ICON}
                    position={[
                      country.countryInfo.lat,
                      country.countryInfo.long,
                    ]}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">{country.country}</h3>
                        <p>
                          <strong>Active:</strong> {country.active}
                        </p>
                        <p>
                          <strong>Recovered:</strong> {country.recovered}
                        </p>
                        <p>
                          <strong>Deaths:</strong> {country.deaths}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </div>
        {activeTab === 'chart' && (
          <div className="mt-8 max-h-[70vh]">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </Home>
  )
}

export default ChartsAndMaps
