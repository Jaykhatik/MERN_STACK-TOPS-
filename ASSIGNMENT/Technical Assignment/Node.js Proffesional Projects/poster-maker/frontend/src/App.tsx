import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Sidebar } from './components/Sidebar';
import { useToasts } from './hooks/useToasts';
import { api } from './services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, CheckCircle, AlertCircle, UploadCloud, Trash2 } from 'lucide-react';
import './App.css';

interface Template {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  description: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('templates');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [userText, setUserText] = useState('Your Text Here');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedDesigns, setSavedDesigns] = useState<any[]>([]);
  const { toasts, addToast } = useToasts();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colors = ['#ffffff', '#f8fafc', '#e2e8f0', '#fee2e2', '#fef3c7', '#dcfce7', '#e0e7ff', '#fae8ff', '#0f172a'];

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (activeTab === 'designs') {
      fetchSavedDesigns();
    }
  }, [activeTab]);

  const fetchSavedDesigns = async () => {
    try {
      const res = await api.getDesigns();
      setSavedDesigns(res.data);
    } catch (error) {
      addToast('Failed to load designs', 'error');
    }
  };

  const fetchTemplates = async () => {
    try {
      const res = await api.getTemplates();
      setTemplates(res.data);
    } catch (error) {
      addToast('Failed to load templates', 'error');
    }
  };

  const handleSave = async () => {
    if (!selectedTemplate) {
      addToast('Please select a template first', 'error');
      return;
    }
    setIsSaving(true);
    try {
      await api.createDesign({
        templateId: selectedTemplate.id,
        text: userText,
        backgroundColor
      });
      addToast('Design Saved Successfully', 'success');
      if (activeTab === 'designs') fetchSavedDesigns();
    } catch (error) {
      addToast('Failed to save design', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDesign = async (id: string) => {
    try {
      await api.deleteDesign(id);
      addToast('Design Deleted', 'info');
      fetchSavedDesigns();
    } catch (error) {
      addToast('Failed to delete design', 'error');
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    try {
      const res = await api.uploadImage(e.target.files[0]);
      setUploadedLogo(`http://localhost:5000${res.url}`);
      addToast('Uploaded Successfully', 'success');
    } catch (error) {
      addToast('Failed to upload image', 'error');
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      
      <main className="workspace">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Editor Panel */}
        <aside className="panel glass">
          <h2 className="panel-title">
            {activeTab === 'templates' && 'Templates'}
            {activeTab === 'text' && 'Edit Text'}
            {activeTab === 'background' && 'Background'}
            {activeTab === 'upload' && 'Uploads'}
            {activeTab === 'designs' && 'My Designs'}
          </h2>

          {activeTab === 'templates' && (
            <div className="template-grid">
              {templates.map(t => (
                <div 
                  key={t.id} 
                  className={`template-card ${selectedTemplate?.id === t.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTemplate(t)}
                >
                  <img src={t.imageUrl} alt={t.name} loading="lazy" />
                  <div className="template-info">
                    <div className="template-name">{t.name}</div>
                    <div className="template-category">{t.category}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'text' && (
            <div className="editor-group">
              <label className="editor-label">Poster Text</label>
              <textarea 
                className="editor-input"
                rows={4}
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder="Enter your text here..."
              />
            </div>
          )}

          {activeTab === 'background' && (
            <div className="editor-group">
              <label className="editor-label">Colors</label>
              <div className="color-picker">
                {colors.map(c => (
                  <button 
                    key={c}
                    className={`color-btn ${backgroundColor === c ? 'selected' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => {
                      setBackgroundColor(c);
                      api.setBackground(c).catch(() => {});
                    }}
                    aria-label={`Select color ${c}`}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="editor-group">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleUpload} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <div 
                className="upload-area"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="upload-icon" size={32} />
                <p>Click to upload logo</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>PNG, JPG up to 5MB</span>
              </div>
            </div>
          )}

          {activeTab === 'designs' && (
            <div className="template-grid">
              {savedDesigns.length === 0 ? (
                <p style={{ color: 'var(--text-light)', textAlign: 'center', marginTop: '1rem' }}>No designs saved yet.</p>
              ) : (
                savedDesigns.map(design => (
                  <div key={design.designId} className="template-card" style={{ backgroundColor: design.backgroundColor, position: 'relative', minHeight: '200px' }}>
                    {design.template && (
                      <img 
                        src={design.template.imageUrl} 
                        alt="Design Template" 
                        style={{ opacity: 0.8, mixBlendMode: 'multiply' }}
                      />
                    )}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                      <h3 style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)', textAlign: 'center' }}>
                        {design.text}
                      </h3>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteDesign(design.designId); }}
                      className="btn btn-outline"
                      style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.25rem', backgroundColor: 'white', border: 'none' }}
                      aria-label="Delete design"
                    >
                      <Trash2 size={16} color="red" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </aside>

        {/* Canvas Area */}
        <section className="canvas-wrapper">
          {selectedTemplate ? (
            <motion.div 
              className="canvas"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ 
                backgroundImage: `url(${selectedTemplate.imageUrl})`,
                backgroundColor: backgroundColor 
              }}
            >
              {/* Optional overlay to mix background color */}
              {backgroundColor !== '#ffffff' && (
                 <div style={{ position: 'absolute', inset: 0, backgroundColor, opacity: 0.5, mixBlendMode: 'multiply' }} />
              )}
              {uploadedLogo && (
                <motion.img 
                  src={uploadedLogo} 
                  className="canvas-logo" 
                  alt="Logo"
                  drag
                  dragMomentum={false}
                />
              )}
              <motion.div 
                className="canvas-text"
                drag
                dragMomentum={false}
              >
                {userText}
              </motion.div>
            </motion.div>
          ) : (
            <div className="empty-state">
              <AlertCircle size={48} />
              <h2>No Template Selected</h2>
              <p>Choose a template from the sidebar to get started.</p>
            </div>
          )}

          {selectedTemplate && (
            <div style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>
              <button 
                className="btn btn-primary glass" 
                onClick={handleSave}
                disabled={isSaving}
              >
                <Download size={18} />
                {isSaving ? 'Saving...' : 'Save Design'}
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} PosterMaker. Built with React & Node.js.</p>
      </footer>

      {/* Toasts */}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div 
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="toast"
            >
              {toast.type === 'success' ? <CheckCircle color="#22c55e" size={20} /> : <AlertCircle color="#ef4444" size={20} />}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
