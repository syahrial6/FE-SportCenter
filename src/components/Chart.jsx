// Import required libraries
import { useState,useEffect } from 'react';

import ReactApexChart from 'react-apexcharts';
import { getReservasi } from '../Context/Config';

const Chart = () => {
    const [loading, setLoading] = useState(false);
    const [dataReservasi, setDataReservasi] = useState([]);
    


    const fetchData = async () => {
        try {
          setLoading(true);
          setDataReservasi(await getReservasi("",""));
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=>{
        fetchData();
      },[])
  // Initialize state with chart data and options
  const [chartData,setChartData] = useState({
    series: [{
      name: "Reservasi",
      data: []
    }],
    options: {
      chart: {
        height: 200,
        type: 'line',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Grafik Pemakaian Lapangan',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      }
    }
  });
  useEffect(()=>{
    const calculateMatchesPerMonth = (data) => {
      const matchesPerMonth = Array(12).fill(0);
      data.forEach(match => {
        const date = new Date(match.waktuMulaitgl);
        const month = date.getMonth(); // Mengambil bulan dari tanggal (0-11)
        matchesPerMonth[month]++;
      });
      return matchesPerMonth;
    };

    const matchesPerMonth = calculateMatchesPerMonth(dataReservasi);

    setChartData(prevData => ({
      ...prevData,
      series: [{
        ...prevData.series[0],
        data: matchesPerMonth
      }]
    }));
  },[dataReservasi])

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
export default Chart;