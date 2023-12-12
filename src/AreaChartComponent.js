import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const AreaChartComponent = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // Add this line to keep track of the chart instance

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Destroy the previous instance if it exists
            }

            const ctx = chartRef.current.getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, 'rgba(75, 192, 192, 0.7)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            const data = {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [{
                    label: 'Monthly Sales',
                    backgroundColor: gradient,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: [65, 59, 80, 81, 56],
                    fill: true,
                }]
            };

            // Store the chart instance
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        x: [{
                            display: true
                        }],
                        y: [{
                            display: true
                        }]
                    }
                }
            });
        }
    }, []); // Ensure this runs only once by passing an empty dependency array

    return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default AreaChartComponent;