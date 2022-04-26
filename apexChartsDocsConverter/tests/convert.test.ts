import * as assert from 'assert';
import fs from 'fs';
import convert from '../convert';
import { parseHtml } from '../io';
import { JSDOM } from 'jsdom';

describe("convert", ()=>{
  let jsonData = {}

  beforeAll(async () => {
    const document = (await JSDOM.fromFile('tests/title.html')).window.document;
    jsonData = parseHtml(document);
  })

  it('can convert title.html', ()=>{
    expect(convert(jsonData, 'title')).toMatchSnapshot()
  })
})
