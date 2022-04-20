import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import {
  ModelOptionSection,
  Option,
  Options,
} from '../../model/modelOptionSection';
import { FormattedMessage } from 'react-intl';
import {
  OptionFieldBool,
  OptionFieldSelect,
  OptionFieldText,
} from '../../model/modelOptionField';
import SelectField from '../fields/SelectField';
import TextField from '../fields/TextField';

export type OptionsSectionProps<T> = {
  model: ModelOptionSection<T>;
  path: string[];
};

const OptionSection = <T,>({ model, path }: OptionsSectionProps<T>) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>
          <FormattedMessage id={path.join('.')} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <OptionDetails options={model.options} path={path} />
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
      {Object.values(options).map((option, i) => {
        return (
          <Grid key={i} item xs={12}>
            <OptionDetailsField
              option={option as Option}
              path={[...path, (option as Option).nameId]}
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
  const stringPath = path.join('.');
  if (option instanceof ModelOptionSection) {
    return <OptionSection model={option} path={path} />;
  }

  if (option instanceof OptionFieldText) {
    return (
      <TextField label={<FormattedMessage id={stringPath} />} path={path} />
    );
  }
  if (option instanceof OptionFieldSelect) {
    return (
      <SelectField
        label={<FormattedMessage id={stringPath} />}
        path={path}
        getOptionLabel={(v) => [...path, 'option', option.options[v]].join('.')}
        options={Object.keys(option.options)}
        initialValue={option.initialValue}
      />
    );
  }
  if (option instanceof OptionFieldBool) {
    //todo
    return <TextField label={<FormattedMessage id={stringPath} />} />;
  }

  return null;
};

export default OptionSection;
