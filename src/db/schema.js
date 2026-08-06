import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
]);

export const budget_users = table("budget_users", {
  user_id: t.serial("user_id").primaryKey(),
  name: t.varchar("name", { length: 100 }).notNull(),
  email: t.varchar("email", { length: 150 }).notNull().unique(),
  password: t.varchar("password", { length: 255 }),
  google_id: t.varchar("google_id", { length: 100 }),
  avatar: t.varchar("avatar", { length: 500 }),
  created_at: t.timestamp("created_at").defaultNow(),
});

export const categories = table("categories", {
  category_id: t.serial("category_id").primaryKey(),
  user_id: t
    .integer("user_id")
    .references(() => budget_users.user_id, { onDelete: "cascade" }),
  name: t.varchar("name", { length: 80 }).notNull(),
  icon: t.varchar("icon", { length: 50 }),
  is_default: t.boolean("is_default").default(false),
});

export const transactions = table("transactions", {
  transaction_id: t.serial("transaction_id").primaryKey(),
  user_id: t
    .integer("user_id")
    .references(() => budget_users.user_id, { onDelete: "cascade" })
    .notNull(),
  category_id: t
    .integer("category_id")
    .references(() => categories.category_id, { onDelete: "set null" }),
  type: transactionTypeEnum("type").notNull(),
  amount: t.numeric("amount", { precision: 10, scale: 2 }).notNull(),
  note: t.text("note"),
  date: t.timestamp("date").notNull(),
  created_at: t.timestamp("created_at").defaultNow(),
});

export const budgets = table("budgets", {
  budget_id: t.serial("budget_id").primaryKey(),
  user_id: t
    .integer("user_id")
    .references(() => budget_users.user_id, { onDelete: "cascade" })
    .notNull(),
  category_id: t
    .integer("category_id")
    .references(() => categories.category_id, { onDelete: "cascade" })
    .notNull(),
  month: t.varchar("month", { length: 7 }).notNull(),
  monthly_limit: t
    .numeric("monthly_limit", { precision: 10, scale: 2 })
    .notNull(),
});
