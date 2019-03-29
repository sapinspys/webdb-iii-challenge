
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'WEB15' },
        { name: 'WEB16' },
        { name: 'WEB17' },
      ]);
    });
};
