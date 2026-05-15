import { faker } from "@faker-js/faker";

const STATUSES = ["lead", "active", "inactive"];

function uniqueFromSet(set, generator) {
  let v;
  do {
    v = generator();
  } while (set.has(v));
  set.add(v);
  return v;
}

export default {
  async up(queryInterface) {
    const now = new Date();

    const [users] = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" WHERE role IN (\'manager\', \'admin\') ORDER BY id ASC;',
    );
    const userIds = users.map((u) => u.id);
    if (userIds.length === 0) {
      throw new Error("No users found for manager_id. Run users seeder first.");
    }

    const usedEmails = new Set();
    const usedPhones = new Set();

    const clients = [];
    for (let i = 0; i < 50; i += 1) {
      const email = uniqueFromSet(usedEmails, () => faker.internet.email({ provider: "example.com" }).toLowerCase());
      const phone = uniqueFromSet(usedPhones, () =>
        faker.phone.number({ style: "international" }).replace(/\s+/g, "").slice(0, 20),
      );

      clients.push({
        name: faker.person.fullName().slice(0, 30),
        email,
        phone,
        company: faker.company.name(),
        status: faker.helpers.arrayElement(STATUSES),
        manager_id: faker.helpers.arrayElement(userIds),
        createdAt: now,
        updatedAt: now,
      });
    }

    await queryInterface.bulkInsert("Clients", clients, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Clients", null, {});
  },
};
