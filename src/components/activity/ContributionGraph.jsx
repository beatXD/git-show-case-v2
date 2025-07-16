import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiGitCommit, FiStar, FiGitBranch } from 'react-icons/fi';
import { formatRelativeTime, formatEventType, getRepoName } from '../../utils/formatters';

const ContributionGraph = ({ activity }) => {
  const [filteredActivity, setFilteredActivity] = useState([]);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    if (!activity) return;

    const filtered = selectedType === 'all' 
      ? activity 
      : activity.filter(event => event.type === selectedType);
    
    setFilteredActivity(filtered.slice(0, 20)); // Show last 20 events
  }, [activity, selectedType]);

  const eventTypes = [
    { value: 'all', label: 'All Events', icon: FiGithub },
    { value: 'PushEvent', label: 'Pushes', icon: FiGitCommit },
    { value: 'WatchEvent', label: 'Stars', icon: FiStar },
    { value: 'ForkEvent', label: 'Forks', icon: FiGitBranch }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'PushEvent': return FiGitCommit;
      case 'WatchEvent': return FiStar;
      case 'ForkEvent': return FiGitBranch;
      case 'CreateEvent': return FiGitBranch;
      default: return FiGithub;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'PushEvent': return 'text-blue-600 bg-blue-50';
      case 'WatchEvent': return 'text-yellow-600 bg-yellow-50';
      case 'ForkEvent': return 'text-green-600 bg-green-50';
      case 'CreateEvent': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getEventDescription = (event) => {
    const repoName = getRepoName(event.repo.name);
    const eventType = formatEventType(event.type);
    
    switch (event.type) {
      case 'PushEvent': {
        const commits = event.payload.commits?.length || 0;
        return `${eventType} ${commits} commit${commits !== 1 ? 's' : ''} to ${repoName}`;
      }
      case 'WatchEvent':
        return `${eventType} ${repoName}`;
      case 'ForkEvent':
        return `${eventType} ${repoName}`;
      case 'CreateEvent':
        return `${eventType} ${event.payload.ref_type} in ${repoName}`;
      case 'IssuesEvent':
        return `${event.payload.action} issue in ${repoName}`;
      case 'PullRequestEvent':
        return `${event.payload.action} pull request in ${repoName}`;
      default:
        return `${eventType} ${repoName}`;
    }
  };

  if (!activity || activity.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Activity Found</h3>
        <p className="text-gray-600">No recent GitHub activity to display</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GitHub Activity
          </h1>
          <p className="text-lg text-gray-600">
            Recent contributions and activity timeline
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 mb-8"
        >
          <div className="flex flex-wrap gap-1">
            {eventTypes.map(({ value, label, icon: IconComponent }) => (
              <button
                key={value}
                onClick={() => setSelectedType(value)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedType === value
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-4"
        >
          {filteredActivity.map((event, index) => {
            const Icon = getEventIcon(event.type);
            const colorClass = getEventColor(event.type);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {getEventDescription(event)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatRelativeTime(event.created_at)}
                      </p>
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                      <a
                        href={`https://github.com/${event.repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                      >
                        {event.repo.name}
                      </a>
                      
                      {event.type === 'PushEvent' && event.payload.commits && (
                        <div className="flex items-center space-x-1">
                          <FiGitCommit className="w-3 h-3" />
                          <span>{event.payload.commits.length} commits</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Commit messages for push events */}
                    {event.type === 'PushEvent' && event.payload.commits && (
                      <div className="mt-3 pl-4 border-l-2 border-gray-200">
                        {event.payload.commits.slice(0, 3).map((commit) => (
                          <div key={commit.sha} className="mb-1">
                            <p className="text-sm text-gray-700 truncate">
                              {commit.message}
                            </p>
                            <p className="text-xs text-gray-500">
                              {commit.sha.substring(0, 7)} by {commit.author.name}
                            </p>
                          </div>
                        ))}
                        {event.payload.commits.length > 3 && (
                          <p className="text-xs text-gray-500 mt-1">
                            +{event.payload.commits.length - 3} more commits
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {filteredActivity.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No {selectedType !== 'all' ? eventTypes.find(t => t.value === selectedType)?.label : 'Activity'} Found
              </h3>
              <p className="text-gray-600">
                Try selecting a different filter or check back later
              </p>
            </div>
          )}
        </motion.div>

        {/* Activity Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {eventTypes.slice(1).map(({ value, label, icon: IconComponent }) => {
            const count = activity.filter(event => event.type === value).length;
            return (
              <div key={value} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {count}
                </div>
                <div className="text-sm text-gray-600">
                  {label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ContributionGraph;