import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { TypeOption } from '../model/reactApexOptions';
import { Primitive, SetState } from '../utils/utils';
import noop from 'lodash/noop';
import _get from 'lodash/get';
import _set from 'lodash/set';

export interface IChartContext {
  type: TypeOption;
  setType: SetState<TypeOption>;
  series: ApexOptions['series'];
  setSeries: SetState<ApexOptions['series']>;
  width?: string | number;
  setWidth?: SetState<string | number | undefined>;
  height?: string | number;
  setHeight?: SetState<string | number | undefined>;
  options: ApexOptions;
  setOptions: SetState<ApexOptions>;
  setOption: (path: string[], value: Primitive) => void;
  getOption: (path: string[]) => Primitive | undefined;
}

export const ChartContext = createContext<IChartContext>({
  type: TypeOption.line,
  setType: noop,
  series: [],
  setSeries: noop,
  options: {},
  getOption: () => undefined,
  setOptions: noop,
  setOption: noop,
});

export default ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState(TypeOption.line);
  const [series, setSeries] = useState<ApexOptions['series']>([
    {
      name: 'Series A',
      data: [1, 2, 3],
    },
  ]);
  const [width, setWidth] = useState<string | number | undefined>();
  const [height, setHeight] = useState<string | number | undefined>();
  const [options, setOptions] = useState<ApexOptions>({});

  const getOption = useCallback(
    (path: string[]) => {
      return _get(options, path);
    },
    [options],
  );

  const setOption = useCallback(
    (path: string[], value: Primitive) => {
      setOptions((o) => {
        _set(o, path, value);
        return { ...o };
      });
    },
    [setOptions],
  );

  return (
    <ChartContext.Provider
      value={{
        type,
        setType,
        series,
        setSeries,
        width,
        setWidth,
        height,
        setHeight,
        options,
        getOption,
        setOptions,
        setOption,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
