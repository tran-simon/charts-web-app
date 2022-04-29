import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel';

const legend: Options<ApexOptions['legend']> = {
  show: new optionModel.BoolOptionField(),
  showForSingleSeries: new optionModel.BoolOptionField(),
  showForNullSeries: new optionModel.BoolOptionField(),
  showForZeroSeries: new optionModel.BoolOptionField(),
  position: new optionModel.SelectOptionField({
    top: { value: 'top', labelId: 'legend.position.option.top' },
    right: { value: 'right', labelId: 'legend.position.option.right' },
    bottom: { value: 'bottom', labelId: 'legend.position.option.bottom' },
    left: { value: 'left', labelId: 'legend.position.option.left' },
  }),
  horizontalAlign: new optionModel.SelectOptionField({
    left: { value: 'left', labelId: 'legend.horizontalAlign.option.left' },
    center: {
      value: 'center',
      labelId: 'legend.horizontalAlign.option.center',
    },
    right: { value: 'right', labelId: 'legend.horizontalAlign.option.right' },
  }),
  floating: new optionModel.BoolOptionField(),
  fontSize: new optionModel.TextOptionField(),
  fontFamily: new optionModel.TextOptionField(),
  fontWeight: new optionModel.TextOptionField(),
  formatter: null,
  inverseOrder: new optionModel.BoolOptionField(),
  width: new optionModel.NumberOptionField(),
  height: new optionModel.NumberOptionField(),
  tooltipHoverFormatter: null,
  customLegendItems: null,
  offsetX: new optionModel.NumberOptionField(),
  offsetY: new optionModel.NumberOptionField(),
  labels: {
    colors: null,
    useSeriesColors: new optionModel.BoolOptionField(),
  },
  markers: {
    width: new optionModel.NumberOptionField(),
    height: new optionModel.NumberOptionField(),
    strokeWidth: new optionModel.NumberOptionField(),
    strokeColor: new optionModel.TextOptionField(),
    fillColors: null,
    radius: new optionModel.NumberOptionField(),
    customHTML: null,
    onClick: null,
    offsetX: new optionModel.NumberOptionField(),
    offsetY: new optionModel.NumberOptionField(),
  },
  itemMargin: {
    horizontal: new optionModel.NumberOptionField(),
    vertical: new optionModel.NumberOptionField(),
  },
  onItemClick: {
    toggleDataSeries: new optionModel.BoolOptionField(),
  },
  onItemHover: {
    highlightDataSeries: new optionModel.BoolOptionField(),
  },
};

export default legend;
