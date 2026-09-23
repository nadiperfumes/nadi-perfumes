import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { supabase } from '../lib/supabase'
import { InstagramLogo, Phone, Leaf } from '@phosphor-icons/react'
import ProductCard from '../components/ProductCard'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Home() {
  const { data: produtos, isLoading } = useQuery({
    queryKey: ['produtos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true })
      if (error) throw error
      return data
    },
  })

  const { data: config } = useQuery({
    queryKey: ['configuracoes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('configuracoes')
        .select('*')
        .single()
      if (error) throw error
      return data
    },
  })

  return (
    <div className="min-h-screen bg-off-white">

      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-off-white/90 backdrop-blur-sm border-b border-green-pale">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Nadi Perfumes"
              className="h-10 w-auto"
            />
          </a>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#produtos" className="text-nadi-mid hover:text-green-forest text-sm tracking-wider uppercase font-sans transition-colors duration-300">
              Coleção
            </a>
            <a href="#sobre" className="text-nadi-mid hover:text-green-forest text-sm tracking-wider uppercase font-sans transition-colors duration-300">
              Sobre
            </a>
            {config?.instagram && (
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nadi-mid hover:text-green-forest transition-colors duration-300"
              >
                <InstagramLogo size={20} />
              </a>
            )}
          </nav>

          {/* Mobile: ícone WhatsApp */}
          <div className="md:hidden flex items-center gap-4">
            {config?.whatsapp && (
              <a
                href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-forest"
              >
                <Phone size={22} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <Hero config={config} />

      {/* Seção: Sobre */}
      <section id="sobre" className="bg-warm-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Leaf size={32} className="text-green-mid mx-auto mb-6" />
            <h2 className="font-serif text-4xl md:text-5xl text-nadi-dark mb-6 leading-tight">
              A arte de criar memórias
            </h2>
            <p className="text-nadi-mid leading-relaxed text-lg max-w-2xl mx-auto font-sans font-light">
              Cada fragrância é uma história. Cada nota é uma emoção. 
              Na Nadi, selecionamos perfumes que tocam a alma e ficam na memória de quem os sente.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divisor */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-green-mid to-transparent mx-6" />

      {/* Seção: Produtos */}
      <section id="produtos" className="py-20 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">

          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-nadi-dark leading-tight">
              Nossa Coleção
            </h2>
            <div className="w-16 h-[2px] bg-gold mt-4" />
          </motion.div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-warm-white border border-green-pale animate-pulse">
                  <div className="aspect-square bg-green-pale/50" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-green-pale rounded w-3/4" />
                    <div className="h-3 bg-green-pale rounded w-full" />
                    <div className="h-3 bg-green-pale rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : produtos && produtos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {produtos.map((produto, i) => (
                <motion.div
                  key={produto.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <ProductCard produto={produto} whatsapp={config?.whatsapp} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-nadi-light">
                Em breve, novos produtos
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Seção: CTA WhatsApp */}
      {config?.whatsapp && (
        <section className="bg-green-forest py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-warm-white mb-4">
              Não encontrou o que procura?
            </h2>
            <p className="text-green-pale/80 font-sans font-light mb-8">
              Fale diretamente conosco pelo WhatsApp e vamos te ajudar a encontrar a fragrância perfeita.
            </p>
            <a
              href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gold text-green-deep px-8 py-3 text-sm tracking-wider uppercase font-sans hover:bg-gold-light active:scale-[0.98] transition-all duration-300"
            >
              <Phone size={18} />
              Falar no WhatsApp
            </a>
          </motion.div>
        </section>
      )}

      {/* Footer */}
      <Footer config={config} />
    </div>
  )
}
