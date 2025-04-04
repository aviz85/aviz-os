import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { personalArea, general } from '../constants/texts';

const PersonalArea = () => {
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

      <motion.div className="coming-soon" variants={contentVariants}>
        <div className="construction-icon">🚧</div>
        <h2>{personalArea.comingSoon.title}</h2>
        <p>{personalArea.comingSoon.description}</p>
      </motion.div>

      <motion.div className="contact-section" variants={contentVariants}>
        <h3>{personalArea.contactSection.title}</h3>
        <div className="contact-form">
          <input 
            type="email" 
            placeholder={personalArea.contactSection.emailPlaceholder} 
            className="email-input"
          />
          <button className="button">{personalArea.contactSection.submitButton}</button>
        </div>
        <p className="form-note">{personalArea.contactSection.note}</p>
      </motion.div>

      <motion.div className="highlighted-section" variants={contentVariants}>
        <h4>{personalArea.highlightedSection.title}</h4>
        {personalArea.highlightedSection.paragraphs.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </motion.div>

      <div className="bottom-navigation">
        <Link to="/situations" className="button">
          {general.allSituations}
        </Link>
      </div>
    </motion.div>
  );
};

export default PersonalArea; 