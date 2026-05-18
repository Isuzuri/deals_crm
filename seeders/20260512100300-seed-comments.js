import { faker } from "@faker-js/faker";

export default {
  async up(queryInterface) {
    const now = new Date();

    const [deals] = await queryInterface.sequelize.query('SELECT id FROM "Deals" ORDER BY id ASC;');
    const dealIds = deals.map((d) => d.id);
    if (dealIds.length === 0) {
      throw new Error("No deals found for deal_id. Run deals seeder first.");
    }

    const [users] = await queryInterface.sequelize.query('SELECT id FROM "Users" ORDER BY id ASC;');
    const userIds = users.map((u) => u.id);
    if (userIds.length === 0) {
      throw new Error("No users found for author_id. Run users seeder first.");
    }

    const comments = [];
    for (let i = 0; i < 500; i += 1) {
      comments.push({
        text: faker.lorem.sentences({ min: 1, max: 3 }),
        deal_id: faker.helpers.arrayElement(dealIds),
        author_id: faker.helpers.arrayElement(userIds),
        createdAt: now,
        updatedAt: now,
      });
    }

    await queryInterface.bulkInsert("Comments", comments, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
