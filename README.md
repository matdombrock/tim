# TIM

A simple (~100 LOC) CLI tool that:
- Fetches a URL and converts the HTML to Markdown using [turndown](https://github.com/mixmark-io/turndown).
- Runs web searches against a [searXNG](https://docs.searxng.org/) instance and return the results as markdown.

> [!NOTE]  
> This is not a tool for scripting. It is not a replacement for tools like `curl` in any way shape or form. This is a tool to provide human readable output of web sites and search engines in the terminal.
## Requires

- NodeJS 24+ 
- SearXNG server (for search)

## Usage Examples

```bash
tim get example.com
tim get https://en.wikipedia.org/wiki/Markdown
tim search test
tim search this is my search 
```

## Search URL

The program takes an optional `SEARCH_URL` env var. 

This defaults to `http://localhost:1235/search?q=`.

> [!NOTE]  
> A `&format=json` string is automatically appended after the search query. 

> [!TIP]  
> Look in `./extra` for a script that can help you set up your own searXNG instance. 

## Install

```bash
git clone https://github.com/matdombrock/tim.git
npm install
npm run build
```

Optionally link globally (`sudo` may be needed):

```bash
npm link
tim get https://example.com
```

## Uninstall 
```bash
npm uninstall -g tim
```
(`sudo` may be needed)


## Output Examples

### Get

```text
λ tim get matdombrock.com
     MatDombrock.com          

![](/img/logo.png)

 

## Welcome

Hi, my name is Mathieu Dombrock and this is my website.

It's built with my custom static site generator called [SteelSky](https://gith
ub.com/matdombrock/steelsky).

I'm a software engineer with 10+ years of experience. I specialize in audio, w
eb technologies and graphics/data visualization.

## Across the web

You can check out my commerical audio software at [replicataudio.com](https://
replicataudio.com).

I also have some other software available at [replicat.itch.io](https://replic
at.itch.io).

If that wasn't enough, you can find all of my open source projects at [github.
com/matdombrock](https://github.com/matdombrock).

If you're interested, you can read more [about me](/about.html).

## Recent Posts

[More Posts](/posts.html) | [RSS](/rss.xml)

...

```

### Search

```text
└λ tim search this is a test
# Armin van Buuren - This Is A Test (Extended Mix) - YouTube
URL: https://www.youtube.com/watch?v=fIrrHUaXpAE
Score: 7.50 Engine: startpage Date: null
---
Apr 23, 2017 ... Armin van Buuren's 9th studio album 'Breathe In' is OUT NOW! 
Discover the 'Breathe In' album ➡️ https://AvB.lnk.to/BreatheInYA Subscribe to
 ...

# This is a TEST | State and Local Readiness - CDC
URL: https://www.cdc.gov/readiness/php/testgame/index.html
Score: 4.25 Engine: startpage Date: null
---
This is a TEST (TEST) is a training and exercise simulation tool designed to f
oster collaborative emergency preparedness activities. It uses collaborative g
ame theory and adult learning principles to increase engagement and knowledge 
retention.

# This is a test - Wikipedia
URL: https://en.wikipedia.org/wiki/This_is_a_test
Score: 3.25 Engine: startpage Date: null
---
This disambiguation page lists articles associated with the title This is a te
st. If an internal link incorrectly led you here, you may wish to change the l
ink to point directly to the intended article.

# This Is A Test - song and lyrics by Armin van Buuren - Spotify
URL: https://open.spotify.com/track/2pRmnaUpB45s6i3AvHS17F
Score: 1.67 Engine: startpage Date: null
---
Popular Singles and EPs by Armin van Buuren · Here In My Arms (Enjoy The Silen
ce) · No Mercy · Let The Music Guide You (ASOT 950 Anthem) [ReOrder pres. Crow
d+ ...

# Armin van Buuren - This Is A Test Lyrics | Genius Lyrics
URL: https://genius.com/Armin-van-buuren-this-is-a-test-lyrics
Score: 1.20 Engine: startpage Date: null
---
This is a test This is a test This is a test Before proceeding with the show w
e'll have to do one more test: Testing at maximum volume Starting in ten, nine
, eight, seven, six, five, four, three ...

...

```

