"use strict";

const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

const saltRounds = 10;

function uniqueFromSet(set, generator) {
  let v;
  do {
    v = generator();
  } while (set.has(v));
  set.add(v);
  return v;
}

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const passwordHash = await bcrypt.hash("Password123!", saltRounds);

    const usedEmails = new Set();
    const users = [];

    // 1 admin
    users.push({
      email: uniqueFromSet(usedEmails, () => faker.internet.email({ provider: "example.com" }).toLowerCase()),
      password: passwordHash,
      username: faker.internet.username().slice(0, 30),
      role: "admin",
      createdAt: now,
      updatedAt: now,
    });

    // 9 managers
    for (let i = 0; i < 9; i += 1) {
      users.push({
        email: uniqueFromSet(usedEmails, () => faker.internet.email({ provider: "example.com" }).toLowerCase()),
        password: passwordHash,
        username: faker.internet.username().slice(0, 30),
        role: "manager",
        createdAt: now,
        updatedAt: now,
      });
    }

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

