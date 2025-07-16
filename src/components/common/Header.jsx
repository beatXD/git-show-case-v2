import { Link, useLocation } from 'react-router-dom';
import { FiGithub, FiMail, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Header = ({ profile }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            {profile?.avatar_url && (
              <img 
                src={profile.avatar_url} 
                alt={profile.name || profile.login}
                className="w-10 h-10 rounded-full ring-2 ring-white shadow-md group-hover:ring-blue-200 transition-all duration-300"
              />
            )}
            <span className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {profile?.name || profile?.login || 'Portfolio'}
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive('/projects') 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Projects
            </Link>
            <Link 
              to="/activity" 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive('/activity') 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Activity
            </Link>
          </nav>

          {/* Social Links */}
          <div className="flex items-center space-x-2">
            {profile?.html_url && (
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all duration-200"
                title="GitHub Profile"
              >
                <FiGithub className="w-5 h-5" />
              </a>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all duration-200"
                title="Email"
              >
                <FiMail className="w-5 h-5" />
              </a>
            )}
            {profile?.blog && (
              <a
                href={profile.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all duration-200"
                title="Website"
              >
                <FiExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;