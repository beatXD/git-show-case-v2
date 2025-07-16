import { motion } from 'framer-motion';
import { FiGithub, FiMail, FiExternalLink, FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';
import { formatDate } from '../../utils/formatters';

const HeroSection = ({ profile }) => {
  if (!profile) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]" />
      
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <img
                  src={profile.avatar_url}
                  alt={profile.name || profile.login}
                  className="w-36 h-36 rounded-full mx-auto lg:mx-0 shadow-2xl border-4 border-white"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-lg" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {profile.name || profile.login}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-blue-600 mb-6 font-medium"
            >
              @{profile.login}
            </motion.p>

            {profile.bio && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl"
              >
                {profile.bio}
              </motion.p>
            )}

            {/* Profile Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start mb-10 text-gray-600"
            >
              {profile.location && (
                <div className="flex items-center space-x-2 bg-white/50 px-3 py-1 rounded-full">
                  <FiMapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">{profile.location}</span>
                </div>
              )}
              {profile.company && (
                <div className="flex items-center space-x-2 bg-white/50 px-3 py-1 rounded-full">
                  <FiUsers className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">{profile.company}</span>
                </div>
              )}
              <div className="flex items-center space-x-2 bg-white/50 px-3 py-1 rounded-full">
                <FiCalendar className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Joined {formatDate(profile.created_at, 'MMM YYYY')}</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FiGithub className="w-5 h-5" />
                <span>View GitHub</span>
              </a>
              
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FiMail className="w-5 h-5" />
                  <span>Contact Me</span>
                </a>
              )}
              
              {profile.blog && (
                <a
                  href={profile.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-full font-medium hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
                >
                  <FiExternalLink className="w-5 h-5" />
                  <span>Website</span>
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl font-bold text-blue-600 mb-3">
                {profile.public_repos}
              </div>
              <div className="text-gray-600 font-medium text-sm uppercase tracking-wide">Repositories</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl font-bold text-green-600 mb-3">
                {profile.followers}
              </div>
              <div className="text-gray-600 font-medium text-sm uppercase tracking-wide">Followers</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl font-bold text-purple-600 mb-3">
                {profile.following}
              </div>
              <div className="text-gray-600 font-medium text-sm uppercase tracking-wide">Following</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl font-bold text-orange-600 mb-3">
                {profile.public_gists}
              </div>
              <div className="text-gray-600 font-medium text-sm uppercase tracking-wide">Gists</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;