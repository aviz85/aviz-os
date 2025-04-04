import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { situations, general } from '../constants/texts';

const SituationsPage = () => {
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const listVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      className="situations-page"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Link to="/personal-area" className="personal-area-button">
        <UserIcon width={24} height={24} color="white" />
      </Link>

      <div className="page-header">
        <Link to="/" className="back-link">
          <ArrowRightIcon width={20} height={20} />
          <span>{general.backButton}</span>
        </Link>
        <h1>{situations.pageTitle}</h1>
        <p className="page-description">{situations.pageDescription}</p>
      </div>

      <motion.div 
        className="situations-list"
        variants={listVariants}
      >
        {situations.list.map(situation => (
          <motion.div 
            key={situation.id}
            className="situation-card"
            variants={itemVariants}
            whileHover="hover"
          >
            <Link to={`/situation/${situation.id}`} className="situation-link">
              <h3>{situation.title}</h3>
              <p>{situation.description}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SituationsPage; 