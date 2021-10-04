-- DROP DATABASE [IF EXISTS] database_name;

-- CREATE DATABASE products;

CREATE TABLE Products (
 id SERIAL NOT NULL,
 name VARCHAR (300) NOT NULL,
 slogan VARCHAR (150) NOT NULL,
 description VARCHAR (500) NOT NULL,
 category VARCHAR (60) NOT NULL,
 default_price VARCHAR NOT NULL
);


ALTER TABLE Products ADD CONSTRAINT Products_pkey PRIMARY KEY (id);

CREATE TABLE Features (
 id SERIAL,
 product_id INTEGER,
 feature VARCHAR (60) NOT NULL,
 value VARCHAR (60) NOT NULL
);


ALTER TABLE Features ADD CONSTRAINT Features_pkey PRIMARY KEY (id);

CREATE TABLE cart (
 id SERIAL,
 user_session SERIAL NOT NULL,
 product_id INTEGER NOT NULL,
 active SMALLINT NOT NULL DEFAULT 0
);


ALTER TABLE cart ADD CONSTRAINT cart_pkey PRIMARY KEY (id);

CREATE TABLE Photos (
 id SERIAL,
 styleId INTEGER,
 url VARCHAR (500) NOT NULL,
 thumbnail_url VARCHAR NOT NULL
);


ALTER TABLE Photos ADD CONSTRAINT Photos_pkey PRIMARY KEY (id);

CREATE TABLE Related (
 id SERIAL,
 current_product INTEGER NOT NULL,
 related_product INTEGER NOT NULL
);


ALTER TABLE Related ADD CONSTRAINT Related_pkey PRIMARY KEY (id);

CREATE TABLE skus (
 id SERIAL,
 styleId INTEGER NOT NULL,
 size VARCHAR NOT NULL,
 quantity INTEGER NOT NULL
);


ALTER TABLE skus ADD CONSTRAINT skus_pkey PRIMARY KEY (id);

CREATE TABLE styles (
 id SERIAL,
 product_id INTEGER,
 name VARCHAR NOT NULL,
 sale_price VARCHAR,
 original_price VARCHAR,
 default_style SMALLINT NOT NULL
);


ALTER TABLE styles ADD CONSTRAINT styles_pkey PRIMARY KEY (id);

ALTER TABLE Features ADD CONSTRAINT Features_product_id_fkey FOREIGN KEY (product_id) REFERENCES Products(id);
ALTER TABLE cart ADD CONSTRAINT cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES Products(id);
ALTER TABLE Photos ADD CONSTRAINT Photos_styleId_fkey FOREIGN KEY (styleId) REFERENCES styles(id);
ALTER TABLE Related ADD CONSTRAINT Related_current_product_fkey FOREIGN KEY (current_product) REFERENCES Products(id);
-- ALTER TABLE Related ADD CONSTRAINT Related_related_product_fkey FOREIGN KEY (related_product) REFERENCES Products(id);
ALTER TABLE skus ADD CONSTRAINT skus_styleId_fkey FOREIGN KEY (styleId) REFERENCES styles(id);
ALTER TABLE styles ADD CONSTRAINT styles_product_id_fkey FOREIGN KEY (product_id) REFERENCES Products(id);


COPY Products from '/Users/caitlinkinney/Desktop/HackReactor/SDC/Raw_data/product.csv' DELIMITER ',' CSV HEADER;
COPY Styles from '/Users/caitlinkinney/Desktop/HackReactor/SDC/Raw_data/styles.csv' DELIMITER ',' CSV HEADER;
COPY Features from '/Users/caitlinkinney/Desktop/HackReactor/SDC/Raw_data/features.csv' DELIMITER ',' CSV HEADER;
COPY Photos from '/Users/caitlinkinney/Desktop/HackReactor/SDC/Raw_data/photos.csv' DELIMITER ',' CSV HEADER;
COPY Related from '/Users/caitlinkinney/Desktop/HackReactor/SDC/Raw_data/related.csv' DELIMITER ',' CSV HEADER;
COPY Cart from '/Users/caitlinkinney/Desktop/HackReactor/SDC/Raw_data/cart.csv' DELIMITER ',' CSV HEADER;
COPY Skus from '/Users/caitlinkinney/Desktop/HackReactor/SDC/Raw_data/skus.csv' DELIMITER ',' CSV HEADER;

-- show all indexes
-- Select *  from pg_indexes where tablename not like ‘pg%’;
-- CREATE INDEX indexName ON tableName (columnName);

 CREATE INDEX product_id_styles ON styles (product_id);
 CREATE INDEX product_id_features ON features (product_id);
 CREATE INDEX styleid_photos ON photos (styleid);
 CREATE INDEX current_product_related ON related (current_product);
 CREATE INDEX product_id_cart ON cart (product_id);
 CREATE INDEX styleid_skus ON skus (styleid);