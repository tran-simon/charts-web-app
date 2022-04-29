import { promises as fs } from 'fs';
// @ts-ignore
import { parse } from 'himalaya';
import { JSDOM } from 'jsdom';
import { isDocSection, isDocValue, numberOrStringTypes } from './convert';
import prettier from 'prettier'
import {stringifyHardcode} from './hardcode';

export const generateCode = async (data: string, name: string) => {
  const res = `
import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel'

const ${name}: Options<ApexOptions['${name}']> = ${data};

export default ${name}; 
`;

  const options = (await prettier.resolveConfig('../.prettierrc.json')) || {
    'semi': true,
    'trailingComma': 'all',
    'singleQuote': true,
    'tabWidth': 2,
  };
  try {
    return prettier.format(res, {
      parser: 'babel',
      ...options,
    });
  }
  catch (e) {
    console.info("Generated code pre-prettifying:\n\n" + res)
    return Promise.reject(
      `Failed to prettify the output for ${name}: ` + e,
    );
  }
};

export const stringify = (data: any): string => {
  const replacer = (key: string, v: any) => {
    if (isDocValue(v)) {
      const stringPath = v.path.join('.');
      if (stringifyHardcode.hasOwnProperty(stringPath)) {
        return stringifyHardcode[stringPath]
      }
      if (v.type === undefined) {
        return undefined
      }
      if (v.options) {
        const selectOptions = v.options
          .map((option) =>
            `${option}: { value: '${option}', labelId: '${[...v.path, 'option', option].join('.')}' }`);

        if (v.type?.includes('[]')) {
          return `new optionModel.ListOptionField(new optionModel.SelectOptionField({ ${selectOptions} }, ${v.type === 'string | string[]'}))`;
        }
        return `new optionModel.SelectOptionField({ ${selectOptions} })`;
      }

      if (v.type === 'string') {
        return `new optionModel.TextOptionField()`;
      }
      if (v.type === 'number') {
        return `new optionModel.NumberOptionField()`;
      }
      if (v.type === 'boolean') {
        return `new optionModel.BoolOptionField()`;
      }

      if (v.type === 'string | number'){
        // TODO(https://github.com/tran-simon/pretty-charts/issues/5)
        return `new optionModel.TextOptionField()`;
      }

      if (v.type?.includes('[]')) {
        // todo
        return `new optionModel.ListOptionField(new optionModel.TextOptionField())`;
      }
      if (v.type === 'function') {
        //todo
        return `null`
      }
      if (v.type === 'any') {
        return `null`
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
