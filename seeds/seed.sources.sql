BEGIN;

TRUNCATE 
  resource,
  users
  RESTART IDENTITY CASCADE;

INSERT INTO resource (resource_category, title, phone_number, street_address, city, state, zip_code, county, url, facebook, twitter, instagram)
VALUES
('LGBTQ+', 'Equality Health Center', 6032252739,  '38 Main St', 'Concord','NH', '03301', 'Merrimack', 'https://www.equalityhc.org/', 'https://www.facebook.com/EqualityHealthCenter/', 'https://twitter.com/EqualityHC', 'https://www.instagram.com/equalityhealthcenter/'),
('Animal Services', 'NHSPCA', 6037722921, '104 Portsmouth Ave', 'Stratham', 'NH', '03885', 'Rockingham', 'https://nhspca.org/', 'https://www.facebook.com/NewHampshireSPCA', 'https://twitter.com/nhspca', 'https://www.instagram.com/nhspca/'),
('Sexual / Domestic Violence', 'NH Coalition Against Domestic and Sexual Violence Domestic Violence', 6032248893, '1 Eagle Sq', 'Concord', 'NH', '03301', 'Merrimack', 'https://www.nhcadsv.org/', 'https://www.facebook.com/nhcadsv/', 'https://twitter.com/nhcadsv', 'https://www.instagram.com/nhcadsv/');

INSERT INTO users (user_name, full_name, nickname, password, title_id)
VALUES
('breakfastatiffs', 'Tiffany Summerford', 'Tiff', '$2a$04$3MkWYzik5nd.KVqtMsf8KudvQx/FIFFdCWXLc9SXEDEFaBXYzx5Zm', 3),
('admin', 'Admin', NULL, '$2a$04$WVHZEjqi3ljlnEPxeXhmm.OZJOSezW0Gb74wM.ccbdBZtp9sBKqAy', 1);

COMMIT;