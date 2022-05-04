import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { IReactApex, TypeOption } from '../model/apexFields/reactApexModel';
import { Path, SetState } from '../utils/utils';
import noop from 'lodash/noop';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';

export interface OptionsContext<T extends object> {
  options: T;
  setOptions: SetState<T>;
  setOption: (path: Path, value: any) => void;
  getOption: (path: Path) => any;
}

const defaultOptiosnContext = {
  options: {},
  getOption: () => undefined,
  setOptions: noop,
  setOption: noop,
};

export const ChartContext = createContext<OptionsContext<ApexOptions>>(
  defaultOptiosnContext,
);
ChartContext.displayName = 'ChartContext';

export const ChartPropsContext = createContext<OptionsContext<IReactApex>>(
  defaultOptiosnContext,
);
ChartPropsContext.displayName = 'ChartPropsContext';

export const GenericChartProvider = <T extends object>({
  children,
  Context,
  initData = {} as T,
}: {
  children: ReactNode;
  Context: React.Context<OptionsContext<T>>;
  initData?: T;
}) => {
  const [options, setOptions] = useState<T>(initData);

  const getOption = useCallback(
    (path: Path) => {
      if (!path.length) {
        return options;
      }
      return _get(options, path);
    },
    [options],
  );

  const setOption = useCallback(
    (path: Path, value: any) => {
      setOptions((o) => {
        if (!path.length) {
          return value;
        }
        if (value !== undefined) {
          _set(o, path, value);
        } else {
          _unset(o, path);
        }
        return { ...o };
      });
    },
    [setOptions],
  );

  console.log('debug', options);

  return (
    <Context.Provider
      value={{
        options,
        getOption,
        setOptions,
        setOption,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ({ children }: { children: ReactNode }) => {
  return (
    <GenericChartProvider Context={ChartContext}>
      <GenericChartProvider
        Context={ChartPropsContext}
        initData={{
          width: '100%',
          height: '100%',
          type: TypeOption.line,
          series: [
            {
              name: 'Series A',
              type: 'column',
              data: [5, 2, 3],
            },
            {
              name: 'Series b',
              type: 'line',
              data: [
                [1.5, 3],
                [2, 1],
                [4, 4],
              ],
            },
          ],
        }}
      >
        {children}
      </GenericChartProvider>
    </GenericChartProvider>
  );
};

export type WithContext<C extends object> = {
  /**
   * To chose from which provider the data should be fetched and saved
   */
  Context: React.Context<OptionsContext<C>>;
};
