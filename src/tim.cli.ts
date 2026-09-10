#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { getPage, getSearch, Engine } from "./tim.core";

const USAGE = `Usage: tim <cmd> [options] <url|query>

Commands:
  get [opt] <url>          Fetch a URL and convert HTML to Markdown
  search [opt] <query>     Run a web search

Options:
  -h, --help               Show this help and exit
Get:
  --pw                     Render the page with Playwright
  -p, --pdf                Save the page as a PDF
  -s, --screenshot         Save a screenshot of the page
  -m, --markdown           Write markdown to a file
  -o, --path <path>        Base path for output files (no extension)
Search:
  -e, --engine <name>      Search engine: brave | searchxng

These get options can be combined; Playwright renders the page when any
of -p, -s, or -m is used (overriding --pw).
`;

async function main(): Promise<void> {
  let positionals: string[];
  let values: { help?: boolean; playwright?: boolean; engine?: string; pdf?: boolean; screenshot?: boolean; ss?: boolean; markdown?: boolean; md?: boolean; path?: string };

  try {
    const parsed = parseArgs({
      allowPositionals: true,
      options: {
        help: { type: 'boolean', short: 'h' },
        pdf: { type: 'boolean', short: 'p' },
        playwright: { type: 'boolean', short: 'w' },
        screenshot: { type: 'boolean', short: 's' },
        ss: { type: 'boolean' },
        markdown: { type: 'boolean', short: 'm' },
        md: { type: 'boolean' },
        engine: { type: 'string', short: 'e' },
        path: { type: 'string', short: 'o' },
      },
    });
    positionals = parsed.positionals;
    values = parsed.values;
  } catch (err) {
    console.error('Error: ' + (err instanceof Error ? err.message : String(err)));
    console.error(USAGE);
    process.exit(1);
  }

  if (values.help) {
    console.log(USAGE);
    process.exit(0);
  }

  const [cmd, ...rest] = positionals;

  let res = '';
  switch (cmd) {
    case undefined:
      console.error('Usage: tim <cmd> <url|query>');
      process.exit(1);
    case 'get': {
      if (rest.length !== 1) {
        console.error('Usage: tim get <url>');
        process.exit(1);
      }
      res = await getPage({
        url: rest[0],
        playwright: values.playwright,
        po: {
          path: values.path || '',
          pdf: !!values.pdf,
          ss: !!values.ss || !!values.screenshot,
          md: !!values.md || !!values.markdown,
        },
      });
      break;
    }
    case 'search':
      if (rest.length === 0) {
        console.error('Usage: tim search <query>');
        process.exit(1);
      }
      res = await getSearch({
        query: rest.join(' '),
        engine: values.engine as Engine | undefined,
      });
      break;
    default:
      res = `Error: Unknown command ${cmd}.\nTry \`get\` or \`search\``;
  }
  console.log(res);
}

main();
