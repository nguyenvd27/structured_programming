CREATE TABLE IF NOT EXISTS brands (
id serial not null PRIMARY KEY,
name text NOT NULL CHECK( name <> ''),
description text,
updated_at TIMESTAMP,
created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
id serial not null PRIMARY KEY,
name text NOT NULL CHECK( name <> ''),
description text,
updated_at TIMESTAMP,
created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
id serial not null PRIMARY KEY,
name text NOT NULL CHECK( name <> ''),
price integer NOT NULL,
description text,
image VARCHAR(5000),
category int,
brand int,
sold_out boolean,
updated_at TIMESTAMP,
created_at TIMESTAMP
);

INSERT INTO brands ("name") VALUES ('adidas');

INSERT INTO products(name,price,description,image,category,brand,sold_out,updatedat, createdat) VALUES ('Áo Barcelona', 150000, 'chất liệu thoáng mát, mặc siêu thích','https://firebasestorage.googleapis.com/v0/b/image-1c367.appspot.com/o/ao-khoac-bomber-kaki-mau-bo-ak193-4918-p-s-t.jpg?alt=media&token=aaee7973-bdb7-41a2-97d6-6b7ac276f60d', 1, 1,'true','2019-11-16','2109-11-16');
