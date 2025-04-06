import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { personalArea, general } from '../constants/texts';
import { supabase, checkSupabaseConnection } from '../utils/supabaseClient';
import { setupDatabaseTables } from '../utils/databaseSetup';
import '../styles/PersonalArea.css';

// Import components
import ClientInfo from '../components/ClientInfo';
import ProjectCard from '../components/ProjectCard';
import TaskList from '../components/TaskList';
import NotesList from '../components/NotesList';
import LoadingIndicator from '../components/LoadingIndicator';

// Mock login for demo purposes - normally this would use proper auth
const DEMO_CLIENT_EMAIL = 'john.smith@example.com';

// Mock client data for demo purposes
const DEMO_CLIENT_DATA = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '052-1234567',
  company: 'ABC Company',
  address: 'Tel Aviv, Israel'
};

const PersonalArea = () => {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectData, setProjectData] = useState({});
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
  };

  // Fetch client data
  const fetchClientData = async (clientEmail) => {
    try {
      setLoading(true);
      setError(null);

      // Get client info
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('email', clientEmail)
        .limit(1);

      console.log('Client query results:', { clientData, clientError, email: clientEmail });

      if (clientError) throw clientError;
      
      // If no client found and this is the demo email, try to create the demo client
      if ((!clientData || clientData.length === 0) && clientEmail === DEMO_CLIENT_EMAIL) {
        console.log('Creating demo client...');
        const { data: newClient, error: insertError } = await supabase
          .from('clients')
          .insert(DEMO_CLIENT_DATA)
          .select()
          .single();
          
        if (insertError) {
          console.error('Error creating demo client:', insertError);
          throw new Error('שגיאה ביצירת חשבון דמו: ' + insertError.message);
        }
        
        if (newClient) {
          console.log('Demo client created:', newClient);
          setClient(newClient);
          
          // Initialize with empty arrays since new client won't have projects or notes
          setProjects([]);
          setNotes([]);
          setLoading(false);
          return;
        }
      }
      
      if (!clientData || clientData.length === 0) {
        throw new Error('לא נמצא לקוח עם כתובת האימייל הזו');
      }

      // Use the first client if multiple exist with the same email
      const client = clientData[0];
      setClient(client);

      // Get client projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('client_project_summary')
        .select('*')
        .eq('client_id', client.id);

      if (projectsError) throw projectsError;
      setProjects(projectsData || []);

      // Get client notes
      const { data: notesData, error: notesError } = await supabase
        .from('notes')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false });

      if (notesError) throw notesError;
      setNotes(notesData || []);

      // If we have projects, load tasks for the first one
      if (projectsData && projectsData.length > 0) {
        setActiveProject(projectsData[0].project_id);
        await fetchProjectTasks(projectsData[0].project_id);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching client data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Fetch tasks for a specific project
  const fetchProjectTasks = async (projectId) => {
    try {
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('due_date', { ascending: true });

      if (tasksError) {
        console.error('Error fetching tasks:', tasksError);
        setError(`שגיאה בטעינת משימות: ${tasksError.message}`);
        return;
      }

      setProjectData(prev => ({
        ...prev,
        [projectId]: {
          ...prev[projectId],
          tasks: tasksData || []
        }
      }));
    } catch (error) {
      console.error('Error fetching project tasks:', error);
      setError(`שגיאה בטעינת משימות: ${error.message}`);
    }
  };

  // Handle project selection
  const handleProjectSelect = async (projectId) => {
    setActiveProject(projectId);
    
    // If we haven't loaded this project's tasks yet, fetch them
    if (!projectData[projectId]?.tasks) {
      await fetchProjectTasks(projectId);
    }
  };

  // Handle email submission for demo login
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (loginEmail.trim()) {
      fetchClientData(loginEmail.trim());
      setEmailSubmitted(true);
    }
  };

  // Retry loading data if there was an error
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    if (loginEmail.trim()) {
      fetchClientData(loginEmail.trim());
    } else {
      fetchClientData(DEMO_CLIENT_EMAIL);
    }
  };

  // Auto-login with demo account on first load
  useEffect(() => {
    const init = async () => {
      // Check Supabase connection first
      const isConnected = await checkSupabaseConnection();
      console.log('Supabase connection status:', isConnected);
      
      if (!isConnected) {
        setError('שגיאת התחברות לשרת. אנא נסה שנית מאוחר יותר.');
        setLoading(false);
        return;
      }
      
      // Make sure database tables exist
      try {
        await setupDatabaseTables();
      } catch (err) {
        console.error('Error setting up database tables:', err);
      }
      
      fetchClientData(DEMO_CLIENT_EMAIL);
    };
    
    init();
  }, []);

  // Get active project data
  const getActiveProjectDetails = () => {
    return projects.find(p => p.project_id === activeProject);
  };

  // Get tasks for active project
  const getActiveProjectTasks = () => {
    return projectData[activeProject]?.tasks || [];
  };

  return (
    <motion.div
      className="personal-area"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="page-header">
        <Link to="/" className="back-link">
          <ArrowRightIcon width={20} height={20} />
          <span>{general.backToHome}</span>
        </Link>
        <motion.h1 variants={contentVariants}>{personalArea.title}</motion.h1>
      </div>

      {loading ? (
        <LoadingIndicator message="טוען את המידע שלך..." />
      ) : error ? (
        <motion.div className="error-container" variants={contentVariants}>
          <p className="error-message">{error}</p>
          <div className="button-group">
            <button onClick={handleRetry} className="button">
              נסה שנית
            </button>
            <button 
              onClick={() => {
                console.log('Debug info:', { 
                  client, 
                  supabaseUrl: supabase.supabaseUrl,
                  error,
                  DEMO_CLIENT_EMAIL
                });
                alert('Debug info sent to console');
              }} 
              className="button secondary"
            >
              Debug
            </button>
          </div>
          
          <div className="setup-instructions">
            <p className="instruction-title">הוראות להגדרת מסד הנתונים:</p>
            <ol>
              <li>פתח את ה-SQL Editor בפרויקט ה-Supabase שלך</li>
              <li>העתק את ה-SQL מקובץ src/utils/database-setup.sql</li>
              <li>הרץ את ה-SQL כדי ליצור את הטבלאות הנדרשות</li>
              <li>רענן את הדף הזה כדי לנסות שוב</li>
            </ol>
          </div>
          
          <div className="login-form">
            <p>אנא הזן את כתובת האימייל שלך:</p>
            <form onSubmit={handleEmailSubmit} className="email-login-form">
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="הכנס את האימייל שלך"
                className="email-input"
              />
              <button type="submit" className="button">
                כניסה
              </button>
            </form>
          </div>
        </motion.div>
      ) : client ? (
        <>
          <ClientInfo client={client} />

          {projects.length === 0 ? (
            <motion.div className="no-projects" variants={contentVariants}>
              <p>אין פרויקטים פעילים כרגע</p>
            </motion.div>
          ) : (
            <motion.div variants={contentVariants}>
              <div className="projects-section">
                <h2 className="section-title">הפרויקטים שלך</h2>
                <div className="projects-container">
                  {projects.map((project) => (
                    <div 
                      key={project.project_id}
                      className={`project-wrapper ${activeProject === project.project_id ? 'active' : ''}`}
                      onClick={() => handleProjectSelect(project.project_id)}
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>

              {activeProject && (
                <TaskList 
                  tasks={getActiveProjectTasks()} 
                  projectName={getActiveProjectDetails()?.project_name} 
                />
              )}

              <NotesList notes={notes} />
            </motion.div>
          )}
        </>
      ) : (
        <motion.div className="coming-soon" variants={contentVariants}>
          <div className="construction-icon">🚧</div>
          <h2>{personalArea.comingSoon.title}</h2>
          <p>{personalArea.comingSoon.description}</p>
          
          <div className="login-form">
            <p>לכניסה לדמו, אנא הזן את כתובת האימייל שלך:</p>
            <form onSubmit={handleEmailSubmit} className="email-login-form">
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="הכנס את האימייל שלך"
                className="email-input"
              />
              <button type="submit" className="button">
                כניסה
              </button>
            </form>
          </div>
        </motion.div>
      )}

      {!client && !error && (
        <>
          <motion.div className="contact-section" variants={contentVariants}>
            <h3>{personalArea.contactSection.title}</h3>
            <div className="contact-form">
              <input 
                type="email" 
                placeholder={personalArea.contactSection.emailPlaceholder} 
                className="email-input"
              />
              <button className="button">
                <EnvelopeIcon width={20} height={20} />
                <span>{personalArea.contactSection.submitButton}</span>
              </button>
            </div>
            <p className="form-note">{personalArea.contactSection.note}</p>
          </motion.div>

          <motion.div className="highlighted-section" variants={contentVariants}>
            <h4>{personalArea.highlightedSection.title}</h4>
            {personalArea.highlightedSection.paragraphs.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </motion.div>
        </>
      )}

      <div className="bottom-navigation">
        <Link to="/situations" className="button">
          {general.allSituations}
        </Link>
      </div>
    </motion.div>
  );
};

export default PersonalArea; 