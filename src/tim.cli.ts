#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { getPage, getSearch, Engine } from "./tim.core";

const USAGE = `Usage: tim <cmd> [options] <url|query>

Commands:
  get <url>       Fetch a URL and convert HTML to Markdown
  search <query>  Run a web search

Options:
  -h, --help               Show this help and exit
  -p, --playwright         Render the page with Playwright (get)
      --pdf <path>         Save the page as a PDF (get)
      --screenshot <path>  Save a screenshot of the page (get)
      --markdown <path>    Write markdown to a file instead of stdout (get)
  -e, --engine <name>      Search engine: brave | searchxng (search)

The get output options (--pdf, --screenshot, --markdown) are exclusive:
only one may be used at a time.
`;

async function main(): Promise<void> {
  let positionals: string[];
  let values: { help?: boolean; playwright?: boolean; engine?: string; pdf?: string; screenshot?: string; markdown?: string };

  try {
    const parsed = parseArgs({
      allowPositionals: true,
      options: {
        help: { type: 'boolean', short: 'h' },
        playwright: { type: 'boolean', short: 'p' },
        engine: { type: 'string', short: 'e' },
        pdf: { type: 'string' },
        screenshot: { type: 'string' },
        markdown: { type: 'string' },
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
      const outputs = ['pdf', 'screenshot', 'markdown'].filter((o) => values[o as keyof typeof values]);
      if (outputs.length > 1) {
        console.error(`Error: --${outputs[0]} and --${outputs[1]} are exclusive. Use only one of --pdf, --screenshot, --markdown.`);
        process.exit(1);
      }
      res = await getPage({
        url: rest[0],
        playwright: values.playwright,
        pdfPath: values.pdf,
        screenshotPath: values.screenshot,
        markdownPath: values.markdown,
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
