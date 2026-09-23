import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { Save, Loader } from 'lucide-react'

export default function ConfigManager() {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    nome_loja: '',
    descricao_loja: '',
    whatsapp: '',
    instagram: '',
  })

  const { data: config, isLoading } = useQuery({
    queryKey: ['admin-configuracoes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('configuracoes')
        .select('*')
        .single()
      
      if (error && error.code !== 'PGRST116') throw error
      return data
    },
  })

  useEffect(() => {
    if (config) {
      setFormData({
        nome_loja: config.nome_loja || '',
        descricao_loja: config.descricao_loja || '',
        whatsapp: config.whatsapp || '',
        instagram: config.instagram || '',
      })
    }
  }, [config])

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (config) {
        // Atualizar
        const { error } = await supabase
          .from('configuracoes')
          .update(data)
          .eq('id', config.id)
        
        if (error) throw error
      } else {
        // Criar
        const { error } = await supabase
          .from('configuracoes')
          .insert([data])
        
        if (error) throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-configuracoes'])
      queryClient.invalidateQueries(['configuracoes'])
      alert('Configurações salvas com sucesso!')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    saveMutation.mutate(formData)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurações da Loja</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome da Loja */}
        <div>
          <label htmlFor="nome_loja" className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Loja *
          </label>
          <input
            id="nome_loja"
            type="text"
            required
            value={formData.nome_loja}
            onChange={(e) => setFormData({ ...formData, nome_loja: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Minha Loja Incrível"
          />
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="descricao_loja" className="block text-sm font-medium text-gray-700 mb-2">
            Descrição da Loja
          </label>
          <textarea
            id="descricao_loja"
            rows={3}
            value={formData.descricao_loja}
            onChange={(e) => setFormData({ ...formData, descricao_loja: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Encontre os melhores produtos com qualidade e preço justo"
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp (com código do país) *
          </label>
          <input
            id="whatsapp"
            type="text"
            required
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="5511999999999"
          />
          <p className="mt-1 text-sm text-gray-500">
            Exemplo: 5511999999999 (código do país + DDD + número)
          </p>
        </div>

        {/* Instagram */}
        <div>
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
            Link do Instagram
          </label>
          <input
            id="instagram"
            type="url"
            value={formData.instagram}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="https://instagram.com/minhaloja"
          />
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {saveMutation.isPending ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Salvar Configurações</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
