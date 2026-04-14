/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Flame, 
  Gift, 
  Play, 
  Rocket, 
  ShieldCheck, 
  Star, 
  Users, 
  Zap,
  TrendingUp,
  DollarSign,
  Layers,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

// --- Components ---

const Button = ({ children, className = '', onClick, href }: { children: React.ReactNode, className?: string, onClick?: () => void, href?: string }) => {
  const content = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`bg-accent hover:bg-accent/90 text-white font-sans font-black py-5 px-10 rounded-2xl transition-all duration-300 shadow-neon-accent animate-pulse-soft uppercase tracking-tight text-center ${className}`}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full md:w-auto">{content}</a>;
  }
  return content;
};

const SectionTitle = ({ children, subtitle, className = '', align = 'center' }: { children: React.ReactNode, subtitle?: string, className?: string, align?: 'center' | 'left' }) => (
  <div className={`mb-12 md:mb-20 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-6xl font-sans font-black mb-6 tracking-tighter uppercase leading-[0.95]"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-text-dim text-lg md:text-xl max-w-3xl font-medium ${align === 'center' ? 'mx-auto' : ''}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const Carousel = ({ images, autoPlayInterval = 4000 }: { images: string[], autoPlayInterval?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval, isPaused]);

  const onDragEnd = (_: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (info.offset.x > swipeThreshold) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div 
      className="relative group w-full max-w-5xl mx-auto overflow-hidden rounded-3xl border border-white/5 shadow-2xl bg-black/20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragEnd}
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex cursor-grab active:cursor-grabbing"
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full aspect-video flex items-center justify-center bg-black/40 select-none">
            <img 
              src={img} 
              alt={`Slide ${i}`} 
              className="w-full h-full object-contain pointer-events-none" 
              referrerPolicy="no-referrer" 
            />
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentIndex === i ? 'bg-accent w-4' : 'bg-white/10'}`}
          />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-surface/40 border border-white/5 rounded-2xl mb-4 overflow-hidden backdrop-blur-sm transition-all hover:border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-6 md:p-8 font-sans font-black text-lg md:text-xl hover:text-cyan transition-colors"
      >
        <span className="uppercase tracking-tight">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-6 md:px-8 pb-8 text-text-dim text-base md:text-lg leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const checkoutLink = "https://ggcheckout.app/checkout/v4/pjsYjLZHMbzBEtJlizlc";

  return (
    <div className="min-h-screen bg-bg selection:bg-accent selection:text-white">
      {/* --- Hero Section --- */}
      <section className="relative min-h-screen flex items-center px-4 py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-accent/10 text-accent border border-accent/30 px-5 py-2 rounded-full text-xs md:text-sm font-black uppercase tracking-[0.2em] w-fit mb-8 shadow-neon-accent backdrop-blur-sm"
            >
              🚀 97% das vagas preenchidas
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-sans font-black leading-[0.9] tracking-tighter uppercase mb-8"
            >
              ACELERE SUA PRODUÇÃO COM <span className="text-accent text-glow-accent">CORTES TEMÁTICOS!</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-2xl text-text-dim max-w-2xl mb-12 font-medium leading-relaxed"
            >
              Facilite sua rotina de postagens. Tenha acesso à maior biblioteca de cortes temáticos do Brasil, com todos os nichos mais buscados do momento.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Button href={checkoutLink} className="text-xl md:text-2xl px-12 py-6 w-full sm:w-auto">
                GARANTIR ACESSO AGORA
              </Button>

              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-xl">
                <Clock className="w-6 h-6 text-red-500 animate-pulse" />
                <div className="text-left">
                  <div className="text-[10px] font-black uppercase tracking-widest text-text-dim">Expira Em:</div>
                  <div className="text-2xl font-mono font-black text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 bg-accent/20 blur-[100px] rounded-full" />
            <img 
              src="https://packlandia.com/wp-content/uploads/2025/09/banner_index.png" 
              className="relative z-10 w-full h-auto rounded-[40px] shadow-[0_0_50px_rgba(168,85,246,0.2)] border border-white/10" 
              alt="Packlandia Preview"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {/* Mobile Hero Image */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-8"
          >
            <img 
              src="https://packlandia.com/wp-content/uploads/2025/09/banner_index.png" 
              className="w-full h-auto rounded-3xl shadow-2xl border border-white/10" 
              alt="Packlandia Preview"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* --- Proof Section --- */}
      <section className="py-24 md:py-40 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Conteúdo focado em retenção que pode auxiliar no engajamento do seu perfil.">
            ESTRATÉGIAS UTILIZADAS POR CRIADORES QUE <span className="text-cyan text-glow-cyan">NÃO MOSTRAM O ROSTO</span>
          </SectionTitle>
          
          <Carousel images={[
            "https://packlandia.com/wp-content/uploads/2025/09/35-scaled.jpg-1-1024x576.webp",
            "https://packlandia.com/wp-content/uploads/2025/09/33-scaled.jpg-1024x576.webp",
            "https://packlandia.com/wp-content/uploads/2025/09/39-scaled.jpg-1024x576.webp",
            "https://packlandia.com/wp-content/uploads/2025/09/38-scaled.jpg-1024x576.webp"
          ]} />

          <div className="mt-16 md:mt-24 text-center">
            <p className="text-xl md:text-3xl font-medium text-gray-400 leading-relaxed max-w-4xl mx-auto px-4">
              Muitos criadores utilizam esses conteúdos para estratégias de divulgação nos Stories e na Bio. Tudo isso sem precisar aparecer, utilizando <span className="text-accent font-black">cortes temáticos</span> prontos para facilitar seu processo.
            </p>
          </div>
        </div>
      </section>

      {/* --- Niches Section --- */}
      <section className="py-24 md:py-40 px-4 bg-surface/20">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Mais de 5.000 vídeos prontos para facilitar sua produção de conteúdo.">
            O QUE VOCÊ VAI RECEBER
          </SectionTitle>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[
              { img: "filmes_e_series.png", title: "FILMES & SÉRIES", count: "900+" },
              { img: "memes.png", title: "MEMES", count: "500+" },
              { img: "family_guy.png", title: "FAMILY GUY", count: "300+" },
              { img: "rick_and_morty.png", title: "RICK AND MORTY", count: "300+" },
              { img: "os_simpsons.png", title: "SIMPSONS", count: "400+" },
              { img: "futebol.png", title: "FUTEBOL", count: "450+" },
              { img: "lifestyles.png", title: "LIFESTYLE", count: "600+" },
              { img: "academia.png", title: "ACADEMIA", count: "350+" },
              { img: "acao_policial.png", title: "POLICIAL", count: "200+" },
              { img: "espinhas.png", title: "ESPINHAS", count: "150+" },
              { img: "todo_mundo_odeia_o_chris.png", title: "CHRIS", count: "250+" },
              { img: "pica_pau.png", title: "PICA PAU", count: "200+" }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-surface border border-white/5 rounded-[32px] overflow-hidden group shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={`https://packlandia.com/wp-content/uploads/2025/09/${item.img}`} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 bg-accent text-white px-4 py-1.5 rounded-full text-xs font-black shadow-neon-accent backdrop-blur-md">
                    {item.count}
                  </div>
                </div>
                <div className="p-6 text-center text-base font-black uppercase tracking-widest">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- How it Works --- */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle>COMO FUNCIONA?</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users className="w-10 h-10" />, title: "Crie sua conta", desc: "Configure seu perfil de nicho com facilidade." },
              { icon: <Play className="w-10 h-10" />, title: "Poste os cortes", desc: "Utilize nossa biblioteca de vídeos prontos para postar." },
              { icon: <DollarSign className="w-10 h-10" />, title: "Divulgue produtos", desc: "Você pode utilizar estratégias de divulgação como afiliado." },
              { icon: <TrendingUp className="w-10 h-10" />, title: "Consistência", desc: "Mantenha a frequência e otimize seu fluxo de trabalho." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface/30 p-10 rounded-[40px] border border-white/5 hover:border-accent/30 transition-all group backdrop-blur-sm text-center md:text-left"
              >
                <div className="bg-accent/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 text-accent group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-neon-accent mx-auto md:mx-0">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-sans font-black mb-4 uppercase tracking-tight">{step.title}</h3>
                <p className="text-text-dim text-lg leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="py-24 md:py-40 px-4 bg-surface/10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle>QUEM JÁ UTILIZA O PACKLANDIA</SectionTitle>
          <Carousel images={[
            "https://packlandia.com/wp-content/uploads/2025/09/10-1.jpg.webp",
            "https://packlandia.com/wp-content/uploads/2025/09/9.jpg.webp",
            "https://packlandia.com/wp-content/uploads/2025/09/14-2.jpg.webp",
            "https://packlandia.com/wp-content/uploads/2025/09/12-1.jpg.webp",
            "https://packlandia.com/wp-content/uploads/2025/09/11-2.jpg.webp"
          ]} />
        </div>
      </section>

      {/* --- Bonus Section --- */}
      <section className="py-24 md:py-40 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Ao garantir sua vaga hoje, você leva esses bônus exclusivos.">PRESENTES EXCLUSIVOS (BÔNUS)</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Pack Memes", desc: "Mais de 1000 memes para facilitar suas edições.", icon: <Flame className="w-10 h-10 text-orange-500" /> },
              { title: "Efeitos Sonoros", desc: "SFX profissionais para auxiliar na retenção.", icon: <Zap className="w-10 h-10 text-yellow-400" /> },
              { title: "Músicas Sem Copyright", desc: "Trilhas sonoras seguras para seus projetos.", icon: <Layers className="w-10 h-10 text-blue-400" /> },
              { icon: <Users className="w-10 h-10 text-accent" />, title: "Grupo Exclusivo", desc: "Networking com outros criadores de conteúdo." }
            ].map((bonus, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-surface/40 p-10 rounded-[40px] border border-white/5 relative overflow-hidden group shadow-2xl text-center"
              >
                <div className="mb-8 flex justify-center">{bonus.icon}</div>
                <h3 className="text-2xl font-sans font-black mb-4 uppercase tracking-tight">{bonus.title}</h3>
                <p className="text-text-dim text-base leading-relaxed mb-8">{bonus.desc}</p>
                <div className="inline-block bg-cyan/10 text-cyan px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-cyan/20">Grátis Hoje</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final Offer --- */}
      <section className="py-32 md:py-56 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-20 blur-[180px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-surface/60 backdrop-blur-3xl p-10 md:p-24 rounded-[60px] border-2 border-accent/40 shadow-[0_0_100px_rgba(168,85,246,0.2)] text-center relative"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-4 w-full px-4">
              <div className="bg-accent text-white px-8 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-neon-accent">OFERTA LIMITADA</div>
              <div className="bg-cyan text-white px-8 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-neon-cyan">ACESSO IMEDIATO</div>
            </div>

            <Gift className="w-24 h-24 text-accent mx-auto mb-10 animate-float" />
            <h2 className="text-4xl md:text-8xl font-sans font-black mb-10 tracking-tighter uppercase leading-none">OFERTA <span className="text-accent">ESPECIAL</span></h2>
            
            <div className="flex flex-col items-center mb-16">
              <span className="text-text-dim line-through text-2xl md:text-3xl mb-4">DE R$ 99,99</span>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <span className="text-3xl md:text-4xl font-black uppercase tracking-tight">POR APENAS</span>
                <span className="text-8xl md:text-[160px] font-sans font-black text-cyan text-glow-cyan leading-none">R$ 19,90</span>
              </div>
              <div className="mt-10 flex items-center gap-3 text-green-400 font-black uppercase tracking-widest bg-green-500/10 px-8 py-3 rounded-full border border-green-500/20 text-sm">
                <Zap className="w-5 h-5 fill-current" />
                PAGAMENTO ÚNICO - ACESSO VITALÍCIO
              </div>
            </div>

            <Button href={checkoutLink} className="text-2xl md:text-4xl px-16 py-8 md:py-12 w-full shadow-[0_0_60px_rgba(168,85,246,0.4)]">
              GARANTIR ACESSO AGORA
            </Button>

            <div className="mt-16 flex flex-col items-center gap-10">
              <div className="flex items-center gap-4 text-red-500 font-black uppercase tracking-widest animate-pulse text-sm md:text-lg">
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8" />
                ALTA DEMANDA: ÚLTIMAS VAGAS DISPONÍVEIS
              </div>
              
              <div className="flex flex-wrap justify-center gap-10 md:gap-16 opacity-80">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="w-12 h-12 text-cyan" />
                  <div className="text-left">
                    <div className="font-black text-sm md:text-base uppercase tracking-tight">7 DIAS DE GARANTIA</div>
                    <div className="text-xs text-text-dim">Risco zero para você.</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-12 h-12 text-cyan" />
                  <div className="text-left">
                    <div className="font-black text-sm md:text-base uppercase tracking-tight">COMPRA SEGURA</div>
                    <div className="text-xs text-text-dim">Ambiente 100% criptografado.</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 md:py-40 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>PERGUNTAS FREQUENTES</SectionTitle>
          <div className="space-y-4">
            <FAQItem question="Preciso aparecer nos vídeos?" answer="Não! O Packlandia foi criado para facilitar a vida de quem quer criar perfis onde o foco é o conteúdo. Existem diversas formas de buscar resultados sem nunca mostrar o rosto." />
            <FAQItem question="Como recebo o acesso?" answer="Imediatamente após a confirmação do pagamento, você receberá um e-mail com todos os dados de acesso à nossa plataforma onde estão organizados todos os vídeos e bônus." />
            <FAQItem question="Preciso saber editar vídeos?" answer="Não. Os vídeos já estão cortados e prontos para uso. Se desejar personalizar, o processo é simples e pode ser feito pelo celular." />
            <FAQItem question="O conteúdo é atualizado?" answer="Sim! Nossa equipe busca novos cortes e tendências periodicamente para que você tenha volume constante de conteúdo." />
            <FAQItem question="Posso usar em quais redes sociais?" answer="Em diversas plataformas! TikTok, Instagram Reels, YouTube Shorts, Kwai... O formato vertical é versátil para vídeos curtos." />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-24 md:py-32 px-4 border-t border-white/5 text-center bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 p-8 md:p-12 rounded-[40px] border border-white/10 mb-16">
            <h4 className="text-white font-black uppercase tracking-widest mb-6 flex items-center justify-center gap-3">
              <ShieldCheck className="w-6 h-6 text-accent" />
              Aviso Legal Importante
            </h4>
            <p className="text-[11px] md:text-sm text-text-dim leading-relaxed max-w-5xl mx-auto uppercase tracking-wider font-medium">
              Este site não faz parte do site do Facebook ou do Facebook Inc. Além disso, este site NÃO é endossado pelo Facebook de nenhuma maneira. FACEBOOK é uma marca comercial da FACEBOOK, Inc. <br /><br />
              <span className="text-white">OS RESULTADOS PODEM VARIAR DE PESSOA PARA PESSOA.</span> Não há garantia de ganhos ou resultados específicos. O sucesso depende do esforço individual, consistência e aplicação correta das estratégias de cada usuário. Nenhuma informação contida neste produto deve ser interpretada como uma promessa ou garantia de resultados.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-12 text-text-dim/60">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>
          <p className="text-[10px] font-medium text-text-dim/30">© 2026 Packlandia - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
