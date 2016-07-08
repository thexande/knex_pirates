const path = require('path');

const seedFile = require('knex-seed-file');

exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('pirates').del(),
    seedFile(knex, path.resolve('./seeds/pirates_t.csv'), 'pirates', [
      'id',
      'pirate_name',
      'pirate_accessory',
      'pirate_beard',
      'pirate_drink',
      'pirate_weapon',
      'pirate_image_url'
    ], {
      // columnSeparator: '',
      ignoreFirstLine: true
    })
  );
};
