import { promises as fs } from 'fs';
// @ts-ignore
import { parse } from 'himalaya';
import { JSDOM } from 'jsdom';
import { isDocSection, isDocValue } from './convert';
import prettier from 'prettier'

export const generateCode = async (data: string, name: string) => {
  const res = `
import { ApexOptions } from 'apexcharts';
import { Options } from '../optionModel';

const ${name}: Options<ApexOptions['${name}']> = ${data};

export default ${name}; 
`;

  const options = (await prettier.resolveConfig('../.prettierrc.json')) || {
    'semi': true,
    'trailingComma': 'all',
    'singleQuote': true,
    'tabWidth': 2,
  };
  return prettier.format(res, {
    parser: 'babel',
    ...options
  })
};

export const stringify = (data: object): string => {
  const replacer = (key: string, v: any) => {
    if (isDocValue(v)) {
      if (v.options) {

        const selectOptions = v.options
          .map((option) =>
            `${option}: { value: '${option}', labelId: ${[...v.path, 'option', option].join('.')} }`)

        return `new SelectOptionField({ ${selectOptions} })`;
      }

      if (v.type === 'string') {
        return `new TextOptionField()`;
      }
      if (v.type === 'number') {
        return `new NumberOptionField()`;
      }
      if (v.type === 'boolean') {
        return `new BoolOptionField()`;
      }
      if (v.type === 'string | number' || v.type === 'number | string') {
        // TODO(https://github.com/tran-simon/pretty-charts/issues/5)
        return `new TextOptionField()`;
      }
      if (v.type === 'color'){
        // TODO(https://github.com/tran-simon/pretty-charts/issues/6)
        return `new TextOptionField()`;
      }
    } else if (isDocSection(v)) {
      return  v.children.reduce((acc, curr) => {
        acc[curr.name] = curr
        return acc;
      }, {} as any);
    }
    return v;
  };

  return JSON.stringify(data, replacer, 2).replaceAll('"', '');
};

/**
 * HTML file to js object
 * @param html document data
 */
export const parseHtml = (html: Document) => {
  const optionsDetails = html.getElementsByClassName('options-details').item(0);

  if (!optionsDetails) {
    throw 'Error while retrieving HTML element: element with class `options-details` not found.';
  }

  return parse(optionsDetails.innerHTML);
};
