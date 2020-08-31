CREATE TABLE sources_info (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    phone_number CHAR(10) NOT NULL,
    state TEXT NOT NULL,
    zip_code INTEGER NOT NULL,
    county TEXT NOT NULL
);