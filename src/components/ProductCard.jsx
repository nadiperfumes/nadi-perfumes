import { ShoppingCart } from 'lucide-react'

export default function ProductCard({ produto, whatsapp }) {
  const handleWhatsAppClick = () => {
    const numero = whatsapp?.replace(/\D/g, '')
    const mensagem = `Olá! Tenho interesse no produto *${produto.nome}* - R$ ${produto.preco.toFixed(2)}`
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square overflow-hidden bg-gray-200">
        {produto.imagem_url ? (
          <img
            src={produto.imagem_url}
            alt={produto.nome}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <ShoppingCart className="w-16 h-16" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {produto.nome}
        </h3>
        
        {produto.descricao && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {produto.descricao}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            R$ {produto.preco.toFixed(2)}
          </span>
          
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
