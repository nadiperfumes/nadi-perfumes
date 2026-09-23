export default function Hero({ config }) {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {config?.nome_loja || 'Bem-vindo à Nossa Loja'}
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
            {config?.descricao_loja || 'Encontre os melhores produtos com qualidade e preço justo'}
          </p>
        </div>
      </div>
    </section>
  )
}
