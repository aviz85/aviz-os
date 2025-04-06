import { motion } from 'framer-motion';

const LoadingIndicator = ({ message = 'טוען...' }) => {
  const circleVariants = {
    initial: { opacity: 0, y: 0 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <div className="loading-container">
      <div className="loading-indicator">
        <motion.div
          className="loading-circle"
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          variants={circleVariants}
        />
        <motion.div
          className="loading-circle"
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.5,
            delay: 0.2,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          variants={circleVariants}
        />
        <motion.div
          className="loading-circle"
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.5,
            delay: 0.4,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          variants={circleVariants}
        />
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingIndicator; 