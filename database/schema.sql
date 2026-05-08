set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
-- drop schema "public" cascade;

-- create schema "public";

-- DROP TABLE IF EXISTS "users";

create table if not exists "users" (
  users_id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  hashpassword VARCHAR(255),

  cart JSONB DEFAULT '[]'::jsonb,
  shoplist JSONB DEFAULT '[]'::jsonb,
  purchaselist JSONB DEFAULT '[]'::jsonb
);

create table if not exists "purchases" (
  purchase_id UUID NOT NULL PRIMARY KEY,
  users_id INT REFERENCES users(users_id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2),
  user_address VARCHAR(255),
  user_card JSONB,
  purchase_date VARCHAR(255)
);

create table if not exists "purchase_items" (
  item_id SERIAL NOT NULL PRIMARY KEY,
  purchase_id UUID REFERENCES purchases(purchase_id) ON DELETE CASCADE,
  product_id INT,
  quantity INT,
  price DECIMAL(10, 2)
);
