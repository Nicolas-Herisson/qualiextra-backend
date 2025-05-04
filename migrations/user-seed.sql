BEGIN;

DELETE FROM "users";
DELETE FROM "roles";

INSERT INTO "roles" (id, name, "createdAt", "updatedAt")
VALUES 
  ('0847a129-d220-458d-9416-197a50419503', 'admin', '2025-04-30 21:52:37', '2025-04-30 21:52:37'),
  ('d249c770-a893-4d30-8d11-fd6337c2f861', 'user', '2025-04-30 21:52:37', '2025-04-30 21:52:37');


INSERT INTO "users" (id, firstname, lastname, email, password, role_id, is_verified, "createdAt", "updatedAt")
VALUES 
  ('15a3b0eb-3747-4d26-8286-98956a7876d2', 'Alice', 'Doe', 'alice@example.com', '$argon2id$v=19$m=65536,t=3,p=4$7AUaKRNvCsa7oFb5K6vFTg$IF6qy99iXTWhHwNXSEEcwyq2O94JSu5HeZCD96MGxNs', '0847a129-d220-458d-9416-197a50419503', true, '2025-04-30 21:52:37', '2025-04-30 21:52:37'),
  ('cfd9361b-5db7-45dc-9c6a-9a3f4f2e4ca0', 'Bob', 'Smith', 'bob@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Is7+c+P+smUW+icbFjxMpQ$87OBsg8g2RadHjDoZNR7qcxFCLN0mK0kkYiQACarYTY', 'd249c770-a893-4d30-8d11-fd6337c2f861', false, '2025-04-30 21:52:37', '2025-04-30 21:52:37'),
  ('2ebb7d6a-bd24-4d67-a09c-e0b2b49df660', 'Charlie', 'Brown', 'charlie@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Is7+c+P+smUW+icbFjxMpQ$87OBsg8g2RadHjDoZNR7qcxFCLN0mK0kkYiQACarYTY', 'd249c770-a893-4d30-8d11-fd6337c2f861', true, '2025-04-30 21:52:37', '2025-04-30 21:52:37');
-- admin: Alice password: password123 : verified_user
-- user: Bob password: securepass   : unverified_user
-- user: Charlie password: securepass : verified_user

-- user role_id: d249c770-a893-4d30-8d11-fd6337c2f861
-- admin role_id: 0847a129-d220-458d-9416-197a50419503
COMMIT;