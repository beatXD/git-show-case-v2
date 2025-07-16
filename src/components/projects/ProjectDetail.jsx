import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  FiArrowLeft, 
  FiStar, 
  FiGitBranch, 
  FiEye, 
  FiExternalLink, 
  FiGithub,
  FiCalendar,
  FiUser,
  FiTag,
  FiDownload
} from 'react-icons/fi';
import { 
  getRepositoryDetails, 
  getRepositoryReadme, 
  getRepositoryLanguages,
  getRepositoryContributors 
} from '../../services/githubApi';
import { 
  formatRelativeTime, 
  formatDate, 
  getLanguageColor, 
  formatNumber,
  formatBytes,
  getDemoUrl
} from '../../utils/formatters';
import Loading, { ErrorState } from '../common/Loading';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const [repository, setRepository] = useState(null);
  const [readme, setReadme] = useState('');
  const [languages, setLanguages] = useState({});
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [repoData, readmeData, languagesData, contributorsData] = await Promise.all([
          getRepositoryDetails(undefined, projectName),
          getRepositoryReadme(undefined, projectName),
          getRepositoryLanguages(undefined, projectName),
          getRepositoryContributors(undefined, projectName)
        ]);

        setRepository(repoData);
        setReadme(readmeData || '# No README available');
        setLanguages(languagesData);
        setContributors(contributorsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (projectName) {
      fetchProjectDetails();
    }
  }, [projectName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading size="lg" text="Loading project details..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState error={error} />
        </div>
      </div>
    );
  }

  if (!repository) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState error="Repository not found" />
        </div>
      </div>
    );
  }

  const demoUrl = getDemoUrl(repository);
  const hasDemo = repository.homepage || demoUrl !== `https://${repository.owner.login}.github.io/${repository.name}`;

  // Calculate language percentages
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  const languageStats = Object.entries(languages)
    .map(([lang, bytes]) => ({
      name: lang,
      bytes,
      percentage: Math.round((bytes / totalBytes) * 100)
    }))
    .sort((a, b) => b.bytes - a.bytes);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1 mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {repository.name}
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                {repository.description || 'No description available'}
              </p>
              
              {/* Topics */}
              {repository.topics && repository.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {repository.topics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-700"
                    >
                      <FiTag className="w-3 h-3 mr-1" />
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <FiStar className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">{formatNumber(repository.stargazers_count)}</span>
                  <span>stars</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiGitBranch className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{formatNumber(repository.forks_count)}</span>
                  <span>forks</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiEye className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{formatNumber(repository.watchers_count)}</span>
                  <span>watchers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiDownload className="w-4 h-4 text-green-500" />
                  <span className="font-medium">{formatBytes(repository.size * 1024)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FiGithub className="w-5 h-5" />
                <span>View on GitHub</span>
              </a>
              
              {hasDemo && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiExternalLink className="w-5 h-5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">README</h2>
              </div>
              <div className="p-6">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={tomorrow}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {readme}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Repository Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Repository Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <FiUser className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Owner:</span>
                  <span className="font-medium">{repository.owner.login}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCalendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">{formatDate(repository.created_at)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCalendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Updated:</span>
                  <span className="font-medium">{formatRelativeTime(repository.updated_at)}</span>
                </div>
                {repository.license && (
                  <div className="flex items-center space-x-2">
                    <FiTag className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">License:</span>
                    <span className="font-medium">{repository.license.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Languages */}
            {languageStats.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
                <div className="space-y-3">
                  {languageStats.map((lang) => (
                    <div key={lang.name} className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(lang.name) }}
                      />
                      <span className="text-sm text-gray-700 flex-1">{lang.name}</span>
                      <span className="text-sm text-gray-500">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contributors */}
            {contributors.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contributors</h3>
                <div className="space-y-3">
                  {contributors.slice(0, 5).map((contributor) => (
                    <div key={contributor.id} className="flex items-center space-x-3">
                      <img
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {contributor.login}
                        </p>
                        <p className="text-xs text-gray-500">
                          {contributor.contributions} contributions
                        </p>
                      </div>
                    </div>
                  ))}
                  {contributors.length > 5 && (
                    <p className="text-sm text-gray-500 text-center">
                      +{contributors.length - 5} more contributors
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;