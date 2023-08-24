import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://hzamjyaqjorimzyixpxv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6YW1qeWFxam9yaW16eWl4cHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzNjYxMDMsImV4cCI6MjAwNzk0MjEwM30.0IW9lSnk9N2jS9q4_oRjMD1RSZcGh-qBxRjBETPJgdY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
