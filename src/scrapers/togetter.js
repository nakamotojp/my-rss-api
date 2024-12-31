const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTogetter() {
  try {
    const response = await axios.get('https://togetter.com/ranking');
    const $ = cheerio.load(response.data);
    const articles = [];

    $('.simple_list.ranking_list li').each((_, element) => {
      const link = $(element).find('a');
      const relativeUrl = link.attr('href');
      const fullUrl = `https://togetter.com${relativeUrl}`;
      
      articles.push({
        title: link.text().trim(),
        url: fullUrl
      });
    });

    return articles;
  } catch (error) {
    console.error('Error scraping Togetter:', error);
    return [];
  }
}

module.exports = { scrapeTogetter };