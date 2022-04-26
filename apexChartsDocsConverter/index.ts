#!/usr/bin/env ts-node

import arg from 'arg'
import main from './main';

const args = arg(
  {
    '--help': Boolean,
    '--file': String,
    '--write': String,
    '-h': '--help',
    '-f': '--file',
    '-w': '--write',
    '-o': '--output-folder'
  },
);

if (args['--help']) {
  console.info(`
Usage: apex-charts-docs-converter [URL] [NAME]

Options:
  --help (-h): Show this help
  --file (-f): Specify a file path instead of the url
  --write (-w): Choose the output file that will be written
Usage:
  apex-charts-docs-converter https://apexcharts.com/docs/options/<DOCUMENTATION_PAGE> name
  
To use with a custom file:
  apex-charts-docs-converter --file path/to/docs.html name

To write to a file:
  apex-charts-docs-converter https://apexcharts.com/docs/options/<DOCUMENTATION_PAGE> name --write ../name.ts
  `);
} else{
  if (args['--file']) {
    main(args['--file'], undefined, args['_'][0], args['--write']);
  }else {
    const [url, name] = args['_'];
    main(undefined, url, name, args['--write']);
  }
}
