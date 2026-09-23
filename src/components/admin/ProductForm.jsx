import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { X, Upload, Loader, Eye, EyeOff, Trash2 } from 'lucide-react'

export default function ProductForm({ produto, onClose }) {
  const [formData, setFormData] = useState({
    nome: produto?.nome || '',
    descricao: produto?.descricao || '',
    preco: produto?.preco || '',
    categoria: produto?.categoria || '',
    ativo: produto?.ativo ?? true,
    ordem: produto?.ordem || 0,
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(produto?.imagem_url || '')
  const [uploading, setUploading] = useState(false)
  const queryClient = useQueryClient()

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      let imagemUrl = produto?.imagem_url || ''

      // Upload da imagem se houver
      if (imageFile) {
        setUploading(true)
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `produtos/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('produtos-imagens')
          .upload(filePath, imageFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('produtos-imagens')
          .getPublicUrl(filePath)

        imagemUrl = publicUrl
        setUploading(false)
      }

      const produtoData = {
        ...data,
        imagem_url: imagemUrl,
        preco: parseFloat(data.preco),
      }

      if (produto) {
        // Atualizar
        const { error } = await supabase
          .from('produtos')
          .update(produtoData)
          .eq('id', produto.id)
        
        if (error) throw error
      } else {
        // Criar
        const { error } = await supabase
          .from('produtos')
          .insert([produtoData])
        
        if (error) throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-produtos'])
      queryClient.invalidateQueries(['produtos'])
      onClose()
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
      queryClient.invalidateQueries(['produtos'])
      onClose()
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
      queryClient.invalidateQueries(['produtos'])
      // Atualizar formData localmente
      setFormData(prev => ({ ...prev, ativo: !prev.ativo }))
    },
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    saveMutation.mutate(formData)
  }

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
      deleteMutation.mutate(produto.id)
    }
  }

  const handleToggleActive = () => {
    toggleActiveMutation.mutate({ id: produto.id, ativo: formData.ativo })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {produto ? 'Editar Produto' : 'Novo Produto'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Imagem */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagem do Produto
          </label>
          <div className="flex items-center space-x-4">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            )}
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Escolher Imagem</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Nome */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
            Nome *
          </label>
          <input
            id="nome"
            type="text"
            required
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            id="descricao"
            rows={3}
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Preço e Categoria */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-2">
              Preço (R$) *
            </label>
            <input
              id="preco"
              type="number"
              step="0.01"
              required
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <input
              id="categoria"
              type="text"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Ordem e Ativo */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ordem" className="block text-sm font-medium text-gray-700 mb-2">
              Ordem de Exibição
            </label>
            <input
              id="ordem"
              type="number"
              value={formData.ordem}
              onChange={(e) => setFormData({ ...formData, ordem: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.ativo}
                onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700">Produto ativo</span>
            </label>
          </div>
        </div>

        {/* Botões */}
        <div className="space-y-4 pt-4">
          {/* Botões de Ação Principais */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saveMutation.isPending || uploading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {(saveMutation.isPending || uploading) && <Loader className="w-4 h-4 animate-spin" />}
              <span>{produto ? 'Atualizar' : 'Criar'}</span>
            </button>
          </div>

          {/* Botões de Ocultar e Excluir (apenas para produtos existentes) */}
          {produto && (
            <div className="flex justify-between items-center pt-4 border-t">
              <button
                type="button"
                onClick={handleToggleActive}
                disabled={toggleActiveMutation.isPending}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition disabled:opacity-50 ${
                  formData.ativo
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {formData.ativo ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                <span>{formData.ativo ? 'Ocultar Produto' : 'Mostrar Produto'}</span>
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
              >
                {deleteMutation.isPending ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
                <span>Excluir Produto</span>
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
