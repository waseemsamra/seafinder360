-- Create yachts table if not exists
CREATE TABLE IF NOT EXISTS yachts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  category TEXT,
  location TEXT,
  guests INTEGER DEFAULT 10,
  length INTEGER DEFAULT 60,
  cabins INTEGER DEFAULT 4,
  bathrooms INTEGER DEFAULT 4,
  price INTEGER DEFAULT 5000,
  price_unit TEXT DEFAULT '/ hour',
  description TEXT,
  img TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create profiles table for admin if not exists
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  email TEXT,
  role_id INTEGER DEFAULT 2,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Clear existing yachts for clean seed
TRUNCATE TABLE yachts RESTART IDENTITY CASCADE;

-- Seed 50 yachts
INSERT INTO yachts (name, type, category, location, guests, length, cabins, bathrooms, price, img) VALUES
-- Luxury Yacht Charters (10)
('Majestic 120', 'Motor Yacht', 'Luxury Yacht Charters', 'Dubai Harbour', 12, 120, 6, 6, 8500, 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop'),
('Ocean Pearl', 'Sailing Yacht', 'Luxury Yacht Charters', 'Dubai Marina', 8, 85, 4, 4, 4200, 'https://images.unsplash.com/photo-1543160915-158a41397584?q=80&w=800&auto=format&fit=crop'),
('Royal Falcon', 'Superyacht', 'Luxury Yacht Charters', 'Dubai Harbour', 50, 200, 10, 12, 21500, 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800&auto=format&fit=crop'),
('Golden Horizon', 'Superyacht', 'Luxury Yacht Charters', 'Marina Walk', 30, 180, 9, 10, 18000, 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=800&auto=format&fit=crop'),
('Bella V', 'Pershing', 'Luxury Yacht Charters', 'Dubai Marina', 12, 54, 4, 4, 1800, 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=800&auto=format&fit=crop'),
('Stardom', 'Custom', 'Luxury Yacht Charters', 'Dubai Harbour', 100, 141, 8, 10, 10750, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop'),
('Santorini', 'Logos', 'Luxury Yacht Charters', 'Marsa Al Arab', 65, 115, 7, 8, 17000, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'),
('Grace', 'Australian Yacht', 'Luxury Yacht Charters', 'Dubai Marina', 60, 196, 12, 14, 25000, 'https://images.unsplash.com/photo-1468413253725-0d5181091126?q=80&w=800&auto=format&fit=crop'),
('Azure Queen', 'Motor Yacht', 'Luxury Yacht Charters', 'Bluewaters Island', 16, 110, 6, 7, 9500, 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=800&auto=format&fit=crop'),
('Diamond Star', 'Superyacht', 'Luxury Yacht Charters', 'Palm Jumeirah', 40, 165, 8, 10, 19500, 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop'),

-- Party & Event Yachts (10)
('Sea Breeze', 'Catamaran', 'Party & Event Yachts', 'Marsa Al Arab', 10, 60, 4, 4, 6000, 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800&auto=format&fit=crop'),
('Spectre', 'Azimut', 'Party & Event Yachts', 'Dubai Harbour', 40, 100, 5, 6, 6500, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop'),
('Carmen', 'Custom', 'Party & Event Yachts', 'Dubai Harbour', 100, 140, 6, 8, 6000, 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop'),
('Infinity', 'Skywalker', 'Party & Event Yachts', 'Dubai Harbour', 45, 60, 3, 4, 4000, 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop'),
('Desert Rose', 'Motor Yacht', 'Party & Event Yachts', 'Dubai Marina', 15, 75, 4, 5, 5500, 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800&auto=format&fit=crop'),
('Morrigan', 'Galeon', 'Party & Event Yachts', 'Dubai Harbour', 12, 70, 4, 4, 2500, 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop'),
('Arabian Star', 'Sailing Yacht', 'Party & Event Yachts', 'Dubai Marina', 6, 60, 3, 3, 3200, 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop'),
('Benetti 56', 'Benetti', 'Party & Event Yachts', 'Dubai Harbour', 50, 200, 10, 12, 22000, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'),
('Neon Nights', 'Motor Yacht', 'Party & Event Yachts', 'Bluewaters', 35, 95, 5, 6, 5800, 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?q=80&w=800&auto=format&fit=crop'),
('Party Cruiser', 'Catamaran', 'Party & Event Yachts', 'JBR', 80, 85, 4, 6, 7200, 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop'),

-- Corporate Yacht Charters (10)
('Royal Executive', 'Superyacht', 'Corporate Yacht Charters', 'Dubai Harbour', 50, 200, 10, 12, 21500, 'https://images.unsplash.com/photo-1468413253725-0d5181091126?q=80&w=800&auto=format&fit=crop'),
('Stardom Elite', 'Custom', 'Corporate Yacht Charters', 'Dubai Harbour', 100, 141, 8, 10, 12000, 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?q=80&w=800&auto=format&fit=crop'),
('Horizon Business', 'Superyacht', 'Corporate Yacht Charters', 'Dubai Harbour', 30, 180, 9, 10, 18500, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'),
('Santorini Corporate', 'Logos', 'Corporate Yacht Charters', 'Marsa Al Arab', 65, 115, 7, 8, 17500, 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=800&auto=format&fit=crop'),
('Carmen Boardroom', 'Custom', 'Corporate Yacht Charters', 'Dubai Harbour', 100, 140, 6, 8, 6500, 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop'),
('Benetti Prestige', 'Benetti', 'Corporate Yacht Charters', 'Dubai Harbour', 50, 200, 10, 12, 23000, 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop'),
('Grace Conference', 'Australian Yacht', 'Corporate Yacht Charters', 'Dubai Marina', 60, 196, 12, 14, 26000, 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800&auto=format&fit=crop'),
('Spectre Meeting', 'Azimut', 'Corporate Yacht Charters', 'Dubai Harbour', 40, 100, 5, 6, 7000, 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop'),
('Fortune 120', 'Motor Yacht', 'Corporate Yacht Charters', 'Palm Jumeirah', 80, 120, 7, 9, 14500, 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?q=80&w=800&auto=format&fit=crop'),
('Summit Cruiser', 'Superyacht', 'Corporate Yacht Charters', 'Bluewaters', 55, 155, 8, 10, 16500, 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop'),

-- Family & Budget Friendly (10)
('Arabian Star', 'Sailing Yacht', 'Family & Budget Friendly', 'Dubai Marina', 6, 60, 3, 3, 3200, 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop'),
('Morrigan', 'Galeon', 'Family & Budget Friendly', 'Dubai Harbour', 12, 70, 4, 4, 2500, 'https://images.unsplash.com/photo-1543160915-158a41397584?q=80&w=800&auto=format&fit=crop'),
('Bella V', 'Pershing', 'Family & Budget Friendly', 'Dubai Marina', 12, 54, 4, 4, 1800, 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800&auto=format&fit=crop'),
('Reno', 'Sky Walker', 'Family & Budget Friendly', 'Dubai Harbour', 25, 62, 3, 3, 1350, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop'),
('Apex', 'Sky Walker', 'Family & Budget Friendly', 'Dubai Harbour', 25, 63, 3, 3, 1700, 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=800&auto=format&fit=crop'),
('Ocean Pearl', 'Sailing Yacht', 'Family & Budget Friendly', 'Dubai Marina', 8, 85, 4, 4, 4200, 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=800&auto=format&fit=crop'),
('Sea Breeze', 'Catamaran', 'Family & Budget Friendly', 'Marsa Al Arab', 10, 60, 4, 4, 6000, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop'),
('Desert Rose', 'Motor Yacht', 'Family & Budget Friendly', 'Dubai Marina', 15, 75, 4, 5, 5500, 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=800&auto=format&fit=crop'),
('Sunset Cruiser', 'Motor Yacht', 'Family & Budget Friendly', 'JBR', 20, 68, 3, 4, 2900, 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=800&auto=format&fit=crop'),
('Coastal Dream', 'Catamaran', 'Family & Budget Friendly', 'Bluewaters', 18, 65, 4, 4, 3600, 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop'),

-- Watersports & Adventure (10)
('Infinity', 'Skywalker', 'Watersports & Adventure', 'Dubai Harbour', 45, 60, 3, 4, 4000, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop'),
('Sea Breeze', 'Catamaran', 'Watersports & Adventure', 'Marsa Al Arab', 10, 60, 4, 4, 6000, 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop'),
('Spectre', 'Azimut', 'Watersports & Adventure', 'Dubai Harbour', 40, 100, 5, 6, 6500, 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop'),
('Morrigan', 'Galeon', 'Watersports & Adventure', 'Dubai Marina', 12, 70, 4, 4, 2500, 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800&auto=format&fit=crop'),
('Apex', 'Sky Walker', 'Watersports & Adventure', 'Dubai Harbour', 25, 63, 3, 3, 1700, 'https://images.unsplash.com/photo-1468413253725-0d5181091126?q=80&w=800&auto=format&fit=crop'),
('Reno', 'Sky Walker', 'Watersports & Adventure', 'Dubai Harbour', 25, 62, 3, 3, 1350, 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop'),
('Bella V', 'Pershing', 'Watersports & Adventure', 'Dubai Marina', 12, 54, 4, 4, 1800, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'),
('Desert Rose', 'Motor Yacht', 'Watersports & Adventure', 'Dubai Marina', 15, 75, 4, 5, 5500, 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?q=80&w=800&auto=format&fit=crop'),
('Wave Rider', 'Speedboat Yacht', 'Watersports & Adventure', 'JBR', 30, 72, 2, 3, 4800, 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop'),
('Adrenaline X', 'Catamaran', 'Watersports & Adventure', 'Bluewaters', 35, 78, 4, 5, 6200, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop');
