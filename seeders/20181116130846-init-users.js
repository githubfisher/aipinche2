'use strict';

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'John Doe',
        ...timestamps
      },
      {
        id: 2,
        name: 'Jackson',
        ...timestamps
      },
      {
        id: 3,
        name: 'Chandler bing',
        ...timestamps
      },
      {
        id: 4,
        name: 'fisher',
        ...timestamps
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    const { Op } = Sequelize;

    return queryInterface.bulkDelete('users', { id: { [Op.in]: [1, 2, 3, 4] } }, {});
  }
};
