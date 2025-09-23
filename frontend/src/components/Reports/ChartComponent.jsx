import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const ChartComponent = ({ type = 'line', height = 400 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Income vs Expenses',
          data: [2000, 4000, 3000, 5000, 4500, 3500, 4200, 3800, 4800, 4000, 3600, 5000],
          fill: 'start',
          backgroundColor: 'rgba(0, 220, 130, 0.1)',
          borderColor: '#00DC82',
          tension: 0.4,
          pointRadius: 0,
          pointHitRadius: 10,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 750,
        easing: 'easeInOutQuart',
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#002530',
          titleColor: '#E5E7EB',
          bodyColor: '#E5E7EB',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            title: (context) => `${context[0].label}`,
            label: (context) => `$${context.raw.toLocaleString()}`,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          ticks: {
            color: '#9CA3AF',
            font: {
              size: 12,
            },
          },
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false,
          },
          border: {
            display: false,
          },
          ticks: {
            color: '#9CA3AF',
            font: {
              size: 12,
            },
            callback: (value) => `$${value.toLocaleString()}`,
          },
        },
      },
    };

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} style={{ height: `${height}px` }} />;
};

export default ChartComponent;