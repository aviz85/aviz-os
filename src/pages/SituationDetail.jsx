import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserIcon, ArrowRightIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { situations, situationDetail, general } from '../constants/texts';

const SituationDetail = () => {
  const { id } = useParams();
  const [showSolution, setShowSolution] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentSituation = situations.list.find(situation => situation.id === id);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }
  };

  const buttonVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { delay: 0.5, duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  const solutionVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto', transition: { duration: 0.5 } }
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(currentSituation.messageTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentSituation) {
    return <div>{general.nonExistingSituation}</div>;
  }

  return (
    <motion.div
      className="situation-detail"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Link to="/personal-area" className="personal-area-button">
        <UserIcon width={24} height={24} color="white" />
      </Link>

      <div className="page-header">
        <Link to="/situations" className="back-link">
          <ArrowRightIcon width={20} height={20} />
          <span>{general.backToSituations}</span>
        </Link>
        <motion.h1 variants={contentVariants}>{currentSituation.title}</motion.h1>
        <motion.p className="situation-description" variants={contentVariants}>
          {currentSituation.description}
        </motion.p>
      </div>

      <motion.div className="situation-explanation" variants={contentVariants}>
        <h2>{situationDetail.whatIsHappening}</h2>
        <p>{currentSituation.explanation}</p>
      </motion.div>

      <motion.div className="client-feeling" variants={contentVariants}>
        <h2>{situationDetail.howItFeelsToYou}</h2>
        <p>{currentSituation.clientFeeling}</p>
      </motion.div>

      {!showSolution ? (
        <motion.div 
          className="solution-button-container" 
          variants={buttonVariants}
        >
          <button 
            className="button solution-button" 
            onClick={() => setShowSolution(true)}
          >
            {situationDetail.whatCanBeDone}
          </button>
        </motion.div>
      ) : (
        <motion.div 
          className="solution-section"
          initial="initial"
          animate="animate" 
          variants={solutionVariants}
        >
          <h2>{situationDetail.recommendedSolution}</h2>
          <p>{currentSituation.solution}</p>
          
          <div className="message-template">
            <h3>{situationDetail.messageTemplateTitle}</h3>
            <div className="template-container">
              <p>{currentSituation.messageTemplate}</p>
              <button 
                className="copy-button" 
                onClick={handleCopyTemplate}
                title={situationDetail.copyButtonTitle}
              >
                <ClipboardIcon width={20} height={20} />
                <span>{copied ? situationDetail.copiedButtonLabel : situationDetail.copyButtonLabel}</span>
              </button>
            </div>
          </div>
          
          <div className="highlight-connection">
            <p>{situationDetail.reminder}</p>
          </div>
        </motion.div>
      )}

      <div className="bottom-navigation">
        <Link to="/situations" className="button secondary-button">
          {general.allSituations}
        </Link>
      </div>
      
    </motion.div>
  );
};

export default SituationDetail; 