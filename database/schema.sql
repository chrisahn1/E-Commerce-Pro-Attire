set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

-- DROP TABLE IF EXISTS "users";

create table if not exists "users" (
  users_id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  hashpassword VARCHAR(255),

  cart JSONB,
  shoplist JSONB,
  purchaselist JSONB
);
