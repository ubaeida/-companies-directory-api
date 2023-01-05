'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Provinces', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    })
    await queryInterface.addColumn('Cities', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    })
    await queryInterface.addColumn('Companies', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    })
    await queryInterface.addColumn('Users', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    })
    await queryInterface.addColumn('Admins', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    })
    await queryInterface.addColumn('Ads', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    })
    await queryInterface.addColumn('Categories', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    })

    await queryInterface.addColumn('Articles', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    })
    await queryInterface.addColumn('Reviews', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    [
      'Provinces',
      'Cities',
      'Companies',
      'Users',
      'Admins',
      'Ads',
      'Categories',
      'Articles',
      'Reviews'
    ].forEach(async (table) => {
      await queryInterface.removeColumn(table, 'deletedAt')
    })
    
  }
};
