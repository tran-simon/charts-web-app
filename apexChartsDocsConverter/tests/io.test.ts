import { generateCode, parseHtml, stringify } from '../io';
import * as assert from 'assert';
import { JSDOM } from 'jsdom';
import fs from 'fs/promises'
import convert from '../convert';
import { testAll } from './testUtils';

describe('io', ()=>{
  it('can parseHtml', testAll(async (file, name)=>{
    const document = (await JSDOM.fromFile(file)).window.document;
    expect(parseHtml(document)).toMatchSnapshot(name)
  }))


  it('can stringify', testAll(async (file: string, name: string) => {
    const document = (await JSDOM.fromFile(file)).window.document;
    const jsonData = parseHtml(document);
    const converted = convert(jsonData, name);

    expect(stringify(converted)).toMatchSnapshot(name);
  }));


  it('can generate code', testAll(async (file: string, name: string) => {
    const document = (await JSDOM.fromFile(file)).window.document;
    const jsonData = parseHtml(document);
    const converted = convert(jsonData, name);
    expect(await generateCode(stringify(converted), name)).toMatchSnapshot(name);
  }));
})
