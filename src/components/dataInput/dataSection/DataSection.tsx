import React, { useContext, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { ChartPropsContext } from '../../../providers/ChartProviders';
import { OptionDetails } from '../OptionSection';
import { apexAxisChartSeriesOptions } from '../../../model/apexFields/reactApexModel';

import SeriesTabs, {
  SeriesTabsContext,
  SeriesTabsProvider,
} from './SeriesTabs';
import { Path } from '../../../utils/utils';
import GenericField from '../../fields/Field';

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
  const { tab } = useContext(SeriesTabsContext);
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
      <SeriesDataInput path={path} />
    </>
  );
};

const SeriesDataInput = ({ path }: { path: Path }) => {
  return (
    <GenericField
      path={[...path, 'data']}
      convert={(v) => {
        if (v == null) {
          return [];
        }

        // TODO(https://github.com/tran-simon/charts-web-app/issues/4): implement validation

        return JSON.parse(v);
      }}
      convertToString={(v) => JSON.stringify(v)}
      fullWidth
      multiline
      disableClearable
      rows={6}
      Context={ChartPropsContext}
    />
  );
};

export default (props: any) => (
  <SeriesTabsProvider>
    <DataSection {...props} />
  </SeriesTabsProvider>
);
