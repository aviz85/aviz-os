-- This file contains SQL statements to set up the necessary tables in Supabase
-- Execute these statements in the Supabase SQL Editor if the tables don't exist

-- Create the extension for UUID generation if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  company TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'ongoing',
  start_date DATE,
  end_date DATE,
  completion_percentage SMALLINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notes table
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  project_id UUID REFERENCES projects(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create client_project_summary view
CREATE OR REPLACE VIEW client_project_summary AS
SELECT 
  p.id as project_id,
  p.name as project_name,
  p.description,
  p.status,
  p.start_date,
  p.end_date,
  p.completion_percentage,
  c.id as client_id,
  c.name as client_name,
  c.email as client_email,
  (SELECT COUNT(*) FROM tasks t WHERE t.project_id = p.id) as task_count,
  (SELECT COUNT(*) FROM tasks t WHERE t.project_id = p.id AND t.status = 'completed') as completed_tasks
FROM projects p
JOIN clients c ON p.client_id = c.id;

-- Insert demo client if needed
INSERT INTO clients (name, email, phone, company, address)
VALUES ('John Smith', 'john.smith@example.com', '052-1234567', 'ABC Company', 'Tel Aviv, Israel')
ON CONFLICT (email) DO NOTHING;

-- Insert a sample project for demo purposes
DO $$
DECLARE
  demo_client_id UUID;
BEGIN
  SELECT id INTO demo_client_id FROM clients WHERE email = 'john.smith@example.com';
  
  IF demo_client_id IS NOT NULL THEN
    INSERT INTO projects (client_id, name, description, status, start_date, end_date, completion_percentage)
    VALUES (
      demo_client_id,
      'Website Redesign',
      'Redesign of company website with modern UI/UX',
      'ongoing',
      CURRENT_DATE - INTERVAL '30 days',
      CURRENT_DATE + INTERVAL '60 days',
      35
    )
    ON CONFLICT DO NOTHING;
  END IF;
END;
$$; 