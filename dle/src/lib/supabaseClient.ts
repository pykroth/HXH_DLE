import { PUBLIC_ANON_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(PUBLIC_ANON_URL, PUBLIC_SUPABASE_ANON_KEY);
