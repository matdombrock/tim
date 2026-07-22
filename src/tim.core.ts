import TurndownService from 'turndown';

const searchURL = process.env.SEARCH_URL || 'http://localhost:1235/search?q='

export async function getMarkdown(url: string): Promise<string> {
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

export async function getSearch(query: string): Promise<string> {
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
