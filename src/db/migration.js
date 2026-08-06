import sql from "./connection.js";

// db/migration.js — run once to set up tables
(async function createTables() {
  await sql`
  DO $$ BEGIN
    CREATE TYPE transaction_type AS ENUM ('income', 'expense');
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$
`;

  await sql`
    CREATE TABLE IF NOT EXISTS budget_users (
      user_id    SERIAL PRIMARY KEY,
      name       VARCHAR(100) NOT NULL,
      email      VARCHAR(150) NOT NULL UNIQUE,
      password   VARCHAR(255),
      google_id  VARCHAR(100),
      avatar     VARCHAR(500),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      category_id SERIAL PRIMARY KEY,
      user_id     INTEGER REFERENCES budget_users(user_id) ON DELETE CASCADE,
      name        VARCHAR(80) NOT NULL,
      icon        VARCHAR(50),
      is_default  BOOLEAN DEFAULT FALSE
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id SERIAL PRIMARY KEY,
      user_id        INTEGER REFERENCES budget_users(user_id) ON DELETE CASCADE NOT NULL,
      category_id    INTEGER REFERENCES categories(category_id) ON DELETE SET NULL,
      type           transaction_type NOT NULL,
      amount         NUMERIC(10, 2) NOT NULL,
      note           TEXT,
      date           TIMESTAMP NOT NULL,
      created_at     TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS budgets (
      budget_id     SERIAL PRIMARY KEY,
      user_id       INTEGER REFERENCES budget_users(user_id) ON DELETE CASCADE NOT NULL,
      category_id   INTEGER REFERENCES categories(category_id) ON DELETE CASCADE NOT NULL,
      month         VARCHAR(7) NOT NULL,
      monthly_limit NUMERIC(10, 2) NOT NULL
    )
  `;

  console.log("Migrations ran successfully");
})();
