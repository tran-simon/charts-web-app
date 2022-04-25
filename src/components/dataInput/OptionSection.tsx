import React, { ReactNode, useContext, useMemo } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Checkbox,
  Typography,
  Box,
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
import { WithContext } from '../../providers/ChartProviders';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ApexOptions } from 'apexcharts';
import { getLabelIdFromPath, Path } from '../../utils/utils';

export type OptionsSectionProps<T, C extends object> = WithContext<C> & {
  model?: Options<T>;
  path: Path;

  /**
   * Title of the section
   * if undefined, the title will be generated using a title ID built from the path
   */
  title?: ReactNode;

  /**
   * The accordion details children
   * If not provided, defaults to OptionDetails
   */
  children?: ReactNode;
};

const OptionSection = <T, C extends object>({
  model,
  path,
  title,
  children,
  Context,
}: OptionsSectionProps<T, C>) => {
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
            <FormattedMessage
              id={getLabelIdFromPath(path, Context.displayName)}
            />
          )}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children ??
          (model && (
            <OptionDetails options={model} path={path} Context={Context} />
          ))}
      </AccordionDetails>
    </Accordion>
  );
};

const ArrayOptionSection = <T, C extends object>({
  arrayOption,
  path,
  Context,
  ...props
}: OptionsSectionProps<T, C> & {
  arrayOption: ArrayOptionField;
}) => {
  const { setOption, getOption } = useContext(Context);

  const data = useMemo<T | T[]>(() => {
    const data = getOption(path);
    if (Array.isArray(data)) {
      return [...data] as T[];
    }
    return data;
  }, [path, getOption]);

  const isArray = Array.isArray(data);

  const options = arrayOption.options;

  return (
    <OptionSection Context={Context} path={path} {...props}>
      {!isArray ? (
        <OptionDetailsField Context={Context} option={options} path={path} />
      ) : (
        <ListOptionDetails Context={Context} options={options} path={path} />
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={isArray}
            onChange={() => {
              if (isArray) {
                setOption(path, data[0]);
              } else {
                setOption(path, data != null ? [data] : []);
              }
            }}
          />
        }
        label={<FormattedMessage id="checkbox.list" />}
      />
    </OptionSection>
  );
};

export const OptionDetails = <T, C extends object>({
  options,
  path = [],
  Context,
}: WithContext<C> & {
  options: Options<T>;
  path?: Path;
}) => {
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
              Context={Context}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

const ListOptionDetails = <T, C extends object>({
  options,
  path,
  Context,
}: WithContext<C> & {
  options: OptionField;
  path: Path;
}) => {
  const { setOption, getOption } = useContext(Context);

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
        const elPath = [...path, i];
        return (
          <ListItem
            disableGutters
            key={i}
            style={{
              justifyContent: 'space-between',
            }}
          >
            <Box flexGrow={1} marginRight={1}>
              <OptionDetailsField
                title={i}
                option={options}
                path={elPath}
                Context={Context}
              />
            </Box>
            <IconButton
              onClick={() => {
                const newData = [...data];
                newData.splice(i, 1);
                setOption(path, newData.length ? [...newData] : undefined);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        );
      })}
      <ListItem disableGutters>
        <Button
          color="info"
          startIcon={<AddIcon />}
          onClick={() => {
            setOption(path, [...data, undefined]);
          }}
          fullWidth
        >
          <FormattedMessage id="button.add" />
        </Button>
      </ListItem>
    </List>
  );
};

export const OptionDetailsField = <C extends object = ApexOptions>({
  option,
  path,
  title,
  Context,
}: WithContext<C> & {
  option: Option;
  path: Path;

  /**
   * Title of the field
   * if undefined, the title will be generated using a title ID built from the path
   */
  title?: ReactNode;
}) => {
  if (!(option instanceof OptionField)) {
    return (
      <OptionSection
        model={option}
        path={path}
        title={title}
        Context={Context}
      />
    );
  }
  if (option instanceof ArrayOptionField) {
    if (option.canBeSingular) {
      return (
        <ArrayOptionSection
          Context={Context}
          path={path}
          arrayOption={option}
          title={title}
        />
      );
    } else {
      return (
        <OptionSection Context={Context} path={path} title={title}>
          <ListOptionDetails
            Context={Context}
            options={option.options}
            path={path}
          />
        </OptionSection>
      );
    }
  }

  const fieldProps = {
    path,
    fullWidth: true,
    Context,
    label: title ?? (
      <FormattedMessage id={getLabelIdFromPath(path, Context.displayName)} />
    ),
  };

  if (option instanceof TextOptionField) {
    return <TextField {...fieldProps} />;
  }
  if (option instanceof NumberOptionField) {
    return <NumberField {...fieldProps} />;
  }
  if (option instanceof SelectOptionField) {
    return <SelectField {...fieldProps} options={option.options} />;
  }
  if (option instanceof BoolOptionField) {
    return <BoolField {...fieldProps} />;
  }

  return null;
};

export default OptionSection;
