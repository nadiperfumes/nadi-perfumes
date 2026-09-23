import { Instagram, Phone, Mail } from 'lucide-react'

export default function Footer({ config }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-xl font-bold mb-4">{config?.nome_loja || 'Minha Loja'}</h3>
            <p className="text-gray-400">
              {config?.descricao_loja || 'Os melhores produtos você encontra aqui!'}
            </p>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              {config?.whatsapp && (
                <a
                  href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
                >
                  <Phone className="w-5 h-5" />
                  <span>{config.whatsapp}</span>
                </a>
              )}
              {config?.instagram && (
                <a
                  href={config.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-xl font-bold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              {config?.instagram && (
                <a
                  href={config.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {config?.whatsapp && (
                <a
                  href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-green-600 transition"
                >
                  <Phone className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {config?.nome_loja || 'Minha Loja'}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
