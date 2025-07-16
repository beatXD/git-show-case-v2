import { motion } from 'framer-motion';

const Loading = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        className={`${sizes[size]} border-4 border-gray-200 border-t-blue-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {text && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-sm text-gray-600"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Skeleton loader for cards
export const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
      <div className="h-6 w-6 bg-gray-200 rounded"></div>
    </div>
    
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-8"></div>
        </div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </div>
  </div>
);

// Skeleton loader for profile
export const SkeletonProfile = () => (
  <div className="animate-pulse">
    <div className="flex items-center space-x-6 mb-6">
      <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
      <div className="flex-1">
        <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="text-center">
          <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
        </div>
      ))}
    </div>
  </div>
);

// Skeleton loader for repository list
export const SkeletonRepositoryList = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(count)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

// Error state component
export const ErrorState = ({ error, onRetry }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-12"
  >
    <div className="text-6xl mb-4">😕</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      Something went wrong
    </h3>
    <p className="text-gray-600 mb-4">
      {error || 'Failed to load data. Please try again.'}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    )}
  </motion.div>
);

// Empty state component
export const EmptyState = ({ title, description, icon = '📭' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-12"
  >
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-gray-600">
      {description}
    </p>
  </motion.div>
);

export default Loading;