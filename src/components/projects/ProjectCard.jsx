import { motion } from 'framer-motion';
import { FiStar, FiGitBranch, FiExternalLink, FiGithub, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatRelativeTime, getLanguageColor, getDemoUrl } from '../../utils/formatters';

const ProjectCard = ({ repository, isPinned = false }) => {
  const {
    name,
    description,
    html_url,
    homepage,
    language,
    stargazers_count,
    forks_count,
    updated_at,
    topics,
    owner
  } = repository;

  const demoUrl = getDemoUrl(repository);
  const hasDemo = homepage || (owner && demoUrl !== `https://${owner.login}.github.io/${name}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 group ${
        isPinned ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' : 'border-gray-100 hover:border-blue-200'
      }`}
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <Link
                to={`/project/${name}`}
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors group-hover:text-blue-600"
              >
                {name}
              </Link>
              {isPinned && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                  ⭐ Pinned
                </span>
              )}
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {description || 'No description available'}
            </p>
          </div>
        </div>

        {/* Topics */}
        {topics && topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
              >
                {topic}
              </span>
            ))}
            {topics.length > 3 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                +{topics.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Language and Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {language && (
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(language) }}
                />
                <span className="text-sm text-gray-700 font-medium">{language}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-1 text-yellow-600">
              <FiStar className="w-4 h-4" />
              <span className="text-sm font-medium">{stargazers_count}</span>
            </div>
            
            <div className="flex items-center space-x-1 text-blue-600">
              <FiGitBranch className="w-4 h-4" />
              <span className="text-sm font-medium">{forks_count}</span>
            </div>
          </div>
          
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
            {formatRelativeTime(updated_at)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <Link
            to={`/project/${name}`}
            className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 transition-all duration-200"
          >
            <FiEye className="w-4 h-4" />
            <span>View Details</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <a
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50 text-sm transition-all duration-200"
              title="View on GitHub"
            >
              <FiGithub className="w-4 h-4" />
            </a>
            
            {hasDemo && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-green-600 hover:text-green-700 p-2 rounded-full hover:bg-green-50 text-sm transition-all duration-200"
                title="Live Demo"
              >
                <FiExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;