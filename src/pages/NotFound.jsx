import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiHome className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;