import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const NotesList = ({ notes }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL');
  };

  return (
    <motion.div 
      className="notes-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <div 
        className="notes-header" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="header-title">
          <ChatBubbleLeftRightIcon width={24} height={24} />
          <h3>הערות ועדכונים</h3>
        </div>
        <button className="expand-button">
          {isExpanded ? 
            <ChevronUpIcon width={20} height={20} /> : 
            <ChevronDownIcon width={20} height={20} />
          }
        </button>
      </div>
      
      {isExpanded && (
        <motion.div 
          className="notes-list"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {notes.length === 0 ? (
            <p className="no-notes">אין הערות זמינות</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="note-item">
                <div className="note-header">
                  <h4 className="note-title">{note.title}</h4>
                  <span className="note-date">{formatDate(note.created_at)}</span>
                </div>
                <p className="note-content">{note.content}</p>
              </div>
            ))
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default NotesList; 