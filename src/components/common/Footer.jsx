import { FiGithub, FiMail, FiExternalLink, FiMapPin, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/formatters';

const Footer = ({ profile }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-gray-50 border-t border-gray-200 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {profile?.avatar_url && (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.name || profile.login}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {profile?.name || profile?.login}
                </h3>
                <p className="text-sm text-gray-600">
                  @{profile?.login}
                </p>
              </div>
            </div>
            
            {profile?.bio && (
              <p className="text-sm text-gray-600 leading-relaxed">
                {profile.bio}
              </p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {profile?.location && (
                <div className="flex items-center space-x-1">
                  <FiMapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile?.created_at && (
                <div className="flex items-center space-x-1">
                  <FiCalendar className="w-4 h-4" />
                  <span>Joined {formatDate(profile.created_at, 'MMM YYYY')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Contact</h4>
            <div className="space-y-3">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <FiMail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </a>
              )}
              {profile?.html_url && (
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <FiGithub className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
              )}
              {profile?.blog && (
                <a
                  href={profile.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <FiExternalLink className="w-4 h-4" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">GitHub Stats</h4>
            {profile && (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {profile.public_repos}
                  </div>
                  <div className="text-sm text-gray-600">Repositories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {profile.followers}
                  </div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {profile.following}
                  </div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {profile.public_gists}
                  </div>
                  <div className="text-sm text-gray-600">Gists</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} {profile?.name || profile?.login || 'Portfolio'}. 
            Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;