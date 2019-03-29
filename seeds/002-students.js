
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Jesus Christ', cohort_id: 1 },
        { name: 'Isaac Newton', cohort_id: 2 },
        { name: 'Marcus Aurelius', cohort_id: 3 },
      ]);
    });
};
