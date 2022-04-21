import React, { ReactNode, useContext, useMemo } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import {
  ArrayOptionField,
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
import { ChartContext } from '../../providers/ChartProvider';
import { Primitive } from '../../utils/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { GenericFieldProps } from '../fields/Field';
export type OptionsSectionProps<T> = {
  model: Options<T>;
  path: string[];

  /**
   * Title of the section
   * if undefined, the title will be generated using a title ID built from the path
   */
  title?: ReactNode;
};

const OptionSection = <T,>({ model, path, title }: OptionsSectionProps<T>) => {
  return (
    <Accordion
      defaultExpanded={path.length < 2}
      style={{
        width: '100%',
      }}
    >
      <AccordionSummary>
        <Typography>
          {title ?? (
            <FormattedMessage id={['chartOptions', ...path].join('.')} />
          )}
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
  if (options instanceof OptionField) {
    return <ListOptionDetails options={options} path={path} />;
  }
  return (
    <List disablePadding>
      {Object.entries(options).map(([key, option], i) => {
        if (option == null) {
          return null;
        }
        return (
          <ListItem disableGutters key={i}>
            <OptionDetailsField
              option={option as Option}
              path={[...path, key]}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

const ListOptionDetails = <T extends Primitive>({
  options,
  path,
}: {
  options: OptionField<T>;
  path: string[];
}) => {
  const { setOption, getOption } = useContext(ChartContext);

  const data = useMemo<T[]>(() => {
    const data = getOption(path);
    if (Array.isArray(data)) {
      return [...data] as T[];
    }
    return [];
  }, [path, getOption]);

  return (
    <List disablePadding>
      {data.map((v, i) => {
        const elPath = [...path, i as any];
        return (
          <ListItem disableGutters key={i}>
            <OptionDetailsField
              title={i}
              option={options}
              path={elPath}
              genericFieldProps={{
                InputProps: {
                  endAdornment: (
                    <IconButton
                      onClick={() => {
                        data.splice(i, 1);
                        setOption(path, data.length ? [...data] : undefined);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ),
                },
              }}
            />
          </ListItem>
        );
      })}
      <ListItem disableGutters>
        <Button
          color="info"
          startIcon={<AddIcon />}
          onClick={() => {
            setOption(path, [...data, options.initialValue]);
          }}
          fullWidth
        >
          <FormattedMessage id="button.add" />
        </Button>
      </ListItem>
    </List>
  );
};

const OptionDetailsField = ({
  option,
  path,
  title,
  genericFieldProps,
}: {
  option: Option;
  path: string[];

  /**
   * Title of the field
   * if undefined, the title will be generated using a title ID built from the path
   */
  title?: ReactNode;

  /**
   * To customize the field rendered
   *
   * Only used if applicable.
   */
  genericFieldProps?: Partial<GenericFieldProps<any>>;
}) => {
  if (!(option instanceof OptionField)) {
    return <OptionSection model={option} path={path} title={title} />;
  }
  if (option instanceof ArrayOptionField) {
    return <OptionSection model={option.options} path={path} title={title} />;
  }

  const fieldProps = {
    path,
    fullWidth: true,
    label: title ?? (
      <FormattedMessage id={['chartOptions', ...path].join('.')} />
    ),
  };

  if (option instanceof TextOptionField) {
    return <TextField {...fieldProps} {...genericFieldProps} />;
  }
  if (option instanceof NumberOptionField) {
    return <NumberField {...fieldProps} {...genericFieldProps} />;
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
        {...genericFieldProps}
      />
    );
  }
  if (option instanceof BoolOptionField) {
    return <BoolField {...fieldProps} />;
  }

  return null;
};

export default OptionSection;
