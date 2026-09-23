import { motion } from 'motion/react'
import { WhatsappLogo, ShoppingBag } from '@phosphor-icons/react'

export default function ProductCard({ produto, whatsapp }) {
  const handleWhatsAppClick = () => {
    const numero = whatsapp?.replace(/\D/g, '')
    const mensagem = `Olá! Tenho interesse no produto *${produto.nome}* - R$ ${produto.preco.toFixed(2)}`
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group bg-warm-white border border-green-pale flex flex-col"
    >
      {/* Imagem */}
      <div className="relative aspect-square overflow-hidden bg-green-pale">
        {produto.imagem_url ? (
          <img
            src={produto.imagem_url}
            alt={produto.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={40} className="text-green-mid opacity-40" />
          </div>
        )}

        {/* Overlay ao hover */}
        <div className="absolute inset-0 bg-green-deep opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

        {/* Badge categoria */}
        {produto.categoria && (
          <span className="absolute top-3 left-3 bg-green-forest text-green-pale text-[10px] tracking-widest uppercase px-3 py-1 font-sans">
            {produto.categoria}
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-xl text-nadi-dark leading-tight mb-2">
          {produto.nome}
        </h3>

        {produto.descricao && (
          <p className="text-nadi-mid text-sm leading-relaxed mb-4 line-clamp-2 font-sans font-light flex-1">
            {produto.descricao}
          </p>
        )}

        {/* Preço e Botão */}
        <div className="flex items-center justify-between pt-4 border-t border-green-pale mt-auto">
          <span className="font-serif text-2xl text-green-forest">
            R$ {produto.preco.toFixed(2)}
          </span>

          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 bg-green-forest text-green-pale px-4 py-2 text-xs tracking-wider uppercase font-sans hover:bg-green-deep active:scale-[0.98] transition-all duration-300"
          >
            <WhatsappLogo size={16} />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
