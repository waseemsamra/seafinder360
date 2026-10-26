-- Vendor Dispatch Tables

CREATE TABLE IF NOT EXISTS vendor_dispatches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES ai_concierge_sessions(id) ON DELETE CASCADE,
  yacht_id TEXT,
  yacht_name TEXT,
  client_name TEXT,
  client_phone TEXT,
  client_email TEXT,
  guests INTEGER,
  duration TEXT,
  date_time TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  answers JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','expired')),
  expires_at TIMESTAMP WITH TIME ZONE,
  dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  approved_by TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  whatsapp_sent_to_client BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS vendor_dispatch_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dispatch_id UUID REFERENCES vendor_dispatches(id) ON DELETE CASCADE NOT NULL,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE NOT NULL,
  token TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','accepted','declined')),
  quote_price NUMERIC,
  quote_currency TEXT DEFAULT 'AED',
  quote_notes TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  whatsapp_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(dispatch_id, vendor_id)
);

-- Add columns to vendors if missing
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'yacht_rental';
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

CREATE INDEX IF NOT EXISTS idx_vendor_dispatch_items_token ON vendor_dispatch_items(token);
CREATE INDEX IF NOT EXISTS idx_vendor_dispatch_items_dispatch_id ON vendor_dispatch_items(dispatch_id);
CREATE INDEX IF NOT EXISTS idx_vendor_dispatches_session_id ON vendor_dispatches(session_id);
