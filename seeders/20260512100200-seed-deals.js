"use strict";

const { faker } = require("@faker-js/faker");

const STATUSES = ["new", "in_progress", "won", "lost"];

function randomUpperTitle8() {
  // строго A-Z, длина 8
  return faker.string.alpha({ length: 8 }).toUpperCase();
}

function randomDeadlineWithin30d() {
  const now = Date.now();
  const days = faker.number.int({ min: 0, max: 30 });
  const msInDay = 24 * 60 * 60 * 1000;
  const offsetMs = days * msInDay + faker.number.int({ min: 0, max: msInDay - 1 });
  return new Date(now + offsetMs);
}

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const [clients] = await queryInterface.sequelize.query('SELECT id FROM "Clients" ORDER BY id ASC;');
    const clientIds = clients.map((c) => c.id);
    if (clientIds.length === 0) {
      throw new Error("No clients found for client_id. Run clients seeder first.");
    }

    const deals = [];
    for (let i = 0; i < 200; i += 1) {
      deals.push({
        title: randomUpperTitle8(),
        amount: faker.finance.amount({ min: 100, max: 200000, dec: 2 }),
        status: faker.helpers.arrayElement(STATUSES),
        deadline: randomDeadlineWithin30d(),
        client_id: faker.helpers.arrayElement(clientIds),
        createdAt: now,
        updatedAt: now,
      });
    }

    await queryInterface.bulkInsert("Deals", deals, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Deals", null, {});
  },
};

