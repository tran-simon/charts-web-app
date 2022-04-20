import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import Chart from 'react-apexcharts';
import ChartProvider, { ChartContext } from '../../providers/ChartProvider';
import OptionSection from '../../components/optionSection/OptionSection';
import apexOptionsSection from '../../model/apexFields/apexOptionsSection';

const Main = () => {
  return (
    <ChartProvider>
      <main>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Paper>
                <MainOptionsSection />
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper>
                <ChartSection />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ChartProvider>
  );
};

const ChartSection = () => {
  const { type, height, width, options, series } = useContext(ChartContext);
  const [state, setState] = useState(0);

  useEffect(() => {
    setState((s) => ++s);
  }, [options, type]);

  return (
    <Chart
      key={state} // TODO: This is a temporary workaround to force the chart to re-render an option changes
      height={height}
      width={width}
      type={type}
      options={options}
      series={series}
    />
  );
};

const MainOptionsSection = () => {
  return (
    <OptionSection
      model={apexOptionsSection}
      path={[apexOptionsSection.nameId]}
    />
  );
};

export default Main;
