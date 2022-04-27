import * as assert from 'assert';
import fs from 'fs';
import convert from '../convert';
import { parseHtml } from '../io';
import { JSDOM } from 'jsdom';
import { testAll } from './testUtils';

describe("convert", ()=>{

  it('can convert', testAll(async (file: string, name: string) => {
    const document = (await JSDOM.fromFile(file)).window.document;
    const jsonData = parseHtml(document);
    expect(convert(jsonData, name)).toMatchSnapshot(name);
  }));
})
