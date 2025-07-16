import { useMemo } from 'react';
import ContributionGraph from '../components/activity/ContributionGraph';
import { useGitHubActivity } from '../hooks/useGitHubData';
import Loading, { ErrorState } from '../components/common/Loading';

const Activity = () => {
  const username = import.meta.env.VITE_GITHUB_USERNAME;
  
  // Use default options to avoid re-render issues
  const defaultOptions = useMemo(() => ({}), []);
  
  const { activity, loading, error } = useGitHubActivity(username, defaultOptions);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="py-20">
          <Loading size="lg" text="Loading GitHub activity..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="py-20">
          <ErrorState error={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ContributionGraph activity={activity} />
    </div>
  );
};

export default Activity;