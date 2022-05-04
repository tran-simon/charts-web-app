import { ListOptionField, OptionField, Options } from '../../model/optionModel';
import React, { ComponentType, ReactNode, useContext, useMemo } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import OptionSection, {
  OptionDetailsField,
  OptionsSectionProps,
} from './OptionSection';
import { OptionsContext, WithContext } from '../../providers/ChartProviders';
import { FieldProps } from '../fields/Field';
import { Path } from '../../utils/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

type ListOptionSectionProps<
  T,
  C extends object,
  P,
  key extends keyof P,
> = OptionsSectionProps<T, C> & {
  listOption: ListOptionField<P, key>;
};

const ListOptionSection = <T, C extends object, P, key extends keyof P>({
  listOption,
  path,
  Context,
  ...props
}: ListOptionSectionProps<T, C, P, key>) => {
  const { option, canBeSingular } = listOption;

  return (
    <OptionSection Context={Context} path={path} {...props}>
      {option instanceof OptionField ? (
        <ListOptionSectionContent
          Context={Context}
          path={path}
          canBeSingular={canBeSingular}
          option={option}
        />
      ) : (
        <ListOptionDetailsWithSection
          Context={Context}
          path={path}
          options={option}
        />
      )}
      {canBeSingular && (
        <ListOptionSectionListCheckbox path={path} Context={Context} />
      )}
    </OptionSection>
  );
};

const useListData = <T, C extends object>(
  path: Path,
  Context: React.Context<OptionsContext<C>>,
) => {
  const context = useContext(Context);
  const { getOption } = context;

  const data = useMemo<T | T[]>(() => {
    const data = getOption(path);
    if (Array.isArray(data)) {
      return [...data] as T[];
    }
    return data;
  }, [path, getOption]);

  return {
    data,
    context,
  };
};

const ListOptionSectionContent = <T, C extends object, P>({
  path,
  Context,
  option,
  canBeSingular,
}: WithContext<C> & {
  path: Path;
  canBeSingular?: boolean;
  option: OptionField<P>;
}) => {
  const { data } = useListData<T, C>(path, Context);

  return !Array.isArray(data) && canBeSingular ? (
    <OptionDetailsField Context={Context} option={option} path={path} />
  ) : (
    <ListOptionDetails Context={Context} path={path} optionField={option} />
  );
};

const ListOptionSectionListCheckbox = <T, C extends object>({
  path,
  Context,
}: {
  path: Path;
  Context: React.Context<OptionsContext<C>>;
}) => {
  const {
    data,
    context: { setOption },
  } = useListData<T, C>(path, Context);

  const isArray = Array.isArray(data);

  return (
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
  );
};

type ListOptionDetailsProps<C extends object> = WithContext<C> & {
  path: Path;

  noDeleteBtn?: boolean;
};

export const ListOptionDetails = <T, C extends object>({
  optionField,
  ...props
}: ListOptionDetailsProps<C> & {
  optionField: OptionField<FieldProps<T, C>>;
}) => {
  return (
    <ListOptionDetailsInternal
      {...props}
      ItemComp={({ onDelete, ...props }) => (
        <OptionDetailsField {...props} option={optionField} />
      )}
    />
  );
};

export const ListOptionDetailsWithSection = <T, C extends object>({
  options,
  ...props
}: ListOptionDetailsProps<C> & {
  options: Options<T>;
}) => {
  return (
    <ListOptionDetailsInternal
      noDeleteBtn
      {...props}
      ItemComp={({ onDelete, ...props }) => (
        <OptionSection
          {...props}
          model={options}
          postChildren={
            <Button color="error" fullWidth onClick={onDelete}>
              <FormattedMessage id="button.remove" />
            </Button>
          }
        />
      )}
    />
  );
};

const ListOptionDetailsInternal = <C extends object>({
  path,
  ItemComp,
  Context,
  noDeleteBtn,
}: ListOptionDetailsProps<C> & {
  ItemComp: ComponentType<
    WithContext<C> & {
      title: ReactNode;
      path: Path;
      onDelete: () => void;
    }
  >;
}) => {
  const { setOption, getOption } = useContext(Context);

  const data = useMemo(() => {
    const data = getOption(path);
    if (Array.isArray(data)) {
      return [...data];
    }
    return [];
  }, [path, getOption]);

  const onDelete = (i: number) => {
    const newData = [...data];
    newData.splice(i, 1);
    setOption(path, newData.length ? [...newData] : undefined);
  };

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
            <Box
              flexGrow={1}
              marginRight={1}
              minWidth={
                0
              } /* To prevent overflow https://stackoverflow.com/a/66689926/6592293*/
            >
              <ItemComp
                title={i}
                path={elPath}
                Context={Context}
                onDelete={() => onDelete(i)}
              />
            </Box>
            {!noDeleteBtn && (
              <IconButton onClick={() => onDelete(i)}>
                <DeleteIcon />
              </IconButton>
            )}
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

export default ListOptionSection;
