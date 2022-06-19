'use strict';
var PuppeteerBot = require('../utils/bot');

/**
 * Get the complete list of Lenovo Notebooks.
 * Retrieves the current list of Lenovo Notebooks for sale in ascending order of price.
 *
 * returns List
 **/
exports.listGET = function() {
  return new Promise(async function(resolve, reject) {
    var bot = new PuppeteerBot();
    try{
      const list = await bot.getList('https://webscraper.io/test-sites/e-commerce/allinone/product/545')
      resolve(list);
    } catch (e) {
      reject(e);
    }
  });
}

