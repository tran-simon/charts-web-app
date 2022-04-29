import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel';

const forecastDataPoints: Options<ApexOptions['forecastDataPoints']> = {
  count: null,
  fillOpacity: new optionModel.NumberOptionField(),
  strokeWidth: new optionModel.NumberOptionField(),
  dashArray: new optionModel.NumberOptionField(),
};

export default forecastDataPoints;
