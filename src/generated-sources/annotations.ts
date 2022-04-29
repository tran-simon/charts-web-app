import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel';

const annotations: Options<ApexOptions['annotations']> = {
  position: new optionModel.SelectOptionField({
    front: { value: 'front', labelId: 'annotations.position.option.front' },
    back: { value: 'back', labelId: 'annotations.position.option.back' },
  }),
  yaxis: {
    y: new optionModel.NumberOptionField(),
    strokeDashArray: new optionModel.NumberOptionField(),
    borderColor: null,
    fillColor: null,
    opacity: new optionModel.NumberOptionField(),
    offsetX: new optionModel.NumberOptionField(),
    offsetY: new optionModel.NumberOptionField(),
    width: new optionModel.TextOptionField(),
    yAxisIndex: new optionModel.NumberOptionField(),
    label: {
      borderColor: null,
      borderWidth: new optionModel.NumberOptionField(),
      borderRadius: new optionModel.NumberOptionField(),
      text: new optionModel.TextOptionField(),
      textAnchor: new optionModel.SelectOptionField({
        start: {
          value: 'start',
          labelId: 'annotations.yaxis.label.textAnchor.option.start',
        },
        middle: {
          value: 'middle',
          labelId: 'annotations.yaxis.label.textAnchor.option.middle',
        },
        end: {
          value: 'end',
          labelId: 'annotations.yaxis.label.textAnchor.option.end',
        },
      }),
      position: new optionModel.SelectOptionField({
        left: {
          value: 'left',
          labelId: 'annotations.yaxis.label.position.option.left',
        },
        right: {
          value: 'right',
          labelId: 'annotations.yaxis.label.position.option.right',
        },
      }),
      offsetX: new optionModel.NumberOptionField(),
      offsetY: new optionModel.NumberOptionField(),
      mouseEnter: null,
      mouseLeave: null,
      style: {
        background: null,
        color: null,
        fontSize: new optionModel.TextOptionField(),
        fontWeight: new optionModel.TextOptionField(),
        fontFamily: new optionModel.TextOptionField(),
        cssClass: new optionModel.TextOptionField(),
        padding: {
          left: new optionModel.NumberOptionField(),
          right: new optionModel.NumberOptionField(),
          top: new optionModel.NumberOptionField(),
          bottom: new optionModel.NumberOptionField(),
        },
      },
    },
  },
  xaxis: {
    x: new optionModel.NumberOptionField(),
    strokeDashArray: new optionModel.NumberOptionField(),
    borderColor: null,
    fillColor: null,
    opacity: new optionModel.NumberOptionField(),
    offsetX: new optionModel.NumberOptionField(),
    offsetY: new optionModel.NumberOptionField(),
    label: {
      borderColor: null,
      borderWidth: new optionModel.NumberOptionField(),
      borderRadius: new optionModel.NumberOptionField(),
      text: new optionModel.TextOptionField(),
      textAnchor: new optionModel.SelectOptionField({
        start: {
          value: 'start',
          labelId: 'annotations.xaxis.label.textAnchor.option.start',
        },
        middle: {
          value: 'middle',
          labelId: 'annotations.xaxis.label.textAnchor.option.middle',
        },
        end: {
          value: 'end',
          labelId: 'annotations.xaxis.label.textAnchor.option.end',
        },
      }),
      position: new optionModel.SelectOptionField({
        top: {
          value: 'top',
          labelId: 'annotations.xaxis.label.position.option.top',
        },
        bottom: {
          value: 'bottom',
          labelId: 'annotations.xaxis.label.position.option.bottom',
        },
      }),
      orientation: new optionModel.SelectOptionField({
        vertical: {
          value: 'vertical',
          labelId: 'annotations.xaxis.label.orientation.option.vertical',
        },
        horizontal: {
          value: 'horizontal',
          labelId: 'annotations.xaxis.label.orientation.option.horizontal',
        },
      }),
      offsetX: new optionModel.NumberOptionField(),
      offsetY: new optionModel.NumberOptionField(),
      mouseEnter: null,
      mouseLeave: null,
      style: {
        color: null,
        fontSize: new optionModel.TextOptionField(),
        fontWeight: new optionModel.TextOptionField(),
        fontFamily: new optionModel.TextOptionField(),
        cssClass: new optionModel.TextOptionField(),
      },
    },
  },
  points: {
    x: new optionModel.TextOptionField(),
    y: new optionModel.NumberOptionField(),
    yAxisIndex: new optionModel.NumberOptionField(),
    seriesIndex: new optionModel.NumberOptionField(),
    mouseEnter: null,
    mouseLeave: null,
    marker: {
      size: new optionModel.NumberOptionField(),
      fillColor: new optionModel.TextOptionField(),
      strokeColor: new optionModel.TextOptionField(),
      strokeWidth: new optionModel.NumberOptionField(),
      shape: new optionModel.SelectOptionField({
        circle: {
          value: 'circle',
          labelId: 'annotations.points.marker.shape.option.circle',
        },
        square: {
          value: 'square',
          labelId: 'annotations.points.marker.shape.option.square',
        },
      }),
      radius: new optionModel.NumberOptionField(),
      offsetX: new optionModel.NumberOptionField(),
      offsetY: new optionModel.NumberOptionField(),
      cssClass: new optionModel.TextOptionField(),
    },
    label: {
      borderColor: null,
      borderWidth: new optionModel.NumberOptionField(),
      borderRadius: new optionModel.NumberOptionField(),
      text: new optionModel.TextOptionField(),
      textAnchor: new optionModel.SelectOptionField({
        start: {
          value: 'start',
          labelId: 'annotations.points.label.textAnchor.option.start',
        },
        middle: {
          value: 'middle',
          labelId: 'annotations.points.label.textAnchor.option.middle',
        },
        end: {
          value: 'end',
          labelId: 'annotations.points.label.textAnchor.option.end',
        },
      }),
      offsetX: new optionModel.NumberOptionField(),
      offsetY: new optionModel.NumberOptionField(),
      mouseEnter: null,
      mouseLeave: null,
      style: {
        background: null,
        color: null,
        fontSize: new optionModel.TextOptionField(),
        fontWeight: new optionModel.TextOptionField(),
        fontFamily: new optionModel.TextOptionField(),
        cssClass: new optionModel.TextOptionField(),
        padding: {
          left: new optionModel.NumberOptionField(),
          right: new optionModel.NumberOptionField(),
          top: new optionModel.NumberOptionField(),
          bottom: new optionModel.NumberOptionField(),
        },
      },
    },
    image: {
      path: new optionModel.TextOptionField(),
      width: new optionModel.NumberOptionField(),
      height: new optionModel.NumberOptionField(),
      offsetX: new optionModel.NumberOptionField(),
      offsetY: new optionModel.NumberOptionField(),
    },
  },
  texts: {
    x: new optionModel.NumberOptionField(),
    y: new optionModel.NumberOptionField(),
    text: new optionModel.TextOptionField(),
    textAnchor: new optionModel.SelectOptionField({
      start: {
        value: 'start',
        labelId: 'annotations.texts.textAnchor.option.start',
      },
      middle: {
        value: 'middle',
        labelId: 'annotations.texts.textAnchor.option.middle',
      },
      end: { value: 'end', labelId: 'annotations.texts.textAnchor.option.end' },
    }),
    color: null,
    fontSize: new optionModel.TextOptionField(),
    fontWeight: new optionModel.TextOptionField(),
    fontFamily: new optionModel.TextOptionField(),
    appendTo: new optionModel.TextOptionField(),
    borderColor: null,
    borderRadius: new optionModel.NumberOptionField(),
    borderWidth: new optionModel.NumberOptionField(),
    paddingLeft: new optionModel.NumberOptionField(),
    paddingRight: new optionModel.NumberOptionField(),
    paddingTop: new optionModel.NumberOptionField(),
    paddingBottom: new optionModel.NumberOptionField(),
  },
  images: {
    path: new optionModel.TextOptionField(),
    x: new optionModel.NumberOptionField(),
    y: new optionModel.NumberOptionField(),
    width: new optionModel.NumberOptionField(),
    height: new optionModel.NumberOptionField(),
    appendTo: new optionModel.TextOptionField(),
  },
};

export default annotations;
