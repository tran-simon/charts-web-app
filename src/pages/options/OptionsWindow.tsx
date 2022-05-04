import WindowContent from '../../components/WindowContent';
import { OptionDetails } from '../../components/dataInput/OptionSection';
import { ChartContext } from '../../providers/ChartProviders';
import apexOptionsModel from '../../model/apexFields/apexOptionsModel';
import React, { useContext, useState } from 'react';
import { Box, ToggleButton, Tooltip } from '@mui/material';
import { MosaicBranch, MosaicWindow } from 'react-mosaic-component';
import { useIntlFormatter } from '../../utils/utils';
import CodeIcon from '@mui/icons-material/Code';
import { FormattedMessage } from 'react-intl';
import SvelteJsonEditor from '../../components/SvelteJsonEditor/SvelteJsonEditor';

export type OptionsWindowProps = {
  path: MosaicBranch[];
};

export default ({ path }: OptionsWindowProps) => {
  const t = useIntlFormatter();
  const [showCode, setShowCode] = useState(true); //todo

  return (
    <MosaicWindow
      title={t('window.options-window')}
      path={path}
      toolbarControls={
        <Box marginX={0.25}>
          <Tooltip title={<FormattedMessage id="button.code.tooltip" />}>
            <ToggleButton
              size="small"
              value={true}
              selected={showCode}
              onChange={() => setShowCode(!showCode)}
              sx={{
                width: '1.25rem',
                height: '1.25rem',
              }}
            >
              <CodeIcon
                sx={{
                  width: '1rem',
                  height: '1rem',
                }}
              />
            </ToggleButton>
          </Tooltip>
        </Box>
      }
    >
      <WindowContent
        paddingX={2}
        sx={{
          overflowY: 'auto',
        }}
      >
        <Box display={showCode ? 'none' : undefined}>
          <OptionsWindowContent />
        </Box>
        <Box
          display={!showCode ? 'none' : 'flex'}
          sx={{
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <JsonEditor />
        </Box>
      </WindowContent>
    </MosaicWindow>
  );
};

const OptionsWindowContent = React.memo(() => {
  return <OptionDetails Context={ChartContext} options={apexOptionsModel} />;
});

export const JsonEditor = React.memo(() => {
  const { options, setOptions } = useContext(ChartContext);
  return (
    <SvelteJsonEditor
      style={{
        marginTop: '1rem',
        marginBottom: '1rem',
      }}
      content={{
        text: undefined,
        json: options,
      }}
      onChange={({ json, text }: any) => {
        if (json) {
          setOptions(json);
        } else if (text) {
          const newOptions = JSON.parse(text);
          console.log(newOptions);
          setOptions(newOptions);
        }
      }}
    />
  );
});
