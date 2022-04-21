import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import {
  BoolOptionField,
  NumberOptionField,
  Option,
  OptionField,
  Options,
  SelectOptionField,
  TextOptionField,
} from '../../model/optionModel';
import { FormattedMessage } from 'react-intl';
import SelectField from '../fields/SelectField';
import TextField from '../fields/TextField';
import NumberField from '../fields/NumberField';
import BoolField from '../fields/BoolField';

export type OptionsSectionProps<T> = {
  model: Options<T>;
  path: string[];
};

const OptionSection = <T,>({ model, path }: OptionsSectionProps<T>) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary>
        <Typography>
          <FormattedMessage id={['chartOptions', ...path].join('.')} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <OptionDetails options={model} path={path} />
      </AccordionDetails>
    </Accordion>
  );
};

const OptionDetails = <T,>({
  options,
  path,
}: {
  options: Options<T>;
  path: string[];
}) => {
  return (
    <Grid container spacing={2}>
      {Object.entries(options).map(([key, option], i) => {
        if (option == null) {
          return null;
        }
        return (
          <Grid key={i} item xs={12}>
            <OptionDetailsField
              option={option as Option}
              path={[...path, key]}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

const OptionDetailsField = ({
  option,
  path,
}: {
  option: Option;
  path: string[];
}) => {
  const stringPath = ['chartOptions', ...path].join('.');

  if (!(option instanceof OptionField)) {
    return <OptionSection model={option} path={path} />;
  }

  const fieldProps = {
    path,
    label: <FormattedMessage id={stringPath} />,
  };

  if (option instanceof TextOptionField) {
    return <TextField {...fieldProps} />;
  }
  if (option instanceof NumberOptionField) {
    return <NumberField {...fieldProps} />;
  }
  if (option instanceof SelectOptionField) {
    return (
      <SelectField
        {...fieldProps}
        getOptionLabel={(v) =>
          ['chartOptions', ...path, 'option', option.options[v]].join('.')
        }
        options={Object.keys(option.options)}
        initialValue={option.initialValue}
      />
    );
  }
  if (option instanceof BoolOptionField) {
    return <BoolField {...fieldProps} />;
  }

  return null;
};

export default OptionSection;
