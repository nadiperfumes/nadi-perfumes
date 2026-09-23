import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import ProductForm from './ProductForm'

export default function ProductsManager() {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const queryClient = useQueryClient()

  const { data: produtos, isLoading } = useQuery({
    queryKey: ['admin-produtos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .order('ordem', { ascending: true })
      
      if (error) throw error
      return data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('produtos')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-produtos'])
    },
  })

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, ativo }) => {
      const { error } = await supabase
        .from('produtos')
        .update({ ativo: !ativo })
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-produtos'])
    },
  })

  const handleEdit = (produto) => {
    setEditingProduct(produto)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  if (showForm) {
    return <ProductForm produto={editingProduct} onClose={handleCloseForm} />
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Produtos</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Novo Produto</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : produtos && produtos.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {produto.imagem_url ? (
                          <img
                            className="h-10 w-10 rounded object-cover"
                            src={produto.imagem_url}
                            alt={produto.nome}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded bg-gray-200"></div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{produto.categoria || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">R$ {produto.preco.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        produto.ativo
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {produto.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => toggleActiveMutation.mutate({ id: produto.id, ativo: produto.ativo })}
                        className="text-gray-600 hover:text-indigo-600 transition"
                        title={produto.ativo ? 'Desativar' : 'Ativar'}
                      >
                        {produto.ativo ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => handleEdit(produto)}
                        className="text-indigo-600 hover:text-indigo-900 transition"
                        title="Editar"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(produto.id)}
                        className="text-red-600 hover:text-red-900 transition"
                        title="Excluir"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Criar primeiro produto
          </button>
        </div>
      )}
    </div>
  )
}
