import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  try {
    // Read and execute SQL
    const sql = fs.readFileSync('/Users/apple/Downloads/seafinder360/supabase_yachts_seed.sql', 'utf8');
    console.log('SQL loaded, length:', sql.length);
    
    // Split by semicolons and execute
    const statements = sql.split(';').filter(s => s.trim());
    console.log('Statements:', statements.length);
    
    for (let i = 0; i < statements.length; i++) {
      if (statements[i].trim()) {
        const { error } = await supabase.rpc('exec_sql', { sql: statements[i] + ';' });
        if (error) {
          console.error('Error on stmt', i, error.message);
        }
      }
    }
    console.log('Done');
  } catch (e) {
    console.error(e);
  }
}

seed();
