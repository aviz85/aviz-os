import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uhcdnhymjushmbksbupo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoY2RuaHltanVzaG1ia3NidXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDY3NTMsImV4cCI6MjA1OTQ4Mjc1M30.BU6RR-ZAa4rvb4ejxhROncsEfW000Vn7DBhqdVmyMMk'

console.log('Initializing Supabase client with URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true
  }
})

// Debug function to check if Supabase is accessible
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('clients').select('count', { count: 'exact', head: true });
    console.log('Supabase connection check:', { data, error });
    return !error;
  } catch (e) {
    console.error('Supabase connection check failed:', e);
    return false;
  }
}

// Function to check if required tables exist, and create them if they don't
export const setupDatabase = async () => {
  try {
    console.log('Checking database setup...');
    
    // Check if clients table exists
    const { error: clientsError } = await supabase
      .from('clients')
      .select('id')
      .limit(1);
      
    if (clientsError && clientsError.code === '42P01') { // Table doesn't exist
      console.log('Creating clients table...');
      const { error } = await supabase.rpc('setup_clients_table');
      if (error) console.error('Error creating clients table:', error);
    }
    
    // Check if projects table exists
    const { error: projectsError } = await supabase
      .from('projects')
      .select('id')
      .limit(1);
      
    if (projectsError && projectsError.code === '42P01') { // Table doesn't exist
      console.log('Creating projects table...');
      const { error } = await supabase.rpc('setup_projects_table');
      if (error) console.error('Error creating projects table:', error);
    }
    
    // Check if tasks table exists
    const { error: tasksError } = await supabase
      .from('tasks')
      .select('id')
      .limit(1);
      
    if (tasksError && tasksError.code === '42P01') { // Table doesn't exist
      console.log('Creating tasks table...');
      const { error } = await supabase.rpc('setup_tasks_table');
      if (error) console.error('Error creating tasks table:', error);
    }
    
    // Check if notes table exists
    const { error: notesError } = await supabase
      .from('notes')
      .select('id')
      .limit(1);
      
    if (notesError && notesError.code === '42P01') { // Table doesn't exist
      console.log('Creating notes table...');
      const { error } = await supabase.rpc('setup_notes_table');
      if (error) console.error('Error creating notes table:', error);
    }
    
    return true;
  } catch (e) {
    console.error('Error setting up database:', e);
    return false;
  }
} 