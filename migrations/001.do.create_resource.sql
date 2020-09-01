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

CREATE TABLE resource (
    id SERIAL PRIMARY KEY,
    resource_category TEXT NOT NULL,
    title TEXT NOT NULL,
    phone_number CHAR(10) NOT NULL,
    street_address TEXT,
    city TEXT,
    state TEXT NOT NULL,
    zip_code INTEGER,
    county TEXT NOT NULL,
    url TEXT,
    facebook TEXT,
    twitter TEXT,
    instagram TEXT,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);