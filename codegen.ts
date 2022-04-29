import apexChartsDocsConverter from './apexChartsDocsConverter/main';

const URLS = [
  {url: "https://apexcharts.com/docs/options/annotations/", name: "annotations"},
  // {url: "https://apexcharts.com/docs/options/colors/", name: "colors"},
  {url: "https://apexcharts.com/docs/options/datalabels/", name: "dataLabels"},
  {url: "https://apexcharts.com/docs/options/fill/", name: "fill"},
  {url: "https://apexcharts.com/docs/options/forecastdatapoints/", name: "forecastDataPoints"},
  {url: "https://apexcharts.com/docs/options/grid/", name: "grid"},
  // {url: "https://apexcharts.com/docs/options/labels/", name: "labels"},
  {url: "https://apexcharts.com/docs/options/legend/", name: "legend"},
  {url: "https://apexcharts.com/docs/options/markers/", name: "markers"},
  {url: "https://apexcharts.com/docs/options/nodata/", name: "noData"},
  {url: "https://apexcharts.com/docs/options/responsive/", name: "responsive"},
  {url: "https://apexcharts.com/docs/options/states/", name: "states"},
  {url: "https://apexcharts.com/docs/options/stroke/", name: "stroke"},
  {url: "https://apexcharts.com/docs/options/subtitle/", name: "subtitle"},
  {url: "https://apexcharts.com/docs/options/theme/", name: "theme"},
  {url: "https://apexcharts.com/docs/options/title/", name: "title"},
  {url: "https://apexcharts.com/docs/options/tooltip/", name: "tooltip"},
  {url: "https://apexcharts.com/docs/options/xaxis/", name: "xaxis"},
  {url: "https://apexcharts.com/docs/options/yaxis/", name: "yaxis"},
];


console.info('Regenerating sources...');

const names = process.argv.slice(2);
apexChartsDocsConverter(
  names.length ?
    URLS.filter((v) => names.includes(v.name)) :
    URLS,
  `src/generated-sources`);



/*
https://apexcharts.com/docs/options/chart/animations/
https://apexcharts.com/docs/options/chart/background/
https://apexcharts.com/docs/options/chart/brush/
https://apexcharts.com/docs/options/chart/defaultlocale/
https://apexcharts.com/docs/options/chart/dropshadow/
https://apexcharts.com/docs/options/chart/fontfamily/
https://apexcharts.com/docs/options/chart/forecolor/
https://apexcharts.com/docs/options/chart/group/
https://apexcharts.com/docs/options/chart/events/
https://apexcharts.com/docs/options/chart/height/
https://apexcharts.com/docs/options/chart/id/
https://apexcharts.com/docs/options/chart/locales/
https://apexcharts.com/docs/options/chart/offsetx/
https://apexcharts.com/docs/options/chart/offsety/
https://apexcharts.com/docs/options/chart/parentheightoffset/
https://apexcharts.com/docs/options/chart/redrawonparentresize/
https://apexcharts.com/docs/options/chart/redrawonwindowresize/
https://apexcharts.com/docs/options/chart/selection/
https://apexcharts.com/docs/options/chart/sparkline/
https://apexcharts.com/docs/options/chart/stacked/
https://apexcharts.com/docs/options/chart/stacktype/
https://apexcharts.com/docs/options/chart/toolbar/
https://apexcharts.com/docs/options/chart/type/
https://apexcharts.com/docs/options/chart/width/
https://apexcharts.com/docs/options/chart/zoom/

 */
