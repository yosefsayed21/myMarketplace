-- roles
INSERT INTO roles (name) VALUES ('ADMIN') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO roles (name) VALUES ('CUSTOMER') ON DUPLICATE KEY UPDATE name=name;



-- categories
INSERT INTO categories (name) VALUES ('Electronics') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (name) VALUES ('Books') ON DUPLICATE KEY UPDATE name=name;


