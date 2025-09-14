import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import KPICard from '../components/ui/KPICard';
import { useWeatherData, useCryptoData } from '../hooks/useApiData';
import { CloudIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  // Fetch data from APIs
  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useWeatherData();
  const { data: cryptoData, isLoading: cryptoLoading, error: cryptoError } = useCryptoData();

  // Process weather data for the chart
  const processWeatherData = () => {
    if (!weatherData) return null;
    
    const labels = weatherData.hourly.time.slice(0, 24).map((time: string) => 
      new Date(time).toLocaleTimeString([], { hour: '2-digit' })
    );
    
    const temperatures = weatherData.hourly.temperature_2m.slice(0, 24);
    
    return {
      labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temperatures,
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          tension: 0.3,
          fill: true,
        },
      ],
    };
  };

  // Process crypto data for the chart
  const processCryptoData = () => {
    if (!cryptoData) return null;
    
    const priceChange24h = cryptoData.market_data.price_change_percentage_24h;
    const priceChange7d = cryptoData.market_data.price_change_percentage_7d;
    const priceChange30d = cryptoData.market_data.price_change_percentage_30d;
    
    return {
      labels: ['24h', '7d', '30d'],
      datasets: [
        {
          label: 'Price Change (%)',
          data: [priceChange24h, priceChange7d, priceChange30d],
          backgroundColor: [
            'rgba(14, 165, 233, 0.7)',
            'rgba(99, 102, 241, 0.7)',
            'rgba(139, 92, 246, 0.7)',
          ],
          borderColor: [
            'rgba(14, 165, 233, 1)',
            'rgba(99, 102, 241, 1)',
            'rgba(139, 92, 246, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };


  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-6 md:p-8">
        <div className="container mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Welcome back
            </h2>
            <p className="text-muted-foreground">Here's what's happening with your business today.</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <KPICard
              title="Current Temperature"
              value={weatherData ? `${weatherData.hourly.temperature_2m[0]}°C` : '--'}
              change={2.5}
              icon={<CloudIcon className="h-6 w-6" />}
              loading={weatherLoading}
              error={weatherError}
            />
            <KPICard
              title="Bitcoin Price"
              value={cryptoData ? `$${cryptoData.market_data.current_price.usd.toLocaleString()}` : '--'}
              change={cryptoData?.market_data.price_change_percentage_24h || 0}
              icon={<CurrencyDollarIcon className="h-6 w-6" />}
              loading={cryptoLoading}
              error={cryptoError}
            />
          </div>

          {/* Charts Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Analytics Overview</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Live data</span>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="glass-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-semibold text-foreground">Temperature Forecast</h4>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>24h forecast</span>
                  </div>
                </div>
                <div className="h-80">
                  {weatherData ? (
                    <Line data={processWeatherData() || { labels: [], datasets: [] }} options={chartOptions} />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <div className="text-muted-foreground">Loading weather data...</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="glass-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-semibold text-foreground">Bitcoin Performance</h4>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                    <span>Price changes</span>
                  </div>
                </div>
                <div className="h-80">
                  {cryptoData ? (
                    <Pie 
                      data={processCryptoData() || { labels: [], datasets: [] }} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              padding: 20,
                              usePointStyle: true,
                              color: 'hsl(var(--foreground))',
                            }
                          },
                        },
                      }} 
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <div className="text-muted-foreground">Loading crypto data...</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
