import {
  OptionFieldBool,
  OptionFieldSelect,
  OptionFieldText,
} from '../modelOptionField';
import { ModelOptionSection } from '../modelOptionSection';

enum TitleAlign {
  left = 'left',
  center = 'center',
  right = 'right',
}

const title = new ModelOptionSection('title', {
  text: new OptionFieldText('text'),
  align: new OptionFieldSelect('align', TitleAlign, TitleAlign.left),
  floating: new OptionFieldBool('floating'),

  //..//
  style: new ModelOptionSection('style', {}),
});

export default new ModelOptionSection('chartOptions', {
  // annotations: '',
  // chart: '',
  // colors: '',
  // dataLabels: '',
  // fill: '',
  // forecastDataPoints: '',
  // grid: '',
  // labels: '',
  // legend: '',
  // markers: '',
  // noData: '',
  // plotOptions: '',
  // responsive: '',
  // states: '',
  // stroke: '',
  // subtitle: '',
  // theme: '',
  title,
  // tooltip: '',
  // xaxis: '',
  // yaxis: '',
});
