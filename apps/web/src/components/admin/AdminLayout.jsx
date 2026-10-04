import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Image as ImageIcon, 
  MessageSquareQuote, 
  Settings, 
  LogOut,
  ChevronRight,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-pavbg flex font-montserrat">
      {/* Premium Sidebar */}
      <aside className="w-80 bg-pavdark border-r border-pavborder flex flex-col sticky top-0 h-screen shadow-2xl z-50">
        <div className="p-10 flex items-center gap-4 border-b border-pavborder bg-pavbg/30">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pavgold to-pavgold-hover p-[1px]">
            <div className="w-full h-full rounded-2xl bg-pavdark flex items-center justify-center">
              <img src="/assets/img/PavSoftwareLogo.png" alt="" className="w-8 h-8 object-contain" />
            </div>
          </div>
          <div>
            <h2 className="text-white font-black text-xs uppercase tracking-[0.2em]">Command</h2>
            <p className="text-pavgold text-[10px] font-bold uppercase tracking-widest opacity-60">Center v4.0</p>
          </div>
        </div>

        <div className="flex-grow py-10 px-6 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-pavgold text-black shadow-lg shadow-pavgold/20' : 'text-gray-500 hover:bg-pavmid hover:text-white'}`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={20} className={isActive ? 'text-black' : 'text-gray-600 group-hover:text-pavgold transition-colors'} />
                  <span className="font-bold text-sm uppercase tracking-widest">{item.name}</span>
                </div>
                {isActive && <motion.div layoutId="activeTab" className="w-1.5 h-1.5 rounded-full bg-black"></motion.div>}
              </Link>
            );
          })}
        </div>

        <div className="p-8 border-t border-pavborder bg-pavbg/30">
          <div className="flex items-center gap-4 mb-8 px-2">
            <div className="w-10 h-10 rounded-full bg-pavmid border border-pavborder flex items-center justify-center text-pavgold">
              <User size={20} />
            </div>
            <div className="flex-grow overflow-hidden">
              <p className="text-white font-bold text-sm truncate">{admin?.email || 'Administrator'}</p>
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Master Admin</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-500/5"
          >
            <LogOut size={18} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow h-screen overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.03)_0%,transparent_50%)]">
        <header className="h-28 border-b border-pavborder px-12 flex items-center justify-between sticky top-0 bg-pavbg/80 backdrop-blur-md z-40">
          <div>
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] mb-1">System Status</p>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <h1 className="text-white font-black text-xl tracking-tight">Active Operation</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 px-6 py-3 rounded-2xl bg-pavmid/50 border border-pavborder">
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Server Time</span>
              <span className="text-white font-mono text-sm">{new Date().toLocaleTimeString()}</span>
            </div>
            <Link to="/" className="text-gray-400 hover:text-pavgold font-black text-[10px] uppercase tracking-widest transition-colors">
              Public View ↗
            </Link>
          </div>
        </header>

        <div className="p-12 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
