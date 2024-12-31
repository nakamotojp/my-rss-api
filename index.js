const express = require('express');
const { scrapeTogetter } = require('./src/scrapers/togetter');
const { scrapeKomachi } = require('./src/scrapers/komachi');
const { buildRssFeed } = require('./src/utils/rssBuilder');
const { sites } = require('./src/config/sites');

const app = express();
const PORT = 3000;

app.get('/api/feed/:site', async (req, res) => {
  try {
    let articles = [];
    const site = req.params.site;
    const siteConfig = sites[site];

    if (!siteConfig) {
      return res.status(400).send('Invalid site specified');
    }

    switch (site) {
      case 'togetter':
        articles = await scrapeTogetter();
        break;
      case 'komachi':
        articles = await scrapeKomachi();
        break;
    }

    const rssFeed = buildRssFeed(articles, siteConfig);
    res.header('Content-Type', 'application/rss+xml');
    res.send(rssFeed);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});