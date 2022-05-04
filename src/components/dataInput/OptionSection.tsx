import React, { ComponentType, ReactNode } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Typography,
  AccordionProps,
} from '@mui/material';
import {
  ListOptionField,
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
import { ApexOptions } from 'apexcharts';
import { getLabelIdFromPath, Path } from '../../utils/utils';
import ListOptionSection from './ListOptionSection';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

  /**
   * children to add after the other children
   */
  postChildren?: ReactNode;

  accordionProps?: Partial<AccordionProps>;
};

const OptionSection = <T, C extends object>({
  model,
  path,
  title,
  children,
  postChildren,
  Context,
  accordionProps,
}: OptionsSectionProps<T, C>) => {
  return (
    <Accordion
      style={{
        width: '100%',
        ...accordionProps,
      }}
      {...accordionProps}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>
          {title ?? <FormattedMessage id={getLabelIdFromPath(path)} />}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children ??
          (model && (
            <OptionDetails options={model} path={path} Context={Context} />
          ))}
        {postChildren}
      </AccordionDetails>
    </Accordion>
  );
};

export const OptionDetails = <T, C extends object>({
  options,
  path = [],
  Context,
  omit = [],
  Wrapper = ({ children }) => <List disablePadding>{children}</List>,
  ItemWrapper = ({ children }) => (
    <ListItem disableGutters>{children}</ListItem>
  ),
}: WithContext<C> & {
  options: Options<T>;
  path?: Path;
  /**
   * Option entries to omit
   */
  omit?: keyof T | (keyof T)[];
  Wrapper?: ComponentType<{ children: ReactNode }>;
  ItemWrapper?: ComponentType<{ children: ReactNode }>;
}) => {
  const omitSet = new Set(Array.isArray(omit) ? omit : [omit]);

  return (
    <Wrapper>
      {Object.entries(options)
        .filter(([key]) => !omitSet.has(key as keyof T))
        .map(([key, option], i) => {
          if (option == null) {
            return null;
          }
          return (
            <ItemWrapper key={i}>
              <OptionDetailsField
                option={option as Option}
                path={[...path, key]}
                Context={Context}
              />
            </ItemWrapper>
          );
        })}
    </Wrapper>
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
  if (option instanceof ListOptionField) {
    return (
      <ListOptionSection
        Context={Context}
        path={path}
        listOption={option}
        title={title}
      />
    );
  }

  const fieldProps = {
    path,
    fullWidth: true,
    Context,
    label: title ?? <FormattedMessage id={getLabelIdFromPath(path)} />,
    ...option.fieldProps,
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
