import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const TaskList = ({ tasks, projectName }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get task status classes
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'task-completed';
      case 'in-progress':
        return 'task-in-progress';
      case 'blocked':
        return 'task-blocked';
      default:
        return 'task-pending';
    }
  };

  // Get task priority classes
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'urgent':
        return 'priority-urgent';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  // Format date to localized string
  const formatDate = (dateString) => {
    if (!dateString) return 'לא נקבע';
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL');
  };
  
  // Get Hebrew status text
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'הושלם';
      case 'in-progress':
        return 'בביצוע';
      case 'blocked':
        return 'חסום';
      default:
        return 'ממתין';
    }
  };

  return (
    <motion.div 
      className="task-list-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div 
        className="task-list-header" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>משימות בפרויקט {projectName}</h3>
        <button className="expand-button">
          {isExpanded ? 
            <ChevronUpIcon width={20} height={20} /> : 
            <ChevronDownIcon width={20} height={20} />
          }
        </button>
      </div>
      
      {isExpanded && (
        <motion.div 
          className="tasks-wrapper"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {tasks.length === 0 ? (
            <p className="no-tasks">אין משימות בפרויקט זה</p>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id} 
                className={`task-item ${getStatusClass(task.status)}`}
              >
                <div className="task-header">
                  <div className="task-title-container">
                    {task.status === 'completed' && (
                      <CheckIcon width={20} height={20} className="task-check" />
                    )}
                    <h4>{task.title}</h4>
                  </div>
                  <div className="task-meta">
                    <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                      {task.priority === 'high' ? 'גבוהה' :
                       task.priority === 'urgent' ? 'דחופה' :
                       task.priority === 'low' ? 'נמוכה' : 'בינונית'}
                    </span>
                    <span className={`task-status ${getStatusClass(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                  </div>
                </div>
                
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                
                {task.due_date && (
                  <div className="task-due-date">
                    <span className="date-label">תאריך יעד:</span>
                    <span className="date-value">{formatDate(task.due_date)}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskList; 