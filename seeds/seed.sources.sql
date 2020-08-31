BEGIN;

TRUNCATE 
  social,
  categories,
  sources_info

  RESTART IDENTITY CASCADE;

INSERT INTO sources_info (title, phone_number, street_address, city, state, zip_code, county)
VALUES
('Equality Health Center', 6032252739,  '38 Main St', 'Concord','NH', '03301', 'Merrimack'),
('NHSPCA', 6037722921, '104 Portsmouth Ave', 'Stratham', 'NH', '03885', 'Rockingham'),
('NH Coalition Against Domestic and Sexual Violence Domestic Violence', 6032248893, '1 Eagle Sq', 'Concord', 'NH', '03301',
 'Merrimack');

INSERT INTO categories (title_id, resource_category)
VALUES
(1, 'LGBTQ+'),
(2, 'Animal Services'),
(3, 'Sexual / Domestic Violence');


INSERT INTO social ( title_id, url, facebook, twitter, instagram)
VALUES
(1, 'https://www.equalityhc.org/', 'https://www.facebook.com/EqualityHealthCenter/', 'https://twitter.com/EqualityHC', 'https://www.instagram.com/equalityhealthcenter/'),
(2, 'https://nhspca.org/', 'https://www.facebook.com/NewHampshireSPCA', 'https://twitter.com/nhspca', 'https://www.instagram.com/nhspca/'),
(3, 'https://www.nhcadsv.org/'), 'https://www.facebook.com/nhcadsv/', 'https://twitter.com/nhcadsv', 'https://www.instagram.com/nhcadsv/';

COMMIT;