# Seeding

Проект использует Postgres + Sequelize + `sequelize-cli`. Сиды сделаны в формате `seeders/*` (bulkInsert через `queryInterface`).

### Миграции

```bash
npx sequelize-cli db:migrate
```

### Запуск сидов

```bash
npx sequelize-cli db:seed:all 
```

### Откат сидов

```bash
npx sequelize-cli db:seed:undo:all 
```

## Что создаётся (medium)
- Users: 10 (1 admin + 9 manager). Пароль у всех один: `Password123!` (в БД лежит bcrypt-хэш).
- Clients: 50 (уникальные email/phone).
- Deals: 200 (`title` строго A-Z, длина 8; `deadline` в пределах ближайших 30 дней).
- Comments: 500.

## Быстрые проверки в БД

```sql
SELECT COUNT(*) FROM "Users";
SELECT COUNT(*) FROM "Clients";
SELECT COUNT(*) FROM "Deals";
SELECT COUNT(*) FROM "Comments";

-- title всегда 8 и только A-Z
SELECT COUNT(*) FROM "Deals" WHERE char_length(title) <> 8 OR title !~ '^[A-Z]{8}$';
```

