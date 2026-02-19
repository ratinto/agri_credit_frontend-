import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iqkbtndvuijfxkvlzzim.supabase.co';
const supabaseAnonKey = 'sb_publishable_7zNKvb65lbxvezDnkHLOqQ_TSqF2XLt';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
