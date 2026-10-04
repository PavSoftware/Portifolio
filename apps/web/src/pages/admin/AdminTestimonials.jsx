import { useState, useEffect } from 'react';
import { testimonialService } from '../../services/api';
import { Plus, Trash2, X, Star, Quote, Check, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', content: '', avatar: null });

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialService.getAll();
      if (response.data.success) setTestimonials(response.data.data);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });
    try {
      await testimonialService.create(data);
      setShowModal(false);
      setFormData({ name: '', role: '', content: '', avatar: null });
      fetchTestimonials();
    } catch (error) { alert('Error creating'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Erase this feedback?')) {
      try {
        await testimonialService.delete(id);
        fetchTestimonials();
      } catch (error) { alert('Error deleting'); }
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Testimonials</h1>
          <p className="text-gray-500 font-medium">Manage client social proof and testimonials.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary !px-10">
          <Plus size={20} />
          Add Feedback
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-40">
          <div className="w-12 h-12 border-4 border-pavgold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-pavcard p-10 rounded-[3rem] border border-pavborder relative group shadow-premium"
            >
              <button onClick={() => handleDelete(t.id)} className="absolute top-8 right-8 text-gray-700 hover:text-red-500 transition-colors p-2">
                <Trash2 size={20} />
              </button>
              <Quote className="absolute top-10 right-16 text-pavgold/5 w-24 h-24" />
              
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-pavgold text-pavgold" />)}
              </div>
              
              <p className="text-gray-300 italic text-lg leading-relaxed mb-10 relative z-10 font-medium">"{t.content}"</p>
              
              <div className="flex items-center gap-6 pt-8 border-t border-pavborder">
                <img src={t.avatarUrl || 'https://via.placeholder.com/150'} alt="" className="w-16 h-16 rounded-full border-2 border-pavgold/20 object-cover shadow-2xl" />
                <div>
                  <h4 className="text-white font-black text-xl tracking-tight">{t.name}</h4>
                  <p className="text-pavgold text-xs font-black uppercase tracking-widest opacity-60">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {testimonials.length === 0 && (
            <div className="col-span-full py-40 text-center bg-pavcard rounded-[3rem] border border-dashed border-pavborder">
              <User size={48} className="mx-auto text-pavborder mb-4" />
              <p className="text-gray-600 font-bold uppercase tracking-widest">No Testimonials Yet</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-2xl bg-pavcard rounded-[3rem] border border-pavborder shadow-2xl p-12"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-black text-white tracking-tight">New Feedback</h2>
                <button onClick={() => setShowModal(false)} className="p-4 rounded-2xl bg-pavmid border border-pavborder text-gray-500 hover:text-white transition-all"><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Client Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="admin-input w-full" placeholder="Pavlov Claymor" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Role / Position</label>
                    <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required className="admin-input w-full" placeholder="Founder at Hub" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Testimonial Content</label>
                  <textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required rows="4" className="admin-input w-full resize-none" placeholder="Share the experience..."></textarea>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Client Avatar</label>
                  <div className="relative">
                    <input type="file" onChange={(e) => setFormData({...formData, avatar: e.target.files[0]})} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    <div className="admin-input w-full flex items-center gap-4 text-gray-600 border-dashed">
                      <Plus size={18} />
                      <span>{formData.avatar ? formData.avatar.name : 'Upload portrait...'}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-8 flex gap-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-grow btn-outline">Cancel</button>
                  <button type="submit" className="flex-[2] btn-primary justify-center !py-6">
                    <Check size={20} />
                    Publish Feedback
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminTestimonials;
