import { generateCode, parseHtml, stringify } from './io';
import convert from './convert';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import fs from 'fs/promises';

const main = async (data: any, name: string, outputFile?: string) => {
  console.info(`Converting...`);
  const converted = convert(data, name);

  const stringRes = stringify(converted);
  const code = await generateCode(stringRes, name)

  if(outputFile){
    console.info(`Convertion successful! Writing to file '${outputFile}'...`);
    await fs.writeFile(outputFile, code)
  }
  else{
    console.info(`Convertion successful! Output:`)
    console.info(code)
  }
};

export default async (file?: string, url?: string, name?: string, outputFile?: string) => {
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
