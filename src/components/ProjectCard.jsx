import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, PauseCircleIcon } from '@heroicons/react/24/outline';

const ProjectCard = ({ project }) => {
  // Get status icon based on project status
  const getStatusIcon = () => {
    switch (project.status) {
      case 'completed':
        return <CheckCircleIcon className="status-icon completed" />;
      case 'on-hold':
        return <PauseCircleIcon className="status-icon on-hold" />;
      default:
        return <ClockIcon className="status-icon active" />;
    }
  };

  // Calculate progress percentage based on completed tasks
  const calculateProgress = () => {
    if (!project.total_tasks) return 0;
    return Math.round((project.completed_tasks / project.total_tasks) * 100);
  };

  return (
    <motion.div 
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="project-header">
        <h3>{project.project_name}</h3>
        <div className="status-container">
          {getStatusIcon()}
          <span className={`status-text ${project.project_status}`}>
            {project.project_status === 'active' ? 'פעיל' : 
             project.project_status === 'completed' ? 'הושלם' : 
             project.project_status === 'on-hold' ? 'בהמתנה' : project.project_status}
          </span>
        </div>
      </div>
      
      <p className="project-description">{project.description || 'אין תיאור זמין'}</p>
      
      <div className="project-dates">
        <div className="date-item">
          <span className="date-label">תאריך התחלה:</span>
          <span className="date-value">{project.start_date ? new Date(project.start_date).toLocaleDateString('he-IL') : 'לא נקבע'}</span>
        </div>
        <div className="date-item">
          <span className="date-label">תאריך יעד:</span>
          <span className="date-value">{project.end_date ? new Date(project.end_date).toLocaleDateString('he-IL') : 'לא נקבע'}</span>
        </div>
      </div>
      
      <div className="progress-container">
        <div className="progress-header">
          <span className="progress-label">התקדמות</span>
          <span className="progress-percentage">{calculateProgress()}%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="task-count">
          <span>{project.completed_tasks || 0} מתוך {project.total_tasks || 0} משימות הושלמו</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 