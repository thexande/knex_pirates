exports.up = function(knex, Promise) {
  return knex.schema.createTable('pirates', function(table){
    table.increments();
    table.string('pirate_name');
    table.string('pirate_accessory');
    table.string('pirate_beard');
    table.string('pirate_drink');
    table.string('pirate_weapon');
    table.string('pirate_image_url')
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('albums');
}
