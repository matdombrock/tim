#!/usr/bin/env node

import { getMarkdown, getSearch } from "./tim.core";

async function main(): Promise<void> {
  const cmd = process.argv[2];
  const query = process.argv.slice(3).join(' ');

  if (!cmd || !query) {
    console.error('Usage: tim <cmd> <url|query>');
    process.exit(1);
  }

  let res = '';
  switch (cmd) {
    case 'get':
      res = await getMarkdown(query);
      break;
    case 'search':
      res = await getSearch(query);
      break;
    default:
      res = 'Error: Unknown command ' + cmd;
      res += 'Try `get` or `search`';
  }
  console.log(res);
}

main();
