import { makeStyles } from '@mui/styles';
import { SetState } from '../../../utils/utils';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ChartPropsContext } from '../../../providers/ChartProviders';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuProps,
  Tab,
  Tabs,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { TypeOption } from '../../../model/apexFields/reactApexModel';
import AddIcon from '@mui/icons-material/Add';
import { FormattedMessage } from 'react-intl';
import noop from 'lodash/noop';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export type ISeriesTabsContext = {
  tab: number;
  setTab: SetState<number>;
};

export const SeriesTabsContext = createContext<ISeriesTabsContext>({
  tab: 0,
  setTab: noop,
});

export const SeriesTabsProvider = ({ children }: { children: ReactNode }) => {
  const [tab, setTab] = useState(0);
  return (
    <SeriesTabsContext.Provider
      value={{
        tab,
        setTab,
      }}
    >
      {children}
    </SeriesTabsContext.Provider>
  );
};

const useSeriesTabsStyle = makeStyles({
  flexContainer: { alignItems: 'center' },
});

export default () => {
  const classes = useSeriesTabsStyle();
  const {
    options: { series = [] },
    setOption,
  } = useContext(ChartPropsContext);
  const { tab, setTab } = useContext(SeriesTabsContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [confirm, setConfirm] = useState<number | undefined>();

  return (
    <Box display="flex">
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          height: '100%',
          margin: 1,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Divider
        orientation="vertical"
        flexItem
        variant="middle"
        sx={{ marginRight: 1 }}
      />
      <Tabs
        value={tab}
        onChange={(e, newVal) => {
          setTab(newVal);
        }}
        variant="scrollable"
        classes={classes}
      >
        {series.map((seriesVal, i) => (
          <SeriesTab key={i} id={i} openConfirmDialog={() => setConfirm(i)} />
        ))}
      </Tabs>
      <Divider
        orientation="vertical"
        flexItem
        variant="middle"
        sx={{ marginLeft: 1 }}
      />
      <IconButton
        onClick={() => {
          setOption(
            ['series'],
            [
              ...series,
              {
                name: 'unamed',
                type: TypeOption.line,
                data: [],
              },
            ],
          );
        }}
        sx={{
          height: '100%',
          margin: 1,
        }}
      >
        <AddIcon />
      </IconButton>
      <SeriesTabsMenu close={() => setAnchorEl(null)} anchorEl={anchorEl} />
      <SeriesTabsDialog
        tabNumber={confirm}
        close={() => setConfirm(undefined)}
      />
    </Box>
  );
};

const SeriesTab = ({
  id,
  openConfirmDialog,
}: {
  id: number;
  openConfirmDialog: () => void;
}) => {
  const {
    options: { series = [] },
  } = useContext(ChartPropsContext);
  const { setTab } = useContext(SeriesTabsContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const seriesVal = series[id];

  if (typeof seriesVal === 'number') {
    // TODO(https://github.com/tran-simon/charts-web-app/issues/3)
    throw 'SeriesTabsMenu error: series should not be a number';
  }

  return (
    <>
      <Tab
        value={id}
        onClick={() => setTab(id)}
        onContextMenu={(e) => {
          e.preventDefault();
          setAnchorEl(e.currentTarget);
        }}
        label={seriesVal.name}
      />
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            openConfirmDialog();
          }}
        >
          <ListItemIcon>
            <DeleteOutlineIcon />
          </ListItemIcon>
          <FormattedMessage id="menu.delete" />
        </MenuItem>
      </Menu>
    </>
  );
};

const SeriesTabsMenu = ({
  anchorEl,
  close = () => {},
  ...props
}: Partial<MenuProps> & {
  close: () => void;
}) => {
  const { setTab } = useContext(SeriesTabsContext);

  const {
    options: { series = [] },
  } = useContext(ChartPropsContext);

  return (
    <Menu
      open={!!anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      anchorEl={anchorEl}
      onClose={close}
      {...props}
    >
      {series.map((series, i) => {
        if (typeof series === 'number') {
          // TODO(https://github.com/tran-simon/charts-web-app/issues/3)
          throw 'SeriesTabsMenu error: series should not be a number';
        }
        return (
          <MenuItem
            key={i}
            onClick={() => {
              setTab(i);
              close();
            }}
          >
            {series.name}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

const SeriesTabsDialog = ({
  tabNumber,
  close,
  ...props
}: Partial<DialogProps> & {
  tabNumber: number | undefined;
  close: () => void;
}) => {
  const { tab, setTab } = useContext(SeriesTabsContext);
  const {
    options: { series = [] },
    setOption,
  } = useContext(ChartPropsContext);

  return (
    <Dialog
      onClose={close}
      open={tabNumber != null}
      maxWidth="sm"
      fullWidth
      {...props}
    >
      <DialogTitle>
        <FormattedMessage id="dialog.confirm.title" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="dialog.confirm.content" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>
          <FormattedMessage id="dialog.confirm.cancel" />
        </Button>
        <Button
          onClick={() => {
            if (tabNumber == undefined) {
              throw 'SeriesTabs dialog error: `confirm` should not be undefined';
            }
            const newSeries = [...series];
            newSeries.splice(tabNumber, 1);
            const newLength = newSeries.length;
            setOption(
              ['series'],
              newSeries.length ? [...newSeries] : undefined,
            );
            if (tab >= newLength) {
              setTab(newLength >= 1 ? newLength - 1 : 0);
            }
            close();
          }}
        >
          <FormattedMessage id="dialog.confirm.confirm" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
