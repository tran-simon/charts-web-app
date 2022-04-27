import { generateCode, parseHtml, stringify } from './io';
import convert from './convert';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import fs from 'fs/promises';

const main = async (data: any, name: string, outputFile?: string) => {
  console.info(`Converting '${name}'...`);
  const converted = convert(data, name);

  const stringRes = stringify(converted);
  try {
    const code = await generateCode(stringRes, name);

    if (!code) {
      console.info(`Convertion failed for '${name}'`);
      return false;
    } else if (outputFile) {
      console.info(`Convertion successful! Writing to file '${outputFile}'...`);
      await fs.writeFile(outputFile, code);
    } else {
      console.info(`Convertion successful! Output:`);
      console.info(code);
    }
    return true;
  } catch (e) {
    console.error(e)
    return false
  }
};

export const cli = async (file?: string, url?: string, name?: string, outputFile?: string) => {
  if (name && (file || url)) {
    if (file) {
      const document = (await JSDOM.fromFile(file)).window.document;
      await main(parseHtml(document), name, outputFile);
    } else if (url) {
      const document = (await JSDOM.fromURL(url)).window.document;
      await main(parseHtml(document), name, outputFile);
    }
  } else {
    console.error(`
Please provide a name and a file or url.
Run 'apex-charts-docs-converter --help' for help.
    `);
  }

}

export default async (urls: {url: string, name: string}[], outputFolder?: string)=>{
  let failed = []
  for (let i = 0; i < urls.length; i++) {
    const {url, name} = urls[i]
    const document = (await JSDOM.fromURL(url).catch((e)=>{
      console.error(`Could not load from url: ${url}.\n`, e)
    }))?.window.document;
    if (document) {
      const res = await main(parseHtml(document), name, `${outputFolder}/${name}.ts`);
      if (!res) {
        failed.push(name)
      }
    }
  }

  if (failed.length) {
    console.info('Some convertions failed: ' + failed);
  }
}
