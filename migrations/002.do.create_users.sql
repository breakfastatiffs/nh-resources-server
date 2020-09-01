CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    password TEXT NOT NULL,
    nickname TEXT,
    title_id INTEGER
        REFERENCES resource(id) ON DELETE CASCADE NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT now()
);


ALTER TABLE resource 
  ADD COLUMN
    user_id INTEGER REFERENCES users(id);