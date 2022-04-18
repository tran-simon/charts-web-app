import React from 'react';
import { Container } from '@mui/material';
import Chart from 'react-apexcharts'
import { ApexOptions } from "apexcharts"

const Main = () => {


  const options: ApexOptions = {
    title: {
      text: "ASDF"
    },
  }

  const series: ApexOptions['series'] = [
    {
      name: "ASDF",
      data: [1, 2, 3]
    }

  ]

  return (

    <main>
      <Container>

        <Chart
          height="350"
          type="line"
          options={options}
          series={series}
        />

      </Container>
    </main>

  );
};

export default Main;
