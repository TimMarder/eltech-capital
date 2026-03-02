-- Create contact_submissions table for Eltech Capital website
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for the contact form)
CREATE POLICY "Allow public insert" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- Allow only service role to select (for admin purposes)
CREATE POLICY "Allow service role select" ON public.contact_submissions
  FOR SELECT USING (true);
