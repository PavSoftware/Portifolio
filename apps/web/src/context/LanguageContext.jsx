import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  pt: {
    home: 'Início',
    projects: 'Projetos',
    gallery: 'Galeria',
    testimonials: 'Depoimentos',
    contact: 'Contato',
    admin: 'Painel',
    about: 'Sobre',
    latest: 'Recentes',
    see_all: 'Ver Tudo',
    talk_now: 'Fale Agora',
    hero_title: 'Transformamos Ideias em Código',
    hero_subtitle: 'Inovação • Tecnologia • Elegância',
    hero_desc: 'Na PavSoftware, criamos soluções digitais sob medida que combinam performance, design e inovação.',
    talk_to_us: 'Fale Conosco',
    see_portfolio: 'Ver Portfólio',
    featured_projects: 'Projetos em Destaque',
    latest_projects: 'Últimos Projetos',
    all_projects: 'Todos os Projetos',
    view_details: 'Ver Detalhes',
    back_to_projects: 'Voltar para Projetos',
    tech_stack: 'Tecnologias Utilizadas',
    live_demo: 'Demonstração',
    source_code: 'Código Fonte',
    contact_similar: 'Contato para Projeto Semelhante',
    be_success_story: 'Seja nossa próxima história de sucesso',
    get_started: 'Começar Agora',
    admin_login: 'Login Administrativo',
    welcome_back: 'Bem-vindo de volta, Comandante.',
    username: 'Usuário (Email)',
    password: 'Senha',
    sign_in: 'Entrar',
    logout: 'Sair',
    dashboard: 'Painel de Controle',
    total_projects: 'Total de Projetos',
    featured: 'Destaques',
    gallery_images: 'Imagens na Galeria',
    recent_activity: 'Atividade Recente',
    settings: 'Configurações',
  },
  en: {
    home: 'Home',
    projects: 'Projects',
    gallery: 'Gallery',
    testimonials: 'Testimonials',
    contact: 'Contact',
    admin: 'Admin',
    about: 'About',
    latest: 'Latest',
    see_all: 'See All',
    talk_now: 'Talk Now',
    hero_title: 'Transforming Ideas into Code',
    hero_subtitle: 'Innovation • Technology • Elegance',
    hero_desc: 'At PavSoftware, we create custom digital solutions that combine performance, design, and innovation.',
    talk_to_us: 'Talk to Us',
    see_portfolio: 'See Portfolio',
    featured_projects: 'Featured Projects',
    latest_projects: 'Latest Projects',
    all_projects: 'All Projects',
    view_details: 'View Details',
    back_to_projects: 'Back to Projects',
    tech_stack: 'Tech Stack',
    live_demo: 'Live Demo',
    source_code: 'Source Code',
    contact_similar: 'Contact for Similar Project',
    be_success_story: 'Be our next success story',
    get_started: 'Get Started Now',
    admin_login: 'Admin Login',
    welcome_back: 'Welcome back, Commander.',
    username: 'Username (Email)',
    password: 'Password',
    sign_in: 'Sign In',
    logout: 'Logout',
    dashboard: 'Dashboard',
    total_projects: 'Total Projects',
    featured: 'Featured',
    gallery_images: 'Gallery Images',
    recent_activity: 'Recent Activity',
    settings: 'Settings',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'pt');

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
