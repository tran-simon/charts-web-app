import React, { useContext, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { ChartPropsContext } from '../../../providers/ChartProviders';
import { OptionDetails } from '../OptionSection';
import { apexAxisChartSeriesOptions } from '../../../model/apexFields/reactApexModel';

import TabsProvider, { TabsContext } from '../../../providers/TabsProvider';
import SeriesTabs from './SeriesTabs';
import JsonField from '../../fields/JsonField';

const DataSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <Box sx={{ overflowY: 'auto' }} padding={2}>
        <SeriesSection />
      </Box>
      <Box
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
  const { tab } = useContext(TabsContext);
  const path = useMemo(() => ['series', tab], [tab]);
  return (
    <>
      <OptionDetails
        options={apexAxisChartSeriesOptions}
        Wrapper={(props) => (
          <Grid
            container
            spacing={2}
            {...props}
            sx={{
              marginBottom: 1,
            }}
          />
        )}
        ItemWrapper={(props) => {
          //todo: improve responsive layout
          return <Grid item sm={6} md={3} {...props} />;
        }}
        Context={ChartPropsContext}
        omit={['data']} //todo: improve this
        path={path}
      />
      <JsonField
        path={[...path, 'data']}
        fullWidth
        rows={6}
        Context={ChartPropsContext}
      />
    </>
  );
};

export default React.memo(() => (
  <TabsProvider>
    <DataSection />
  </TabsProvider>
));
