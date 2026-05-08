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
-- (Must delete all rows where purchase id matches with user id)

-- GET USER INFO FOR CONTEXT
-- SELECT users_id, username, email, cart, shoplist, purchaselist FROM "users" WHERE "users_id"='1';

-- --------------------------CART------------------------------

-- ADDING ITEM INTO USER CART BASED ON USER & CHANGING ITEM QUANTITY FROM CART WHEN USER ADDS ITEM THAT ALREADY EXISTS
-- UPDATE "users" SET "cart" = "cart"::jsonb || '[{ "item_id":1, "item_name":"Black", "item_size":"XL", "item_quantity":1 }]' WHERE "users_id"='1';
-- UPDATE "users" SET "cart" = "cart"::jsonb || '[{ "item_id":1, "item_name":"Black", "item_size":"M", "item_quantity":2 }]' WHERE "users_id"='1';
-- UPDATE "users" SET "cart" = "cart"::jsonb || '[{ "item_id":2, "item_name":"Dark Blue", "item_size":"S", "item_quantity":3 }]' WHERE "users_id"='1';

-- UPDATE "users"
-- SET "cart" = (
--   CASE WHEN EXISTS (
--     SELECT 1 FROM jsonb_array_elements("cart") as item
--     WHERE (item->>'item_id')::int = 1 AND item->>'item_size' = 'XL' )
--     THEN (
--     SELECT jsonb_agg(
--       CASE WHEN (item->>'item_id')::int = 1 AND item->>'item_size' = 'XL'
--       THEN jsonb_set(item, '{item_quantity}', ((item->>'item_quantity')::int + 1)::text::jsonb)
--       ELSE item
--       END)
--     FROM jsonb_array_elements("cart") AS item
--   )
--   ELSE "cart"::jsonb || '[{ "item_id":1, "item_name":"Black", "item_size":"XL", "item_quantity":1 }]'
--   END
-- ) WHERE "users_id"='1';


-- DELETING ITEM FROM USER CART BASED ON USER
-- UPDATE "users"
-- SET "cart" = (
--   SELECT COALESCE(jsonb_agg(item), '[]'::jsonb)
--   FROM jsonb_array_elements("cart") as item
--   WHERE NOT (
--     (item->>'item_id')::int = 1
--     AND item->>'item_name' = 'Black'
--     AND item->>'item_size' = 'XL'
--   )
-- ) WHERE "users_id"='1';


-- GET CART
-- SELECT "cart" FROM "users" WHERE "users_id"='1';

-- --------------------------SHOPLIST------------------------------

-- ADDING ITEM INTO USER SHOPLIST BASED ON USER & CHANGING ITEM QUANTITY FROM CART WHEN USER ADDS ITEM THAT ALREADY EXISTS
-- UPDATE "users"
-- SET "shoplist" = (
--   CASE WHEN EXISTS (
--     SELECT 1 FROM jsonb_array_elements("shoplist") as item
--     WHERE (item->>'item_id')::int = 1 AND item->>'item_size' = 'XL' )
--     THEN (
--     SELECT jsonb_agg(
--       CASE WHEN (item->>'item_id')::int = 1 AND item->>'item_size' = 'XL'
--       THEN jsonb_set(item, '{item_quantity}', ((item->>'item_quantity')::int + 1)::text::jsonb)
--       ELSE item
--       END)
--     FROM jsonb_array_elements("shoplist") AS item
--   )
--   ELSE "shoplist"::jsonb || '[{ "item_id":1, "item_name":"Black", "item_size":"XL", "item_quantity":1 }]'
--   END
-- ) WHERE "users_id"='1';

-- DELETING ITEM FROM USER SHOPLIST BASED ON USER
-- UPDATE "users"
-- SET "shoplist" = (
--   SELECT COALESCE(jsonb_agg(item), '[]'::jsonb)
--   FROM jsonb_array_elements("shoplist") as item
--   WHERE NOT (
--     (item->>'item_id')::int = 1
--     AND item->>'item_name' = 'Black'
--     AND item->>'item_size' = 'XL'
--   )
-- ) WHERE "users_id"='1';


-- GET SHOPLIST
-- SELECT shoplist FROM "users" WHERE "users_id"='1';

-- --------------------------PURCHASES TABLE------------------------------

-- ADDING CART INTO PURCHASELIST BASED ON USER AND CREATE PURCHASELIST ID
-- const purchaseId = uuidv4();
-- INSERT INTO "purchases" ("purchase_id", "users_id", "total_amount", "user_address", "user_card", "purchase_date")
-- VALUES ('550e8400-e29b-41d4-a716-446655440000', 1, 150.67, '11122 Wise Street, Los Angeles, CA 99999', '{"credit_card_number":"4242 4242 4242 4242", "cvc":"123", "exp_date":"06/29"}', '2026-05-08');

-- DELETING PURCHASES FROM PURCHASES TABLE BASED ON SELECTED
-- DELETE FROM "purchases" WHERE "purchase_id"='550e8400-e29b-41d4-a716-446655440000'
-- AND NOT EXISTS (SELECT 1 FROM "purchase_items" WHERE "purchase_id"='550e8400-e29b-41d4-a716-446655440000');

-- GET PURCHASES TABLE
-- SELECT
--       p.purchase_id,
--       p.total_amount,
--       p.user_address,
--       p.purchase_date,
--       json_agg(pi.*) AS items
--     FROM purchases p
--     LEFT JOIN "purchase_items" pi ON p.purchase_id = pi.purchase_id
--     WHERE p.users_id = '1'
--     GROUP BY p.purchase_id
--     ORDER BY p.purchase_date DESC


-- --------------------------PURCHASE_ITEMS TABLE------------------------------
--ADDING INDIVIDUAL ORDERED ITEMS FROM PURCHASES TABLE
-- INSERT INTO "purchase_items" ("purchase_id", "product_id", "quantity", "price")
-- VALUES ('550e8400-e29b-41d4-a716-446655440000', 1, 2, 50.45);
--DELETING(CANCELLING) INDIVIDUAL ORDERED ITEM
-- DELETE FROM "purchase_items" WHERE "purchase_id"='550e8400-e29b-41d4-a716-446655440000' AND "item_id"=1;
