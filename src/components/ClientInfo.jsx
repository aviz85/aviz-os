import { motion } from 'framer-motion';
import { UserCircleIcon, EnvelopeIcon, PhoneIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const ClientInfo = ({ client }) => {
  if (!client) return null;

  return (
    <motion.div 
      className="client-info"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="client-avatar">
        <UserCircleIcon width={80} height={80} />
      </div>
      
      <div className="client-details">
        <h2 className="client-name">{client.name}</h2>
        
        {client.company && (
          <div className="client-company">
            <BuildingOfficeIcon width={20} height={20} />
            <span>{client.company}</span>
          </div>
        )}
        
        <div className="client-contact">
          <div className="contact-item">
            <EnvelopeIcon width={20} height={20} />
            <span>{client.email}</span>
          </div>
          
          {client.phone && (
            <div className="contact-item">
              <PhoneIcon width={20} height={20} />
              <span>{client.phone}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ClientInfo; 