
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE natural_areas (
	"id" SERIAL PRIMARY KEY,
	"dnr_api" VARCHAR (400) UNIQUE NOT NULL
);

CREATE TABLE user_hunts (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES "user"(id),
	"natural_area_id" VARCHAR(400),
	FOREIGN KEY (natural_area_id) REFERENCES natural_areas(dnr_api)
);

CREATE TABLE natural_areas_hunts_flora (
	"id" SERIAL PRIMARY KEY,
	common_name VARCHAR(255),
	scientific_name VARCHAR(255),	
	"user_id" INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES "user"(id),
	"natural_area_id" VARCHAR(400),
	FOREIGN KEY (natural_area_id) REFERENCES natural_areas(dnr_api),
    image VARCHAR(255),
	found BOOLEAN,
	substantiated BOOLEAN
);