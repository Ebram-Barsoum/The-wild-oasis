import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://gekjfzdjjfqdhywjkvax.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdla2pmemRqamZxZGh5d2prdmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwODcwNDAsImV4cCI6MjAyODY2MzA0MH0.LvlNU7UA0eGEUUjPlmVVW8jOwcLLge3Kk7qh5LVZ9V0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
