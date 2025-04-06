import { useEffect, useState } from 'react';
import { setupDatabaseTables } from '../utils/databaseSetup';
import LoadingIndicator from './LoadingIndicator';

const DatabaseInitializer = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initDb = async () => {
      try {
        // Only attempt setup in production environment
        if (import.meta.env.PROD) {
          console.log('Production environment detected, initializing database...');
          const success = await setupDatabaseTables();
          
          if (!success) {
            console.warn('Database initialization was not fully successful');
            // Continue anyway as some tables might already exist
          }
        } else {
          console.log('Development environment detected, skipping auto-initialization');
        }
        
        setInitialized(true);
      } catch (err) {
        console.error('Error initializing database:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initDb();
  }, []);

  if (loading) {
    return <LoadingIndicator message="מאתחל מסד נתונים..." />;
  }

  if (error) {
    console.warn('Database initialization error, continuing anyway:', error);
  }

  // Always render children, even if there was an initialization error
  // The individual components will handle missing tables appropriately
  return children;
};

export default DatabaseInitializer; 