import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel';

const responsive: Options<ApexOptions['responsive']> = {
  breakpoint: new optionModel.NumberOptionField(),
  options: null,
};

export default responsive;
