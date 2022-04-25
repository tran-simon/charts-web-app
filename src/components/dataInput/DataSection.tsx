import React from 'react';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { Options } from '../../model/optionModel';

export type DataSectionProps<T> = Partial<DataGridProps> & {
  model: Options<T>;
};

export default <T,>({ model, ...props }: DataSectionProps<T>) => {
  const columns: GridColDef[] = Object.entries(model).map(
    ([key, option], i) => {
      return {
        field: key,
      };
    },
  );

  return <DataGrid columns={columns} rows={[]} {...props} />;
};
