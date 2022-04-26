import { generateCode, parseHtml, stringify } from '../io';
import * as assert from 'assert';
import { JSDOM } from 'jsdom';
import fs from 'fs/promises'


describe('io', ()=>{
  it('can parseHtml', async ()=>{
    const document = (await JSDOM.fromFile('tests/title.html')).window.document;
    expect(parseHtml(document)).toMatchSnapshot()
  })

  it('can stringify', async ()=>{
    const data = JSON.parse(await fs.readFile('tests/titleConvertedData.json', 'utf-8'))
    expect(stringify(data)).toMatchSnapshot()
  })

  it('can generate code', async ()=>{
    const data = JSON.parse(await fs.readFile('tests/titleConvertedData.json', 'utf-8'))
    expect(await generateCode(stringify(data), 'testGenerateCode')).toMatchSnapshot()
  })
})
