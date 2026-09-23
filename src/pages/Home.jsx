import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { ShoppingBag, Instagram, Phone } from 'lucide-react'
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                {config?.nome_loja || 'Minha Loja'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {config?.instagram && (
                <a
                  href={config.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600 transition"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {config?.whatsapp && (
                <a
                  href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition"
                >
                  <Phone className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero config={config} />

      {/* Produtos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Nossos Produtos</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : produtos && produtos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <ProductCard key={produto.id} produto={produto} whatsapp={config?.whatsapp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Nenhum produto disponível no momento.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <Footer config={config} />
    </div>
  )
}
