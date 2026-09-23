import { motion } from 'motion/react'
import { InstagramLogo, Phone } from '@phosphor-icons/react'

export default function Hero({ config }) {
  return (
    <section className="relative min-h-[100dvh] bg-green-deep overflow-hidden flex flex-col">

      {/* Textura de fundo sutil */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, #4a7c2f 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #7aad52 0%, transparent 50%)`
        }}
      />

      {/* Linha decorativa dourada no topo */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Conteúdo principal */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-24 text-center max-w-4xl mx-auto w-full">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <img
            src="/logo.png"
            alt="Nadi Perfumes"
            className="w-36 md:w-48 mx-auto invert brightness-0 invert"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-gold-light text-sm tracking-[0.25em] uppercase mb-6 font-sans"
        >
          Fragrâncias que contam histórias
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
          className="font-serif text-5xl md:text-7xl text-warm-white leading-[1.05] tracking-tight mb-6"
        >
          {config?.nome_loja || 'Nadi Perfumes'}
        </motion.h1>

        {/* Descrição */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="text-green-pale text-base md:text-lg leading-relaxed max-w-lg mb-10 font-sans font-light"
        >
          {config?.descricao_loja || 'Descubra fragrâncias únicas que expressam sua essência com elegância e sofisticação.'}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <a
            href="#produtos"
            className="px-8 py-3 bg-gold text-green-deep font-sans font-500 text-sm tracking-wider uppercase rounded-none hover:bg-gold-light transition-colors duration-300 min-w-[180px] text-center"
          >
            Ver Coleção
          </a>
          {config?.whatsapp && (
            <a
              href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-green-pale text-green-pale font-sans text-sm tracking-wider uppercase hover:bg-green-forest transition-colors duration-300 min-w-[180px] text-center"
            >
              Falar Conosco
            </a>
          )}
        </motion.div>

        {/* Redes sociais */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center gap-6 mt-12"
        >
          {config?.instagram && (
            <a
              href={config.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-pale hover:text-gold transition-colors duration-300"
            >
              <InstagramLogo size={22} />
            </a>
          )}
          {config?.whatsapp && (
            <a
              href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-pale hover:text-gold transition-colors duration-300"
            >
              <Phone size={22} />
            </a>
          )}
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-green-pale text-xs tracking-widest uppercase font-sans">Explorar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  )
}
