#!/usr/bin/env node

import TurndownService from 'turndown';

const searchURL = process.env.SEARCH_URL || 'http://localhost:1235/search?q='

async function getMarkdown(url: string): Promise<string> {
  if (!url.startsWith('http')) {
    // No protocol found, assume http
    url = 'http://' + url;
  }
  try {
    const response = await fetch(url, { redirect: 'follow' });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      process.exit(1);
    }

    const html = await response.text();
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    });

    // Strip non-content elements before conversion
    turndownService.remove(['style', 'script', 'nav', 'footer', 'header', 'aside']);

    const markdown = turndownService.turndown(html);

    return markdown;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Error: ${message}`);
    process.exit(1);
  }
}

async function getSearch(query: string): Promise<string> {
  async function getJSON(url: string): Promise<any> {
    try {
      const response = await fetch(url, { redirect: 'follow' });

      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        process.exit(1);
      }

      const json = await response.json();
      return json;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Error: ${message}`);
      process.exit(1);
    }
  }
  const json = await getJSON(`${searchURL}/${query}&format=json`);
  if (!json.results)
    console.error(`Error: bad json result`);
  let out = '';
  for (let item of json.results) {
    out += '# ' + item.title;
    out += '\n';
    out += 'URL: ' + item.url;
    out += '\n';
    out += 'Score: ' + item.score.toFixed(2) || item.score;
    out += ' Engine: ' + item.engine;
    out += ' Date: ' + item.publishedDate || item.pubdate || 'unknown';
    out += '\n---\n';
    out += item.content;
    out += '\n\n';
  }
  return out;
}

async function main(): Promise<void> {
  const cmd = process.argv[2];
  const query = process.argv.slice(3).join(' ');

  if (!cmd || !query) {
    console.error('Usage: http <cmd> <url|query>');
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
