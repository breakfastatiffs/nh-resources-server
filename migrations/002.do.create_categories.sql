CREATE TYPE resource_category as ENUM (
    'Mental Health',
    'Sexual / Domestic Violence',
    'Disability Services',
    'Substance Use',
    'Animal Services',
    'Residence Challenged',
    'LGBTQ+',
    'Immigration Services',
    'Veterans'
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    title_id INTEGER
        REFERENCES sources_info(id) ON DELETE CASCADE NOT NULL,
    resource_category TEXT NOT NULL,
);