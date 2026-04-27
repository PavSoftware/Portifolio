import { useState, useEffect } from 'react';
import { settingsService, authService } from '../../services/api';
import { Save, User, Globe, Mail, Phone, Lock, Github, Instagram, Youtube, Facebook, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    email: '',
    phone: '',
    github: '',
    instagram: '',
    youtube: '',
    facebook: ''
  });
  const [profile, setProfile] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, profileRes] = await Promise.all([
          settingsService.get(),
          authService.getProfile()
        ]);
        if (settingsRes.data.success) setSettings(settingsRes.data.data);
        if (profileRes.data.success) setProfile({ ...profileRes.data.data, password: '', confirmPassword: '' });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      await settingsService.update(settings);
      setMessage({ type: 'success', text: 'System settings updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update settings.' });
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (profile.password && profile.password !== profile.confirmPassword) {
      return setMessage({ type: 'error', text: 'Passwords do not match.' });
    }
    try {
      const updateData = { email: profile.email };
      if (profile.password) updateData.password = profile.password;
      
      await authService.updateProfile(updateData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setProfile({ ...profile, password: '', confirmPassword: '' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    }
  };

  if (loading) return <div className="p-20 text-center text-gray-500">Loading Configuration...</div>;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">System Settings</h1>
          <p className="text-gray-500 font-medium">Configure your global identity and administrative credentials.</p>
        </div>
        {message.text && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}
          >
            <CheckCircle2 size={18} />
            <span className="font-bold text-sm uppercase tracking-widest">{message.text}</span>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Links Form */}
        <section className="bg-pavcard rounded-[3.5rem] border border-pavborder p-12 shadow-premium">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-4 rounded-2xl bg-pavgold/10 text-pavgold">
              <Globe size={24} />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Public Identity</h2>
          </div>

          <form onSubmit={handleSettingsSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                  <Mail size={12} /> Contact Email
                </label>
                <input 
                  type="email" 
                  value={settings.email} 
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                  className="admin-input w-full" 
                  placeholder="contact@company.com" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                  <Phone size={12} /> Contact Phone
                </label>
                <input 
                  type="text" 
                  value={settings.phone} 
                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  className="admin-input w-full" 
                  placeholder="+244 ..." 
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pavgold/40 border-b border-pavborder pb-2">Social Matrix</h3>
              <div className="grid grid-cols-1 gap-6">
                {[
                  { id: 'github', icon: Github, label: 'GitHub URL' },
                  { id: 'instagram', icon: Instagram, label: 'Instagram URL' },
                  { id: 'youtube', icon: Youtube, label: 'YouTube URL' },
                  { id: 'facebook', icon: Facebook, label: 'Facebook URL' }
                ].map((social) => (
                  <div key={social.id} className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                      <social.icon size={12} /> {social.label}
                    </label>
                    <input 
                      type="text" 
                      value={settings[social.id] || ''} 
                      onChange={(e) => setSettings({...settings, [social.id]: e.target.value})}
                      className="admin-input w-full" 
                      placeholder="https://..." 
                    />
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full justify-center !py-6 shadow-xl shadow-pavgold/20">
              <Save size={20} />
              Save System State
            </button>
          </form>
        </section>

        {/* Profile Form */}
        <section className="bg-pavcard rounded-[3.5rem] border border-pavborder p-12 shadow-premium">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-500">
              <User size={24} />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Security & Profile</h2>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Administrative Email</label>
              <input 
                type="email" 
                value={profile.email} 
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="admin-input w-full" 
              />
            </div>

            <div className="p-8 rounded-[2rem] bg-pavmid/30 border border-pavborder space-y-8">
              <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40">
                <Lock size={14} /> Update Credentials
              </h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">New Password</label>
                  <input 
                    type="password" 
                    value={profile.password} 
                    onChange={(e) => setProfile({...profile, password: e.target.value})}
                    className="admin-input w-full" 
                    placeholder="Leave empty to keep current"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={profile.confirmPassword} 
                    onChange={(e) => setProfile({...profile, confirmPassword: e.target.value})}
                    className="admin-input w-full" 
                    placeholder="Repeat new password"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-outline w-full justify-center !py-6 border-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white">
              <Save size={20} />
              Update Administrator
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminSettings;
