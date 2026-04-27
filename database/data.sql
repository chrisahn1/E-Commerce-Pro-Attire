-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- --------------------------USER ACCOUNT------------------------------
-- ADDING A USER IN TABLE
-- INSERT INTO "users" ("username", "email", "hashpassword") VALUES ('hash', 'hash@gmail.com', 'hasher');

-- CHANGING USERNAME ('UPDATE users SET username=$1 WHERE id=$2')
-- UPDATE "users" SET "username"='hash' WHERE "users_id"='1';

-- CHANGING USER EMAIL
-- UPDATE "users" SET "email"='hash@gmail.com' WHERE "users_id"='1';

-- CHANGING USERPASSWORD
-- UPDATE "users" SET "hashpassword"='hasher' WHERE "users_id"='1';

-- DELETING USER
-- DELETE FROM "users" WHERE "users_id"='1';

-- GET USER INFO FOR CONTEXT
-- SELECT users_id, username, email, cart, shoplist, purchaselist FROM "users" WHERE "users_id"='1';

-- --------------------------CART------------------------------

-- ADDING ITEM INTO USER CART BASED ON USER
UPDATE "users" SET "cart" = "cart"::jsonb || '[{ "item_id":1, "item_name":"Black", "item_size":"XL", "item_quantity":1 }]' WHERE "users_id"='1';
UPDATE "users" SET "cart" = "cart"::jsonb || '[{ "item_id":1, "item_name":"Black", "item_size":"M", "item_quantity":2 }]' WHERE "users_id"='1';
UPDATE "users" SET "cart" = "cart"::jsonb || '[{ "item_id":2, "item_name":"Dark Blue", "item_size":"S", "item_quantity":3 }]' WHERE "users_id"='1';


-- DELETING ITEM FROM USER CART BASED ON USER


-- CHANGING ITEM QUANTITY FROM CART WHEN USER ADDS ITEM THAT ALREADY EXISTS


-- GET CART
-- SELECT cart FROM "users" WHERE "users_id"='1';

-- --------------------------SHOPLIST------------------------------

-- ADDING ITEM INTO USER SHOPLIST BASED ON USER


-- DELETING ITEM FROM USER SHOPLIST BASED ON USER


-- CHANGING ITEM QUANTITY FROM SHOPLIST WHEN USER ADDS ITEM THAT ALREADY EXISTS


-- GET SHOPLIST
-- SELECT shoplist FROM "users" WHERE "users_id"='1';

-- --------------------------PURCHASELIST------------------------------

-- ADDING CART INTO PURCHASELIST BASED ON USER AND CREATE PURCHASELIST ID


-- DELETING CART PURCHASE FROM PURCHASELIST BASED ON USER AND PURCHASELIST ID


-- GET PURCHASELIST
-- SELECT purchaselist FROM "users" WHERE "users_id"='1';
