import { useState, useEffect } from 'react';
import { projectService } from '../../services/api';
import { Plus, Edit2, Trash2, Check, X, Star, Link as LinkIcon, DollarSign, Tag, Folder, Github, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../utils/format';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'web',
    price: 0,
    isFree: true,
    isFeatured: false,
    githubUrl: '',
    liveUrl: '',
    image: null
  });

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAll();
      if (response.data.success) setProjects(response.data.data);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.isFree && (!formData.price || parseFloat(formData.price) <= 0)) {
      alert('Please specify a price for premium projects');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        // Correcting boolean/number conversion for FormData
        if (key === 'isFree' || key === 'isFeatured') {
          data.append(key, formData[key] === true ? 'true' : 'false');
        } else {
          data.append(key, formData[key]);
        }
      }
    });

    try {
      if (editingId) {
        await projectService.update(editingId, data);
      } else {
        await projectService.create(data);
      }
      setShowModal(false);
      resetForm();
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving project');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      type: project.type,
      price: project.price || 0,
      isFree: project.isFree,
      isFeatured: project.isFeatured,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      image: null
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      type: 'web',
      price: 0,
      isFree: true,
      isFeatured: false,
      githubUrl: '',
      liveUrl: '',
      image: null
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Projects</h1>
          <p className="text-gray-500 font-medium">Full control over your digital products and showcase.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }}
          className="btn-primary !px-10"
        >
          <Plus size={20} />
          Create New Release
        </button>
      </div>

      <div className="bg-pavcard rounded-[2.5rem] border border-pavborder overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-pavborder bg-pavbg/30">
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Identity</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Categorization</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center">Status</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Commercial</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pavborder">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-pavmid/20 transition-all group">
                  <td className="p-8">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img src={p.imageUrl} alt="" className="w-16 h-16 rounded-2xl object-cover border border-pavborder shadow-xl group-hover:scale-105 transition-transform" />
                        {p.isFeatured && <div className="absolute -top-2 -right-2 bg-pavgold text-black p-1 rounded-full shadow-lg border border-pavdark"><Star size={12} fill="currentColor" /></div>}
                      </div>
                      <div>
                        <span className="text-white font-black text-lg block mb-1">{p.title}</span>
                        <div className="flex gap-4 text-gray-600">
                          {p.githubUrl && <Github size={14} />}
                          {p.liveUrl && <ExternalLink size={14} />}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-pavgold/40"></div>
                      <span className="text-xs font-black uppercase tracking-widest text-pavgold/80">{p.type}</span>
                    </div>
                  </td>
                  <td className="p-8 text-center">
                    {p.isFeatured ? (
                      <span className="text-[10px] font-black bg-pavgold/10 text-pavgold px-4 py-2 rounded-full border border-pavgold/20 uppercase tracking-widest">Featured</span>
                    ) : (
                      <span className="text-[10px] font-black bg-pavbg text-gray-700 px-4 py-2 rounded-full border border-pavborder uppercase tracking-widest">Standard</span>
                    )}
                  </td>
                  <td className="p-8">
                    <span className={`text-xs font-black tracking-widest uppercase ${p.isFree ? 'text-green-500' : 'text-blue-500'}`}>
                      {p.isFree ? 'FREE' : formatCurrency(p.price)}
                    </span>
                  </td>
                  <td className="p-8 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleEdit(p)} className="p-4 bg-pavmid border border-pavborder rounded-2xl text-gray-500 hover:text-pavgold hover:border-pavgold/40 transition-all shadow-lg">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={async () => { 
                          if(window.confirm('Erase this data?')) {
                            try {
                              await projectService.delete(p.id);
                              fetchProjects();
                            } catch (e) {
                              alert('Error deleting project');
                            }
                          }
                        }} 
                        className="p-4 bg-pavmid border border-pavborder rounded-2xl text-gray-500 hover:text-red-500 hover:border-red-500/40 transition-all shadow-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && projects.length === 0 && (
            <div className="p-32 text-center">
              <Folder size={64} className="mx-auto text-pavborder mb-6" />
              <p className="text-gray-600 font-bold uppercase tracking-widest">Archive is empty</p>
            </div>
          )}
        </div>
      </div>

      {/* Modern Modal Form */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-4xl bg-pavcard rounded-[3rem] border border-pavborder shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="p-10 border-b border-pavborder flex justify-between items-center bg-pavbg/30">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">{editingId ? 'Edit Manifest' : 'New Creation'}</h2>
                  <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">Project Specification v2.1</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-4 rounded-2xl bg-pavmid border border-pavborder text-gray-500 hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-12 space-y-10 max-h-[75vh] overflow-y-auto custom-scrollbar">
                {/* Visual Identity */}
                <div className="space-y-6">
                  <h3 className="text-pavgold text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                    <ImageIcon size={14} /> Visual Identity
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Project Name</label>
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="admin-input w-full" placeholder="Secure Dashboard" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Cover Image</label>
                      <div className="relative">
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <div className="admin-input w-full flex items-center gap-4 text-gray-600 border-dashed">
                          <Plus size={18} />
                          <span>{formData.image ? formData.image.name : 'Select file...'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Classification */}
                <div className="space-y-6">
                  <h3 className="text-pavgold text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                    <Tag size={14} /> Classification
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Platform Type</label>
                      <select name="type" value={formData.type} onChange={handleInputChange} className="admin-input w-full appearance-none">
                        <option value="web">Web Application</option>
                        <option value="mobile">Mobile Solution</option>
                        <option value="api">Backend/API</option>
                        <option value="template">Premium Template</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-pavbg border border-pavborder h-[62px] self-end">
                      <input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleInputChange} className="w-5 h-5 accent-pavgold cursor-pointer" />
                      <label className="text-xs font-black uppercase tracking-widest text-white cursor-pointer">Open Source (Free)</label>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-pavbg border border-pavborder h-[62px] self-end">
                      <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="w-5 h-5 accent-pavgold cursor-pointer" />
                      <label className="text-xs font-black uppercase tracking-widest text-white cursor-pointer">Featured Highlight</label>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <h3 className="text-pavgold text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                    <Folder size={14} /> Details & Narrative
                  </h3>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Project Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="5" className="admin-input w-full resize-none" placeholder="Elaborate on the technical and visual aspects..."></textarea>
                  </div>
                  
                    {!formData.isFree && (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Preço da Licença (AOA)</label>
                        <div className="relative">
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-pavgold font-black text-xs">Kz</div>
                          <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="admin-input w-full pl-14" placeholder="0" />
                        </div>
                      </motion.div>
                    )}
                </div>

                {/* Connectivity */}
                <div className="space-y-6">
                  <h3 className="text-pavgold text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                    <LinkIcon size={14} /> Global Connectivity
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">GitHub Repository</label>
                      <div className="relative">
                        <Github size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" />
                        <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange} className="admin-input w-full pl-12" placeholder="https://github.com/..." />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Live Endpoint</label>
                      <div className="relative">
                        <ExternalLink size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" />
                        <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleInputChange} className="admin-input w-full pl-12" placeholder="https://..." />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-pavborder flex gap-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-grow btn-outline">Cancel</button>
                  <button type="submit" className="flex-[2] btn-primary justify-center !py-6 text-sm">
                    <Check size={20} />
                    {editingId ? 'Push Updates' : 'Deploy Project'}
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

export default AdminProjects;
