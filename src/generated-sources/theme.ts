import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel';

const theme: Options<ApexOptions['theme']> = {
  mode: new optionModel.SelectOptionField({
    light: { value: 'light', labelId: 'theme.mode.option.light' },
    dark: { value: 'dark', labelId: 'theme.mode.option.dark' },
  }),
  palette: new optionModel.TextOptionField(),
  monochrome: {
    enabled: new optionModel.BoolOptionField(),
    color: null,
    shadeTo: new optionModel.TextOptionField(),
    shadeIntensity: new optionModel.NumberOptionField(),
  },
};

export default theme;
