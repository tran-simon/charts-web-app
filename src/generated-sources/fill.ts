import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel';

const fill: Options<ApexOptions['fill']> = {
  colors: null,
  opacity: new optionModel.NumberOptionField(),
  type: new optionModel.SelectOptionField({
    solid: { value: 'solid', labelId: 'fill.type.option.solid' },
    gradient: { value: 'gradient', labelId: 'fill.type.option.gradient' },
    pattern: { value: 'pattern', labelId: 'fill.type.option.pattern' },
    image: { value: 'image', labelId: 'fill.type.option.image' },
  }),
  gradient: {
    shade: new optionModel.SelectOptionField({
      light: { value: 'light', labelId: 'fill.gradient.shade.option.light' },
      dark: { value: 'dark', labelId: 'fill.gradient.shade.option.dark' },
    }),
    type: new optionModel.SelectOptionField({
      horizontal: {
        value: 'horizontal',
        labelId: 'fill.gradient.type.option.horizontal',
      },
      vertical: {
        value: 'vertical',
        labelId: 'fill.gradient.type.option.vertical',
      },
      diagonal1: {
        value: 'diagonal1',
        labelId: 'fill.gradient.type.option.diagonal1',
      },
      diagonal2: {
        value: 'diagonal2',
        labelId: 'fill.gradient.type.option.diagonal2',
      },
    }),
    shadeIntensity: new optionModel.NumberOptionField(),
    gradientToColors: null,
    inverseColors: new optionModel.BoolOptionField(),
    opacityFrom: null,
    opacityTo: null,
    stops: null,
    colorStops: null,
  },
  image: {
    src: null,
    width: new optionModel.NumberOptionField(),
    height: new optionModel.NumberOptionField(),
  },
  pattern: {
    style: new optionModel.SelectOptionField({
      verticalLines: {
        value: 'verticalLines',
        labelId: 'fill.pattern.style.option.verticalLines',
      },
      horizontalLines: {
        value: 'horizontalLines',
        labelId: 'fill.pattern.style.option.horizontalLines',
      },
      slantedLines: {
        value: 'slantedLines',
        labelId: 'fill.pattern.style.option.slantedLines',
      },
      squares: {
        value: 'squares',
        labelId: 'fill.pattern.style.option.squares',
      },
      circles: {
        value: 'circles',
        labelId: 'fill.pattern.style.option.circles',
      },
    }),
    width: new optionModel.NumberOptionField(),
    height: new optionModel.NumberOptionField(),
    strokeWidth: new optionModel.NumberOptionField(),
  },
};

export default fill;
