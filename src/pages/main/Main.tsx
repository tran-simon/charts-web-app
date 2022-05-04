import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import ChartProviders, {
  ChartContext,
  ChartPropsContext,
} from '../../providers/ChartProviders';
import { Mosaic, MosaicBranch, MosaicWindow } from 'react-mosaic-component';
import { MosaicKey } from 'react-mosaic-component/lib/types';
import { useIntlFormatter } from '../../utils/utils';
import './app.css';
import 'react-mosaic-component/react-mosaic-component.css';
import cloneDeep from 'lodash/cloneDeep';
import DataSection from '../../components/dataInput/dataSection/DataSection';
import WindowContent from '../../components/WindowContent';
import OptionsWindow from '../options/OptionsWindow';

declare module 'react-mosaic-component' {
  /*
   TODO: This is a temporary workaround until react-mosaic-component supports
     @types/react@18 which removed children from the react component props.
     See: https://github.com/nomcopter/react-mosaic/issues/184
   */
  // eslint-disable-next-line unused-imports/no-unused-vars
  export interface MosaicWindowProps<T extends MosaicKey> {
    children: React.ReactNode;
  }
}

type ViewId = 'options-window' | 'chart-window' | 'data-window';

const Main = () => {
  const t = useIntlFormatter();

  const renderTile = (id: string, path: MosaicBranch[]): JSX.Element => {
    switch (id) {
      case 'options-window':
        return <OptionsWindow path={path} />;
      case 'chart-window':
        return (
          <MosaicWindow<ViewId>
            title={t('window.chart-window')}
            path={path}
            toolbarControls={<></>}
          >
            <WindowContent>
              <ChartSection />
            </WindowContent>
          </MosaicWindow>
        );
      case 'data-window':
        return (
          <MosaicWindow<ViewId>
            title={t('window.data-window')}
            path={path}
            toolbarControls={<></>}
          >
            <WindowContent>
              {/*TODO*/}
              <DataSection />
            </WindowContent>
          </MosaicWindow>
        );
      default:
        return <></>;
    }
  };

  return (
    <ChartProviders>
      <main>
        <Mosaic<string>
          renderTile={renderTile}
          initialValue={{
            direction: 'row',
            first: 'options-window',
            second: {
              direction: 'column',
              first: 'chart-window',
              second: 'data-window',
              splitPercentage: 60,
            },
            splitPercentage: 30,
          }}
        />
      </main>
    </ChartProviders>
  );
};

const ChartSection = React.memo(() => {
  const { options: chartProps } = useContext(ChartPropsContext);
  const { options } = useContext(ChartContext);
  const [state, setState] = useState(0);

  useEffect(() => {
    setState((s) => ++s);
  }, [options, chartProps, setState]);

  return (
    <Chart
      key={state} // TODO: This is a temporary workaround to force the chart to re-render an option changes
      options={cloneDeep(options)}
      {...chartProps}
    />
  );
});

export default Main;
