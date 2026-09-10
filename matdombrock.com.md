<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/hljs-theme.css">
    <link rel="stylesheet" href="/css/site.css">
    <link rel="stylesheet" href="/css/colors.css">

    <title>MatDombrock.com</title>
    <meta name="description" content="The home page of Mathieu Dombrock">
    <meta property="og:title" content="MatDombrock.com">
    <meta property="og:description" content="The home page of Mathieu Dombrock">
    <meta property="og:image" content="https://matdombrock.com/img/icon.png">
    <meta property="og:url" content="/index.html">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="MatDombrock.com">
    <meta name="twitter:description" content="The home page of Mathieu Dombrock">
    <meta name="twitter:image" content="https://matdombrock.com/img/icon.png">
  <script>
    // Add pageMeta to window for later use
    window.pageMeta = {
      title: "MatDombrock.com",
      description: "The home page of Mathieu Dombrock",
      image: "/img/icon.png",
      date: "2026-07-24T01:17:49.968Z",
      path: "/index.html",
      ext: ".html",
    };
  </script></head>
  
  <body>
    <header>
      <a href="/"><img src="/img/logo.png" alt="logo"></a>
      <nav>
        <a href="/about.html">About</a>
        <a href="/projects.html">Projects</a>
        <a href="/posts.html">Posts</a>
      </nav>
    </header>
    <div id="base-layer"></div>

    <div id="page-content">
      <p><link rel="stylesheet" href="/templates/posts.css"></p>
      <script type="module" src="/templates/posts.js" defer=""></script>
      <p><link rel="stylesheet" href="/templates/card.css"></p>
      <!-- 
Templates that will only be used once per page can have all their stuff in one file 
-->
      <div id="jumbo">
        <canvas id="jumbo-canvas" width="2000" height="700"></canvas>
        <img src="/img/logo.png">
      </div>
      <div id="jumbo-spacer"></div>
      <script src="/js/mountains.js"></script>
      <script>
        const mountains = new MountainsDrawer("jumbo-canvas");
      </script>
      <style>
        :root {
          --jumbo-height: 20vh;
        }
        #jumbo {
          position: absolute;
          top: var(--header-height);
          left: 0;
          width: 100%;
          background: linear-gradient(to right, var(--accent), var(--accent2));
          height: var(--jumbo-height);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: var(--shadow);
        }
        #jumbo img {
          position: relative;
          bottom: 0;
          max-height: 90%;
          max-width: 90%;
          box-shadow: none;
        }
        #jumbo-spacer {
          height: var(--jumbo-height);
        }
        #jumbo-canvas {
          height: var(--jumbo-height);
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      </style>
      <h2 id="welcome">Welcome</h2>
      <p>Hi, my name is Mathieu Dombrock and this is my website.</p>
      <p>
        It's built with my custom static site generator called
        <a href="https://github.com/matdombrock/steelsky">SteelSky</a>.
      </p>
      <p>
        I'm a software engineer with 10+ years of experience. I specialize in
        audio, web technologies and graphics/data visualization.
      </p>
      <h2 id="acrosstheweb">Across the web</h2>
      <p>
        You can check out my commercial audio software at
        <a href="https://replicataudio.com">replicataudio.com</a>.
      </p>
      <p>
        I also have some other software available at
        <a href="https://replicat.itch.io">replicat.itch.io</a>.
      </p>
      <p>
        If that wasn't enough, you can find all of my open source projects at
        <a href="https://github.com/matdombrock">github.com/matdombrock</a>.
      </p>
      <p>
        If you're interested, you can read more
        <a href="/about.html">about me</a>.
      </p>
      <h2 id="recentposts">Recent Posts</h2>
      <div class="template-posts">
        <!--
Some templates may have JS inline and specify a global JS file for the template
-->

        <div id="posts-wrap"><div class="posts-wrap-inner"><a href="/posts/wayland-touchpad-fix.html" class="post">
        <div class="post-info">
          <span class="post-title">Gnome + Wayland Touchpad Scroll Fix</span>
          <p class="post-date">9/30/2025</p>
          <p class="post-description">Fix the touchpad scrolling speed on Gnome + Wayland</p>
          <a href="/posts/wayland-touchpad-fix.html">Read more</a>
        </div>
        <div class="post-image" style="background-image: url('/img/icon.png')"></div>
      </a><a href="/posts/adsr-env.html" class="post">
        <div class="post-info">
          <span class="post-title">ADSR Envelopes</span>
          <p class="post-date">8/31/2025</p>
          <p class="post-description">An exploration of ADSR envelopes for DSP.</p>
          <a href="/posts/adsr-env.html">Read more</a>
        </div>
        <div class="post-image" style="background-image: url('/img/icon.png')"></div>
      </a><a href="/posts/linux-largest-file.html" class="post">
        <div class="post-info">
          <span class="post-title">Listing The Largest Files On A Linux System</span>
          <p class="post-date">10/31/2023</p>
          <p class="post-description">How to deal with full drives on linux.</p>
          <a href="/posts/linux-largest-file.html">Read more</a>
        </div>
        <div class="post-image" style="background-image: url('/img/icon.png')"></div>
      </a></div></div>

        <script type="module">
          import { Posts } from "/templates/posts.js";
          window.onload = function () {
            const posts = new Posts("posts-wrap");
            posts.setMaxPosts(Number(3));
            posts.setRandomOrder("false");
            posts.setShowSearchBar("false");
            posts.build();
          };
        </script>
      </div>
      <p><a href="/posts.html">More Posts</a> | <a href="/rss.xml">RSS</a></p>
      <h2 id="topprojects">Top Projects</h2>
      <!--GreenWave-->
      <!-- 
when templates are used more than once per page
they should have their css and js split into their own files
each will be included only once per page
-->
      <div class="card">
        <a href="https://replicataudio.com/greenwave">
          <div class="card-title">GreenWave</div>
          <div class="card-img">
            <img src="/img/projects/greenwave.png" alt="GreenWave image">
          </div>
        </a>
        <div class="card-body">
          GreenWave is a unique and modern software synthesizer built from the
          ground up to create fresh sounds without giving up the classic analog
          phat.
        </div>
        <div class="card-footer">C++, JUCE</div>
      </div>
      <!--SONAR)))-->
      <!-- 
when templates are used more than once per page
they should have their css and js split into their own files
each will be included only once per page
-->
      <div class="card">
        <a href="https://github.com/matdombrock/sonar">
          <div class="card-title">SONAR)))</div>
          <div class="card-img">
            <img src="/img/projects/sonar.png" alt="SONAR))) image">
          </div>
        </a>
        <div class="card-body">
          A friendly, fuzzy find first, file manager for your terminal.
        </div>
        <div class="card-footer">Rust, Ratatui</div>
      </div>
      <!--CH33TR-->
      <!-- 
when templates are used more than once per page
they should have their css and js split into their own files
each will be included only once per page
-->
      <div class="card">
        <a href="https://replicat.itch.io/ch33tr">
          <div class="card-title">CH33TR</div>
          <div class="card-img">
            <img src="/img/projects/cheetr.gif" alt="CH33TR image">
          </div>
        </a>
        <div class="card-body">
          Hax your way to victory in CH33TR. A lo-fi rogue-like dice-roller
          where the only reason to lose is that you didn't cheat hard enough.
        </div>
        <div class="card-footer">Lua, Love2D</div>
      </div>
      <!--NOPAZ-->
      <!-- 
when templates are used more than once per page
they should have their css and js split into their own files
each will be included only once per page
-->
      <div class="card">
        <a href="https://github.com/matdombrock/nopaz">
          <div class="card-title">NOPAZ</div>
          <div class="card-img">
            <img src="/img/projects/nopaz.png" alt="NOPAZ image">
          </div>
        </a>
        <div class="card-body">
          No account, no vault, no worries. An account-less, vault-less,
          cloud-less password manager for humans.
        </div>
        <div class="card-footer">Typescript</div>
      </div>
      <p><a href="/projects.html">More Projects</a></p>
    </div>
    <!-- #page-content -->

    <footer>
      <div>
        © <a href="https://matdomrbock.com">Mathieu Dombrock</a>
        <span id="footer-year">2026</span> | Powered by<a href="https://github.com/matdombrock/steelsky" style="margin-left: 0.5rem">SteelSky</a>
        |
        <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GLPv3</a>
      </div>
    </footer>
    <script>
      document.getElementById("footer-year").textContent =
        new Date().getFullYear();
    </script>
  

</body></html>