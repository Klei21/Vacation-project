import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { fetchVacations } from '../../api/vctApi';
import { IVacation } from '../../models/Idea';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Grafics = () => {
  const [vacations, setVacations] = useState<{ labels: string[]; values: (number | null)[] , prices: (number)[]}>({
    labels: [],
    values: [],
    prices: [],
  });

  useEffect(() => {
    async function getVacations() {
      const allvcts = await fetchVacations()
      const labels = allvcts.map((vct: IVacation) => vct.vacation_id + ")" + vct.country);
      const values = allvcts.map((vct: IVacation) => vct.likes)
      const price = allvcts.map((vct: IVacation)=>vct.price/100)
      setVacations({
        labels: labels,
        values: values,
        prices: price
      }
      )
    }
    getVacations()
  }, [])

  const data = {
    labels: vacations.labels,
    datasets: [
      {
        label: "Likes",
        data: vacations?.values,
        borderColor: 'rgb(23, 182, 42)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: 'Most popular vacations', // Título del gráfico
      },
    },
  };

  return <div style={{ width: '100vw', height: '70vh'}}>
            <Bar data={data} options={options} />
          </div>
};

export default Grafics;