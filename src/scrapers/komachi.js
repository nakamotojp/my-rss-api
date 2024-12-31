const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeKomachi() {
  try {
    const response = await axios.get('https://komachi.yomiuri.co.jp/');
    const $ = cheerio.load(response.data);
    const articles = [];

    $('.p-topiList__itemLink').each((index, element) => {
      if (index >= 10) return false; // Only get first 10 articles
      
      const link = $(element);
      const relativeUrl = link.attr('href');
      const fullUrl = `https://komachi.yomiuri.co.jp${relativeUrl}`;
      
      articles.push({
        title: link.text().trim(),
        url: fullUrl
      });
    });

    return articles;
  } catch (error) {
    console.error('Error scraping Komachi:', error);
    return [];
  }
}

module.exports = { scrapeKomachi };