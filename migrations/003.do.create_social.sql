CREATE TABLE social (
    id SERIAL PRIMARY KEY,
    title_id INTEGER
        REFERENCES sources_info(id) ON DELETE CASCADE NOT NULL,
    url TEXT,
    facebook TEXT,
    twitter TEXT,
    instagram TEXT
);