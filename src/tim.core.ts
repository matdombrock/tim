// 
// Tim - v26.8.20
//

import TurndownService from 'turndown';

const DEFAULT_SEARXNG_URL = 'http://localhost:1235/search?q=';
const BRAVE_ENDPOINT = 'https://api.search.brave.com/res/v1/web/search';

export async function getMarkdown(url: string): Promise<string> {
  if (!url.startsWith('http')) {
    // No protocol found, assume http
    url = 'http://' + url;
  }
  try {
    const response = await fetch(url, { redirect: 'follow' });

    if (!response.ok) {
      const msg = `Error: ${response.status} ${response.statusText}`;
      console.error(msg);
      return msg;
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
    const msg = 'Error: ' + (err instanceof Error ? err.message : String(err));
    console.error(msg);
    return msg;
  }
}

async function searxngSearch(query: string, searchURL: string): Promise<string> {
  async function getJSON(url: string): Promise<any> {
    try {
      const response = await fetch(url, { redirect: 'follow' });

      if (!response.ok) {
        const msg = `Error: ${response.status} ${response.statusText}`;
        console.error(msg);
        return msg;
      }

      const json = await response.json();
      return json;
    } catch (err: unknown) {
      const msg = 'Error: ' + (err instanceof Error ? err.message : String(err));
      console.error(msg);
      return msg;
    }
  }
  const json = await getJSON(`${searchURL}/${query}&format=json`);
  if (typeof json !== 'object' || !json.results) {
    console.error(`Error: bad json result`);
    return '';
  }
  let out = '';
  for (let item of json.results) {
    const score = item.score.toFixed(2) || item.score;
    let date = item.publishedDate || item.pubdate;
    date = date == 'null' ? 'unknown-date' : date;
    out += `
# ${item.title}
## ${item.url} 
${score}|${item.engine}|${date}
---
${item.content}
    `.trim() + '\n\n';
  }
  return out;
}

async function braveSearch(query: string, apiKey: string): Promise<string> {
  const url = `${BRAVE_ENDPOINT}?q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'X-Subscription-Token': apiKey,
      },
    });

    if (!response.ok) {
      const msg = `Error: ${response.status} ${response.statusText}`;
      console.error(msg);
      return msg;
    }

    const json = await response.json();
    const results = json.web?.results ?? [];
    let out = '';
    for (let i = 0; i < results.length; i++) {
      const item = results[i];
      const date = item.age || 'unknown-date';
      out += `
# ${item.title}
## ${item.url}
${i + 1}|brave|${date}
---
${item.description}
      `.trim() + '\n\n';
    }
    return out;
  } catch (err: unknown) {
    const msg = 'Error: ' + (err instanceof Error ? err.message : String(err));
    console.error(msg);
    return msg;
  }
}

export enum Engine {
  Brave = 'brave',
  SearXNG = 'searchxng',
}

export interface SearchOpt {
  query: string,
  engine?: Engine,
  apiKey?: string,
  searchxngUrl?: string,
  count?: number,
}

export async function getSearch(opt: SearchOpt): Promise<string> {
  const engine = process.env.TIM_ENGINE || opt.engine || 'brave';
  const apiKey = process.env.TIM_API_KEY || process.env.BRAVE_API_KEY || opt.apiKey;
  const searxngURL = process.env.TIM_SEARXNG_URL || opt.searchxngUrl || DEFAULT_SEARXNG_URL;

  if (engine === 'brave') {
    if (!apiKey) {
      const msg = 'Error: provider is "brave" but no braveApiKey set in search.config.json';
      console.error(msg);
      return msg;
    }
    return braveSearch(opt.query, apiKey);
  }
  return searxngSearch(opt.query, searxngURL);
}
