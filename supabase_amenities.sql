CREATE TABLE IF NOT EXISTS amenity_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS amenities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES amenity_categories(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(category_id, name)
);

INSERT INTO amenity_categories (name) VALUES
('Leisure & Comfort'),
('Onboard Tech'),
('Refreshments'),
('Comfort & Essentials'),
('Dining & Tableware'),
('Entertainment'),
('Alcoholic Drinks')
ON CONFLICT (name) DO NOTHING;

WITH cats AS (
  SELECT id, name FROM amenity_categories
)
INSERT INTO amenities (category_id, name)
SELECT c.id, item.name
FROM cats c
CROSS JOIN LATERAL (VALUES
  ('Leisure & Comfort', 'Fly Bridge'),
  ('Leisure & Comfort', 'Sun Deck'),
  ('Leisure & Comfort', 'Jacuzzi'),
  ('Onboard Tech', 'Music System'),
  ('Onboard Tech', 'Free Wifi'),
  ('Onboard Tech', 'Bluetooth Audio'),
  ('Refreshments', 'Soft Drinks'),
  ('Refreshments', 'Sparkling Water'),
  ('Refreshments', 'Juices'),
  ('Comfort & Essentials', 'Towels'),
  ('Comfort & Essentials', 'Kitchen'),
  ('Comfort & Essentials', 'Oven & Microwave'),
  ('Dining & Tableware', 'Disposable plates and cups'),
  ('Dining & Tableware', 'Fine Dining Setup'),
  ('Entertainment', 'Basic speakers'),
  ('Entertainment', 'TV'),
  ('Entertainment', 'Karaoke'),
  ('Alcoholic Drinks', 'Premium Bar Package'),
  ('Alcoholic Drinks', 'Wine Selection')
) AS item(cat_name, name)
WHERE c.name = item.cat_name
ON CONFLICT (category_id, name) DO NOTHING;
