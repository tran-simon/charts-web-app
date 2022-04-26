import React, { useContext } from 'react';
import { DataGridProps } from '@mui/x-data-grid';
import { Box, Grid } from '@mui/material';
import { ChartPropsContext } from '../../../providers/ChartProviders';
import { OptionDetails } from '../OptionSection';
import { apexAxisChartSeriesOptions } from '../../../model/apexFields/reactApexModel';

import SeriesTabs, {
  SeriesTabsContext,
  SeriesTabsProvider,
} from './SeriesTabs';

export type DataSectionProps = Partial<DataGridProps> & {};

const DataSection = (props: DataSectionProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <Box padding={2}>
        <SeriesSection />
      </Box>
      <Box
        marginTop={2}
        sx={{
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <SeriesTabs />
      </Box>
    </Box>
  );
};

const SeriesSection = () => {
  const { tab } = useContext(SeriesTabsContext);

  return (
    <OptionDetails
      options={apexAxisChartSeriesOptions}
      Wrapper={(props) => <Grid container spacing={2} {...props} />}
      ItemWrapper={(props) => <Grid item xs={6} sm={4} {...props} />}
      Context={ChartPropsContext}
      omit={['data']}
      path={['series', tab]}
    />
  );
};

export default (props: any) => (
  <SeriesTabsProvider>
    <DataSection {...props} />
  </SeriesTabsProvider>
);
