import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel';

const states: Options<ApexOptions['states']> = {
  normal: {
    filter: {
      type: new optionModel.SelectOptionField({
        none: {
          value: 'none',
          labelId: 'states.normal.filter.type.option.none',
        },
        lighten: {
          value: 'lighten',
          labelId: 'states.normal.filter.type.option.lighten',
        },
        darken: {
          value: 'darken',
          labelId: 'states.normal.filter.type.option.darken',
        },
      }),
      value: new optionModel.NumberOptionField(),
    },
  },
  hover: {
    filter: {
      type: new optionModel.SelectOptionField({
        none: {
          value: 'none',
          labelId: 'states.hover.filter.type.option.none',
        },
        lighten: {
          value: 'lighten',
          labelId: 'states.hover.filter.type.option.lighten',
        },
        darken: {
          value: 'darken',
          labelId: 'states.hover.filter.type.option.darken',
        },
      }),
      value: new optionModel.NumberOptionField(),
    },
  },
  active: {
    allowMultipleDataPointsSelection: new optionModel.BoolOptionField(),
    filter: {
      type: new optionModel.SelectOptionField({
        none: {
          value: 'none',
          labelId: 'states.active.filter.type.option.none',
        },
        lighten: {
          value: 'lighten',
          labelId: 'states.active.filter.type.option.lighten',
        },
        darken: {
          value: 'darken',
          labelId: 'states.active.filter.type.option.darken',
        },
      }),
      value: new optionModel.NumberOptionField(),
    },
  },
};

export default states;
