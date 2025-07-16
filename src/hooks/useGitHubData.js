import { useState, useEffect } from 'react';
import { 
  getUserProfile, 
  getUserRepositories, 
  getPinnedRepositories,
  getUserStats,
  getUserEvents
} from '../services/githubApi';

export const useGitHubProfile = (username) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserProfile(username);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  return { profile, loading, error };
};

export const useGitHubRepositories = (username, options = {}) => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserRepositories(username, options);
        setRepositories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRepositories();
    }
  }, [username]);

  const refetch = async () => {
    if (username) {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserRepositories(username, options);
        setRepositories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return { repositories, loading, error, refetch };
};

export const useGitHubPinnedRepos = (username) => {
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPinnedRepositories(username);
        setPinnedRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPinnedRepos();
    }
  }, [username]);

  return { pinnedRepos, loading, error };
};

export const useGitHubStats = (username) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserStats(username);
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchStats();
    }
  }, [username]);

  return { stats, loading, error };
};

export const useGitHubActivity = (username, options = {}) => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserEvents(username, options);
        setActivity(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchActivity();
    }
  }, [username]);

  return { activity, loading, error };
};

// Combined hook for dashboard data
export const useGitHubDashboard = (username) => {
  const [data, setData] = useState({
    profile: null,
    repositories: [],
    pinnedRepos: [],
    stats: null,
    activity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [profile, repositories, pinnedRepos, stats, activity] = await Promise.all([
          getUserProfile(username),
          getUserRepositories(username, { per_page: 50 }),
          getPinnedRepositories(username),
          getUserStats(username),
          getUserEvents(username, { per_page: 20 })
        ]);

        setData({
          profile,
          repositories,
          pinnedRepos,
          stats,
          activity
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchDashboardData();
    }
  }, [username]);

  return { data, loading, error };
};