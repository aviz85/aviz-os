import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// Create Supabase context
const SupabaseContext = createContext();

// Create a custom hook to use the Supabase context
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

// Provider component
export const SupabaseProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Cleanup on unmount
    return () => subscription.unsubscribe();
  }, []);

  // Expose the Supabase client and session
  const value = {
    supabase,
    session,
    loading,
  };

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
};

export default SupabaseContext; 