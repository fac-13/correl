BEGIN;

DROP TABLE IF EXISTS users, symptoms, factors, symptom_scale, factor_scale CASCADE;

CREATE TABLE users(
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL);

 CREATE TABLE symptoms(
  id BIGSERIAL PRIMARY KEY,
  symptom VARCHAR(255) NOT NULL);

 CREATE TABLE factors(
  id BIGSERIAL PRIMARY KEY,
  factor VARCHAR(255) NOT NULL);

 CREATE TABLE symptom_scale(
  id BIGSERIAL PRIMARY KEY,
  comment_1 varchar(400), 
  comment_2 varchar(400),
  comment_3 varchar(400),
  comment_4 varchar(400),
  comment_5 varchar(400),
  comment_6 varchar(400),
  comment_7 varchar(400),
  comment_8 varchar(400),
  comment_9 varchar(400),
  comment_10 varchar(400));


CREATE TABLE factor_scale(
  id BIGSERIAL PRIMARY KEY,
  comment_1 varchar(400), 
  comment_2 varchar(400),
  comment_3 varchar(400),
  comment_4 varchar(400),
  comment_5 varchar(400),
  comment_6 varchar(400),
  comment_7 varchar(400),
  comment_8 varchar(400),
  comment_9 varchar(400),
  comment_10 varchar(400));

CREATE TABLE symptom_data(
  id BIGSERIAL PRIMARY KEY,
  rating INTEGER, 
  date_entered DATE NOT NULL DEFAULT now()
);

CREATE TABLE factor_data(
  id BIGSERIAL PRIMARY KEY,
  rating INTEGER, 
  date_entered DATE NOT NULL DEFAULT now()
);

 ALTER TABLE symptoms ADD COLUMN user_id INTEGER REFERENCES USERS(id), 
 ADD COLUMN scale_id INTEGER REFERENCES symptom_scale(id);

 ALTER TABLE factors ADD COLUMN user_id INTEGER REFERENCES USERS(id),
 ADD COLUMN scale_id INTEGER REFERENCES factor_scale(id);

 ALTER TABLE symptom_scale ADD COLUMN user_id INTEGER REFERENCES USERS(id),
 ADD COLUMN symptom_id INTEGER REFERENCES symptoms(id);

 ALTER TABLE factor_scale ADD COLUMN user_id INTEGER REFERENCES USERS(id),
 ADD COLUMN factor_id INTEGER REFERENCES factors(id);

 ALTER TABLE symptom_data ADD COLUMN user_id INTEGER REFERENCES USERS(id), 
 ADD COLUMN symptom_id INTEGER REFERENCES symptoms(id);

 ALTER TABLE factor_data ADD COLUMN user_id INTEGER REFERENCES USERS(id), 
 ADD COLUMN factor_id INTEGER REFERENCES factors(id);


 COMMIT;