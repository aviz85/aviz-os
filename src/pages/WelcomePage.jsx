import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserIcon } from '@heroicons/react/24/outline';
import { welcome } from '../constants/texts';

const WelcomePage = () => {
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { delay: 0.4, duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "loop"
    }
  };

  return (
    <motion.div
      className="welcome-page"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Link to="/personal-area" className="personal-area-button">
        <UserIcon width={24} height={24} color="white" />
      </Link>

      <motion.div 
        className="animation-container"
        animate={floatingAnimation}
      >
        {/* This would be replaced with a nicer animation/illustration */}
        <div className="animation-circle"></div>
      </motion.div>

      <motion.h1 className="main-title">{welcome.title}</motion.h1>
      <motion.h2 className="subtitle">{welcome.subtitle}</motion.h2>
      
      <motion.div className="welcome-text">
        {welcome.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </motion.div>

      <motion.div 
        className="center-button"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <Link to="/situations" className="button">{welcome.startButton}</Link>
      </motion.div>
    </motion.div>
  );
};

export default WelcomePage; 