
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  TrendingDown, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  ArrowUpRight,
  MessageCircle,
  X,
  Send,
  Database,
  Plus,
  Minus
} from 'lucide-react';

// --- Types ---
interface FormData {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  infoMethod: string;
  pondCount: string;
  marketDestination: string;
}

interface WhatsAppLead {
  name: string;
  email: string;
  phone: string;
}

// --- Components ---

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Problema', href: '#problem' },
    { name: 'Solución', href: '#solution' },
    { name: 'Resultados', href: '#results' },
    { name: 'Trazabilidad', href: '#fda-urgency' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-0 shadow-md border-b border-gray-100' : 'bg-transparent py-0'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            src={isScrolled ? "https://i.postimg.cc/0j0PL8Hv/5.png" : "https://i.postimg.cc/NjMBzv8g/1.png"} 
            alt="ASPATECH Logo" 
            className={`${isScrolled ? 'h-16 md:h-20' : 'h-24 md:h-32'} w-auto transition-all duration-300 transform group-hover:scale-105`}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-sm font-bold tracking-tight hover:text-brand-shamrock transition-colors ${isScrolled ? 'text-brand-evergreen' : 'text-white/80 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#form" 
            onClick={(e) => scrollToSection(e, '#form')}
            className="bg-brand-shamrock hover:bg-brand-evergreen text-white font-bold py-2 px-5 rounded-full transition-all duration-300 text-xs shadow-sm"
          >
            Agendar Demo
          </a>
        </div>
      </div>
    </nav>
  );
};

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-brand-shamrock transition-colors"
      >
        <span className="text-lg font-bold text-brand-evergreen pr-8">{q}</span>
        <div className="flex-shrink-0">
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-500 leading-relaxed text-sm md:text-base">{a}</p>
      </div>
    </div>
  );
};

const WhatsAppWidget: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lead, setLead] = useState<WhatsAppLead>({ name: '', email: '', phone: '' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola ASPATECH, mi nombre es ${lead.name}. Estoy interesado en agendar una demo. Mi correo es ${lead.email}.`;
    const whatsappUrl = `https://wa.me/5215500000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onComplete();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 mb-4 w-80 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-brand-evergreen p-6 text-white flex justify-between items-center">
            <div>
              <h4 className="font-bold text-lg leading-tight">Hablemos por WhatsApp</h4>
              <p className="text-brand-lime/80 text-xs mt-1">Soporte experto ASPATECH</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleWhatsAppSubmit} className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre</label>
              <input 
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-shamrock outline-none text-sm transition-all"
                placeholder="Tu nombre"
                value={lead.name}
                onChange={(e) => setLead({...lead, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Correo</label>
              <input 
                required
                type="email"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-shamrock outline-none text-sm transition-all"
                placeholder="tu@correo.com"
                value={lead.email}
                onChange={(e) => setLead({...lead, email: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Celular</label>
              <input 
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-shamrock outline-none text-sm transition-all"
                placeholder="+52 ..."
                value={lead.phone}
                onChange={(e) => setLead({...lead, phone: e.target.value})}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-brand-shamrock hover:bg-brand-evergreen text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 text-sm"
            >
              Hablar ahora <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-shamrock text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-300 relative group"
      >
        <span className="absolute -left-44 bg-brand-evergreen text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-widest whitespace-nowrap">Hablemos por WhatsApp</span>
        <MessageCircle className="w-8 h-8" />
      </button>
    </div>
  );
};

const LeadForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    infoMethod: '',
    pondCount: '',
    marketDestination: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 relative" id="form">
      <h3 className="text-2xl font-extrabold text-brand-evergreen mb-8 tracking-tight">
        Agendar Demo de Aspatech
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre completo</label>
            <input 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-shamrock focus:bg-white outline-none transition-all"
              placeholder="Juan Pérez"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Empresa</label>
            <input 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-shamrock focus:bg-white outline-none transition-all"
              placeholder="Granja Camaronera S.A."
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cargo</label>
            <input 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-shamrock focus:bg-white outline-none transition-all"
              placeholder="Gerente de Operaciones"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Teléfono / WhatsApp</label>
            <input 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-shamrock focus:bg-white outline-none transition-all"
              placeholder="+52 1 55 ..."
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Correo corporativo</label>
          <input 
            required
            type="email"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-shamrock focus:bg-white outline-none transition-all"
            placeholder="j.perez@empresa.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="pt-4 space-y-4">
          <p className="text-xs font-black text-brand-shamrock uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3" /> Preguntas de Calificación
          </p>
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-500">¿Cómo registran actualmente la información?</label>
            <select 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-shamrock"
              value={formData.infoMethod}
              onChange={(e) => setFormData({...formData, infoMethod: e.target.value})}
            >
              <option value="">Selecciona...</option>
              <option value="manual">Excel / papel / manual</option>
              <option value="internal">Sistema interno no especializado</option>
              <option value="software">Software especializado</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500">Nº de Estanques</label>
              <select 
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-shamrock"
                value={formData.pondCount}
                onChange={(e) => setFormData({...formData, pondCount: e.target.value})}
              >
                <option value="">Selecciona...</option>
                <option value="<50">Menos de 50</option>
                <option value="50-100">50 – 100</option>
                <option value=">100">Más de 100</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500">Destino de Producción</label>
              <select 
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-shamrock"
                value={formData.marketDestination}
                onChange={(e) => setFormData({...formData, marketDestination: e.target.value})}
              >
                <option value="">Selecciona...</option>
                <option value="mexico">Solo México</option>
                <option value="hybrid">México + USA</option>
                <option value="usa">Principalmente USA</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-brand-shamrock hover:bg-brand-evergreen text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 group"
        >
          Agendar Demo <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

const SectionHeading: React.FC<{ title: string; subtitle?: string; dark?: boolean; centered?: boolean }> = ({ title, subtitle, dark, centered }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className={`text-3xl md:text-5xl font-black mb-6 tracking-tight text-balance leading-tight ${dark ? 'text-white' : 'text-brand-evergreen'}`}>
      {title}
    </h2>
    {subtitle && <p className={`text-lg md:text-xl max-w-3xl leading-relaxed ${centered ? 'mx-auto' : ''} ${dark ? 'text-gray-300' : 'text-gray-500'}`}>{subtitle}</p>}
  </div>
);

const App: React.FC = () => {
  const [page, setPage] = useState<'landing' | 'thank-you'>('landing');

  const scrollToHero = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (page === 'thank-you') {
    return (
      <div className="min-h-screen bg-brand-alabaster flex items-center justify-center px-6">
        <div className="max-w-xl w-full text-center">
          <div className="w-24 h-24 bg-brand-lime rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl">
            <CheckCircle2 className="w-12 h-12 text-brand-evergreen" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-brand-evergreen mb-6 tracking-tight leading-tight">¡Todo listo!</h1>
          <p className="text-xl text-gray-500 mb-12 leading-relaxed">
            Tu solicitud ha sido enviada con éxito. Un especialista de ASPATECH se pondrá en contacto contigo pronto para tu demo.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="bg-brand-evergreen text-white px-8 py-4 rounded-full font-bold hover:bg-brand-shamrock transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-brand-lime selection:text-brand-evergreen">
      <Navbar />
      <WhatsAppWidget onComplete={() => setPage('thank-you')} />

      {/* HERO */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/9QD9GSnS/2a11bad2544ab1ccae4cc188039ef592dfeb67e6.png" 
            alt="Hombre de frente sosteniendo tablet con estanques de fondo" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-evergreen/75"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-evergreen/90 via-brand-evergreen/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 grid md:grid-cols-12 gap-16 items-start relative z-10">
          <div className="md:col-span-7 pt-4">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-8 text-balance">
              Control total de tu granja camaronera.
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-12 leading-relaxed max-w-2xl font-medium text-balance">
              Software e IA para predecir biomasa, reducir merma y asegurar el cumplimiento FDA 2028. De estanque a planta, datos verificables.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                "Predicción real de cosecha",
                "Reducción de merma ~8%",
                "Trazabilidad Digital FDA",
                "Optimización de costos FCR"
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-brand-lime rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-brand-evergreen" />
                  </div>
                  <span className="text-white font-bold text-sm tracking-tight">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-5">
            <LeadForm onSuccess={() => setPage('thank-you')} />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-28 bg-white" id="problem">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeading 
            title="La mayoría de las granjas pierde dinero sin verlo." 
            subtitle="Decisiones basadas en estimaciones manuales generan fugas de capital que Aspatech elimina con datos reales."
            centered
          />
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 h-[450px]">
                <img src="https://i.imgur.com/F2tROtY.png" className="w-full h-full object-cover" alt="Mano sosteniendo camaron" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent"></div>
             </div>
             <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: TrendingDown, label: "Merma oculta", desc: "Diferencias críticas entre granja y planta de proceso." },
                  { icon: AlertCircle, label: "Sobreconsumo", desc: "Alimento desperdiciado por falta de datos en tiempo real." },
                  { icon: Database, label: "Caos de datos", desc: "Hojas de Excel dispersas que no permiten predecir nada." },
                  { icon: ShieldCheck, label: "Riesgo FDA", desc: "Exportaciones bloqueadas por falta de trazabilidad digital." }
                ].map((item, idx) => (
                  <div key={idx} className="p-8 bg-gray-50 rounded-3xl border border-gray-200 hover:border-brand-shamrock/40 transition-all group shadow-sm">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-brand-evergreen" />
                    </div>
                    <h4 className="text-lg font-black text-brand-evergreen mb-2 tracking-tight">{item.label}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>
          <div className="mt-16 text-center">
            <a href="#form" onClick={scrollToHero} className="bg-brand-evergreen text-white px-10 py-5 rounded-full font-bold hover:bg-brand-shamrock transition-all inline-flex items-center gap-2 shadow-lg">
              Agendar Demo <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-28 bg-gray-50 border-y border-gray-200" id="solution">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Tecnología que impulsa tu rentabilidad."
            subtitle="Software avanzado y hardware integrado para un control total del ciclo de cultivo."
          />
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-4 flex flex-col gap-6">
              {[
                { title: "Predicción IA", desc: "Modelos que anticipan biomasa y tallas finales con precisión.", icon: Zap },
                { title: "Control Logístico", desc: "Monitoreo real de transporte y merma entre puntos de control.", icon: BarChart3 },
                { title: "FCR Optimizado", desc: "Reducción real del costo de alimento por cada estanque.", icon: Database }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm flex-1 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-brand-evergreen rounded-lg flex items-center justify-center mb-6 shadow-sm">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-black text-brand-evergreen mb-3 tracking-tight">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-8 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#0D151F] group p-4 md:p-1 flex items-center justify-center border border-gray-800">
              <div className="w-full aspect-[16/10] relative overflow-hidden flex items-center justify-center">
                <img 
                  src="https://i.postimg.cc/RVGHjt8S/Screenshot_2026_01_28_at_9_41_40_p_m.png" 
                  alt="Dashboard Principal Aspatech" 
                  className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-[1.02]" 
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D151F]/90 via-transparent to-transparent h-32 pointer-events-none"></div>
              <div className="absolute bottom-6 left-8 right-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                <p className="text-white text-base md:text-lg font-bold max-w-xs italic drop-shadow-xl">"Control de biomasa y logística en tiempo real."</p>
                <a href="#form" onClick={scrollToHero} className="bg-brand-lime text-brand-evergreen px-6 py-3 rounded-full font-black hover:bg-white transition-all whitespace-nowrap shadow-xl text-sm">
                   Ver más módulos
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-28 bg-white" id="results">
        <div className="container mx-auto px-6">
          <div className="bg-brand-evergreen rounded-[3.5rem] p-10 md:p-20 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-none">
                  Resultados garantizados.
                </h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-12">
                  {[
                    { val: "⬇️ 8%", label: "Merma en logística" },
                    { val: "⬇️ 3%", label: "Ahorro Alimento" },
                    { val: "⬇️ 45%", label: "Tiempo Auditoría" },
                    { val: "⬆️ 1%", label: "Margen Neto" }
                  ].map((kpi, idx) => (
                    <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                      <div className="text-4xl font-black text-brand-lime mb-2 tracking-tighter">{kpi.val}</div>
                      <div className="text-gray-300 text-xs font-bold uppercase tracking-widest">{kpi.label}</div>
                    </div>
                  ))}
                </div>
                <a 
                  href="#form"
                  onClick={scrollToHero}
                  className="inline-flex items-center gap-3 bg-brand-lime text-brand-evergreen px-10 py-5 rounded-full font-black text-lg hover:bg-white transition-all shadow-xl"
                >
                  Agendar Demo <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[500px] border-2 border-brand-lime/20">
                <img 
                  src="https://i.postimg.cc/K8CMQN66/3513e0b0dc75d459e3b43219481f4d44d72930e0.png" 
                  alt="Mano sosteniendo camarones con fondo de mercado desenfocado" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FDA URGENCY */}
      <section className="py-28 bg-gray-50 border-y border-gray-200" id="fda-urgency">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 md:order-1">
              <div className="bg-[#0D151F] rounded-[2.5rem] p-2 md:p-1 shadow-2xl border border-gray-800 group overflow-hidden">
                <div className="relative w-full aspect-[16/10] flex items-center justify-center">
                   <img 
                      src="https://i.postimg.cc/c4d39hDr/Screenshot_2026_02_03_at_10_52_10_p_m_(1).png" 
                      alt="Dashboard con gráficas Aspatech" 
                      className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-[1.02]" 
                    />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-lime p-6 rounded-2xl shadow-2xl border-4 border-white transform rotate-3 z-20">
                 <div className="text-brand-evergreen font-black text-5xl">2028</div>
                 <div className="text-[11px] text-brand-evergreen font-black uppercase tracking-widest leading-none mt-1">Límite Trazabilidad FDA</div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-brand-evergreen text-brand-lime inline-block px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest mb-8 shadow-sm">
                Cumplimiento FDA FSMA 204
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-brand-evergreen mb-8 tracking-tighter leading-tight text-balance">
                Digitaliza tu trazabilidad o queda fuera del mercado.
              </h2>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">
                La nueva regulación exige un registro digital preciso por lote. Aspatech automatiza este proceso con gráficas y reportes auditables para que tus exportaciones fluyan sin riesgos.
              </p>
              <div className="mb-12">
                 <a href="#form" onClick={scrollToHero} className="bg-brand-evergreen text-white px-10 py-5 rounded-full font-bold shadow-xl hover:bg-brand-shamrock transition-all inline-flex items-center gap-2">
                    Agendar Demo <ChevronRight className="w-5 h-5" />
                 </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-28 bg-white border-b border-gray-100" id="faqs">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-evergreen tracking-tight mb-4">Preguntas que importan</h2>
            <p className="text-lg md:text-xl text-gray-500 font-medium">(y las respuestas que evitan sorpresas).</p>
          </div>
          <div className="space-y-2">
            {[
              { 
                q: "¿En cuánto tiempo se ve el valor y cómo lo demuestran?", 
                a: "Se arranca con diagnóstico y baseline, y se mide contra el control digital (merma, nómina y consistencia de talla). El “Aha!” suele aparecer al comparar antes/después en 2–4 semanas; el valor completo llega en 8–12 semanas tras instrumentación, entrenamiento y rutina de reporteo." 
              },
              { 
                q: "¿Y si el hardware falla o la conectividad en campo es limitada?", 
                a: "El despliegue se diseña para condiciones reales de granja: puntos críticos, rutina operativa y captura con evidencia. El objetivo es confiabilidad operativa, no “gadgets”. En demo se revisa la arquitectura recomendada para tu sitio y el plan de soporte/mantenimiento." 
              },
              { 
                q: "¿Cómo evitan que la gente siga usando papel o que capturen “lo mínimo”?", 
                a: "La adopción se resuelve con workflows por rol, responsabilidades claras, evidencia (no solo campos de texto), y reportes que el equipo realmente usa para operar y cerrar nómina. Además, la dirección obtiene un tablero ejecutivo que alinea incentivos y seguimiento." 
              }
            ].map((item, idx) => (
              <FAQItem key={idx} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-brand-evergreen text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
             <div className="max-w-xl text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">¿Listo para operar con precisión?</h2>
                <p className="text-gray-400 text-base font-medium leading-relaxed">Únete a las granjas líderes que ya operan con datos verificables y cumplen estándares globales.</p>
             </div>
             <a href="#form" onClick={scrollToHero} className="bg-brand-lime text-brand-evergreen px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl">
               Agendar Demo
             </a>
          </div>
          <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center">
                <img 
                  src="https://i.postimg.cc/NjMBzv8g/1.png" 
                  alt="ASPATECH Logo Blanco" 
                  className="h-40 md:h-56 w-auto"
                />
             </div>
             <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-400">
                <a href="#problem" onClick={(e) => {e.preventDefault(); document.querySelector('#problem')?.scrollIntoView({behavior:'smooth'})}} className="hover:text-white transition-colors">Problema</a>
                <a href="#solution" onClick={(e) => {e.preventDefault(); document.querySelector('#solution')?.scrollIntoView({behavior:'smooth'})}} className="hover:text-white transition-colors">Solución</a>
                <a href="#results" onClick={(e) => {e.preventDefault(); document.querySelector('#results')?.scrollIntoView({behavior:'smooth'})}} className="hover:text-white transition-colors">Resultados</a>
                <a href="#faqs" onClick={(e) => {e.preventDefault(); document.querySelector('#faqs')?.scrollIntoView({behavior:'smooth'})}} className="hover:text-white transition-colors">Preguntas</a>
             </div>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center md:text-right">© 2024 Aspatech S.A. | Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
