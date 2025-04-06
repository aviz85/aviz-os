import { supabase } from './supabaseClient';

// Setup database tables if they don't exist
export const setupDatabaseTables = async () => {
  try {
    console.log('Setting up database tables directly...');
    
    // Try to create the uuid-ossp extension if it doesn't exist
    try {
      await supabase.rpc('create_uuid_extension');
    } catch (e) {
      console.log('Unable to create uuid extension via RPC, continuing...');
    }
    
    // Create clients table
    const clientsTableResult = await supabase.rpc('create_clients_table_if_not_exists');
    if (clientsTableResult.error) {
      console.log('RPC not available, falling back to alternative method...');
      console.log('Unable to create tables directly via SQL - this requires admin rights');
      console.log('Please make sure the required tables exist in your Supabase project');
    }
    
    // Check if the clients table exists
    const { data: clientsData, error: clientsError } = await supabase
      .from('clients')
      .select('count', { count: 'exact', head: true });
      
    if (clientsError) {
      console.error('Clients table does not exist or cannot be accessed:', clientsError);
      console.log('Please create the required tables in your Supabase project dashboard');
      return false;
    } else {
      console.log('Clients table exists and is accessible');
    }
    
    // Check if the client_project_summary view exists
    const { data: viewData, error: viewError } = await supabase
      .from('client_project_summary')
      .select('count', { count: 'exact', head: true });
      
    if (viewError) {
      console.warn('client_project_summary view does not exist:', viewError);
      console.log('Some functionality may not work without this view');
    } else {
      console.log('client_project_summary view exists and is accessible');
    }
    
    return true;
  } catch (e) {
    console.error('Error setting up database tables:', e);
    return false;
  }
}; 