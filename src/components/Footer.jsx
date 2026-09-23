import { InstagramLogo, Phone, Heart } from '@phosphor-icons/react'

export default function Footer({ config }) {
  return (
    <footer className="bg-green-deep text-green-pale">
      {/* Linha dourada no topo */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Logo e descrição */}
          <div>
            <img
              src="/logo.png"
              alt="Nadi Perfumes"
              className="w-24 mb-5"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-green-pale/70 text-sm leading-relaxed font-sans font-light max-w-[240px]">
              {config?.descricao_loja || 'Fragrâncias que contam histórias e marcam momentos especiais.'}
            </p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-5">Contato</h4>
            <div className="space-y-4">
              {config?.whatsapp && (
                <a
                  href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-green-pale/70 hover:text-gold transition-colors duration-300 text-sm font-sans"
                >
                  <Phone size={16} />
                  <span>{config.whatsapp}</span>
                </a>
              )}
              {config?.instagram && (
                <a
                  href={config.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-green-pale/70 hover:text-gold transition-colors duration-300 text-sm font-sans"
                >
                  <InstagramLogo size={16} />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>

          {/* Redes sociais */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-5">Siga-nos</h4>
            <div className="flex gap-4">
              {config?.instagram && (
                <a
                  href={config.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-green-pale/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300 text-green-pale/70"
                >
                  <InstagramLogo size={18} />
                </a>
              )}
              {config?.whatsapp && (
                <a
                  href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-green-pale/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300 text-green-pale/70"
                >
                  <Phone size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-green-pale/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-green-pale/40 text-xs font-sans">
            &copy; {new Date().getFullYear()} {config?.nome_loja || 'Nadi Perfumes'}. Todos os direitos reservados.
          </p>
          <p className="text-green-pale/40 text-xs font-sans flex items-center gap-1">
            Feito com <Heart size={12} className="text-gold" /> com amor
          </p>
        </div>
      </div>
    </footer>
  )
}
