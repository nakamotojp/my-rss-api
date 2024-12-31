const RSS = require('rss');

function createRssFeed(title, description, siteUrl) {
  return new RSS({
    title: title,
    description: description,
    site_url: siteUrl,
    language: 'ja',
    generator: false // Removes "RSS for Node" text
  });
}

function buildRssFeed(articles, siteConfig) {
  const feed = createRssFeed(
    siteConfig.title,
    siteConfig.description,
    siteConfig.siteUrl
  );

  articles.forEach(article => {
    feed.item({
      title: article.title,
      url: article.url,
      guid: article.url
      // Removed date field to exclude timestamps
    });
  });

  return feed.xml();
}

module.exports = { buildRssFeed };