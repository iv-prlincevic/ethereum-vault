import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


 const PriceChart = () => {
    const [historicalPrices, setHistoricalPrices] = useState([]);
    
      useEffect(() => {
        const fetchHistoricalPrices = async () => {
          const apiUrl = 'https://api.coincap.io/v2/assets/ethereum/history';
          const params = {
            interval: 'h1',  // 'h1' stands for hourly data
            range: 'd1',       // Number of data points (past 24 hours)
          };
    
          try {
            // Make the API request
            const response = await axios.get(apiUrl, { params });
            const data = response.data.data;
            const last24HourData = data.slice(-24);

    
            // Extract and format historical prices
            const formattedPrices = last24HourData.map(entry => ({
              timestamp: new Date(entry.time),
              price: parseFloat(entry.priceUsd),
            }));
    
            // Set the historical prices in the component state
            setHistoricalPrices(formattedPrices);
          } catch (error) {
            console.error(`Error: ${error.message}`);
          }
        };
    
        // Fetch historical Ethereum prices when the component mounts
        fetchHistoricalPrices();

      }, []);

      
      // Extract timestamps and prices for chart data
      const timestamps = historicalPrices.map(entry => entry.timestamp.toLocaleString());
      const prices = historicalPrices.map(entry => entry.price.toFixed(2));

        const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Ethereum Price in last 24h (USD)',
        color:'red',
        data: prices,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor:'rgba(75,192,192,1)',
        tension: 0.1,
        pointRadius:5,
      },
    ],
  };

   const options = {
    responsive: true,
    plugins: {
      legend: {
        padding:20,
        position: 'top',
        labels:{
                font:{
                    size:30,
                }        
            }
      },
    },
    scales:{
        x:{
            grid:{
                color:'rgba(255, 255, 255, 0.2)',
            },
            ticks:{
                color:'white',
                font:{
                    size:16
                }
            },
          },
          y:{
            grid:{
                color:'rgba(255, 255, 255, 0.2)',
            },
            ticks:{
                color:'white',
                font:{
                    size:16
                }
            },
          },
      }
  };
    
  return (
    <div style={{height:'80%', width:'80%', margin:'10px auto'}}>
    <Line options={options} data={chartData} /> 
    </div>
  )

}

export default PriceChart;