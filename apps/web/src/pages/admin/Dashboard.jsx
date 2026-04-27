import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminProjects from './AdminProjects';
import AdminGallery from './AdminGallery';
import AdminTestimonials from './AdminTestimonials';
import AdminSettings from './AdminSettings';
import { authService } from '../../services/api';
import { motion } from 'framer-motion';
import { 
  FolderKanban, 
  Star, 
  CreditCard, 
  Globe, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';

const DashboardHome = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await authService.getStats();
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error('Stats error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-40">
      <div className="w-12 h-12 border-4 border-pavgold border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const statsCards = [
    { label: 'Total Projects', value: data?.stats?.totalProjects || 0, icon: FolderKanban, color: 'text-blue-500' },
    { label: 'Featured Works', value: data?.stats?.featuredProjects || 0, icon: Star, color: 'text-pavgold' },
    { label: 'Premium Items', value: data?.stats?.paidProjects || 0, icon: CreditCard, color: 'text-purple-500' },
    { label: 'Gallery Total', value: data?.stats?.totalGallery || 0, icon: Globe, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Executive Dashboard</h1>
          <p className="text-gray-500 font-medium">Global overview of your digital empire.</p>
        </div>
        <div className="bg-pavmid/50 border border-pavborder px-6 py-3 rounded-2xl flex items-center gap-4">
          <Activity size={20} className="text-pavgold" />
          <span className="text-white font-bold text-sm">System Healthy</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statsCards.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-pavcard p-8 rounded-[2.5rem] border border-pavborder shadow-premium relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon size={80} />
            </div>
            <div className={`p-4 rounded-2xl bg-pavbg border border-pavborder w-fit mb-6 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-4xl font-black text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-pavcard rounded-[3rem] border border-pavborder overflow-hidden shadow-premium">
          <div className="p-10 border-b border-pavborder flex justify-between items-center bg-pavbg/20">
            <h3 className="text-xl font-black text-white flex items-center gap-4">
              <TrendingUp size={24} className="text-pavgold" />
              Recent Deployments
            </h3>
            <button className="text-gray-500 hover:text-pavgold font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="divide-y divide-pavborder">
            {data.recentProjects.map((p) => (
              <div key={p.id} className="p-8 flex items-center gap-6 hover:bg-pavmid/20 transition-colors">
                <img src={p.imageUrl} alt="" className="w-16 h-16 rounded-2xl object-cover border border-pavborder shadow-xl" />
                <div className="flex-grow">
                  <h4 className="text-white font-bold mb-1">{p.title}</h4>
                  <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">{p.type} • {new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  {p.isFeatured && <Star size={16} className="text-pavgold fill-pavgold" />}
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${p.isFree ? 'border-green-500/20 text-green-500 bg-green-500/5' : 'border-blue-500/20 text-blue-500 bg-blue-500/5'}`}>
                    {p.isFree ? 'FREE' : 'PREMIUM'}
                  </span>
                </div>
              </div>
            ))}
            {data.recentProjects.length === 0 && (
              <div className="p-20 text-center text-gray-700 italic">No recent activity detected.</div>
            )}
          </div>
        </div>

        {/* System Monitor */}
        <div className="bg-pavcard rounded-[3rem] border border-pavborder p-10 shadow-premium flex flex-col">
          <h3 className="text-xl font-black text-white mb-10">System Monitor</h3>
          
          <div className="space-y-8 flex-grow">
            {[
              { label: 'API Latency', value: '24ms', status: 'optimal' },
              { label: 'DB Uptime', value: '99.99%', status: 'optimal' },
              { label: 'Cloud Sync', value: 'Verified', status: 'optimal' },
              { label: 'Security Scan', value: 'Clean', status: 'optimal' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-white font-bold">{item.value}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-10 border-t border-pavborder">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-pavmid/50 border border-pavborder">
              <Clock size={20} className="text-gray-500" />
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Last Update</p>
                <p className="text-white font-mono text-sm leading-none">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
