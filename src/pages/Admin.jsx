import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { LogOut, Package, Settings } from 'lucide-react'
import ProductsManager from '../components/admin/ProductsManager'
import ConfigManager from '../components/admin/ConfigManager'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('produtos')
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('produtos')}
              className={`flex items-center space-x-2 py-4 border-b-2 transition ${
                activeTab === 'produtos'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">Produtos</span>
            </button>
            <button
              onClick={() => setActiveTab('configuracoes')}
              className={`flex items-center space-x-2 py-4 border-b-2 transition ${
                activeTab === 'configuracoes'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Configurações</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'produtos' && <ProductsManager />}
        {activeTab === 'configuracoes' && <ConfigManager />}
      </main>
    </div>
  )
}
