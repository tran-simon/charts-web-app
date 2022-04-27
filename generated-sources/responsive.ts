import { ApexOptions } from 'apexcharts';
import { Options } from '../src/model/optionModel';
import * as optionModel from '../src/model/optionModel';

const responsive: Options<ApexOptions['responsive']> = {
  breakpoint: new optionModel.NumberOptionField(),
  options: null,
};

export default responsive;
