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

 CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    resource_category TEXT NOT NULL
 );