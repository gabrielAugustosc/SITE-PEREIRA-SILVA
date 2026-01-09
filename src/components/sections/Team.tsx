import { Linkedin, Instagram } from 'lucide-react';
import { ImagemDeSeguranca } from '../common/ImagemDeSeguranca';
import { teamMembers } from '../../data/team';


export function Team() {
  return (
    <section id="team" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#5E0D13] mb-3 sm:mb-4">
            Advogados
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#AC8B57] mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm xs:text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Profissionais altamente qualificados e comprometidos com a excelência jurídica.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group rounded-lg overflow-hidden border-2 border-[#AC8B57]/20 hover:border-[#AC8B57] hover:shadow-xl transition-all bg-gradient-to-br from-[#5E0D13] to-[#2E0506]"
            >
              {/* Image Container */}
              <div className="relative h-56 xs:h-64 sm:h-72 md:h-80 overflow-hidden">
                <ImagemDeSeguranca
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-[center_20%] group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E0506] via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Content */}
              <div className="p-3 xs:p-4 sm:p-5 md:p-6 bg-gradient-to-br from-[#5E0D13] to-[#2E0506]">
                <h3 className="text-base xs:text-lg sm:text-xl text-[#DCC48F] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#AC8B57] mb-2">{member.role}</p>
                <div className="text-[#DCC48F]/80 text-sm mb-3">
                  {Array.isArray(member.specialty) ? (
                    member.specialty.map((spec, i) => (
                      <div key={i}>{spec}</div>
                    ))
                  ) : (
                    member.specialty
                  )}
                </div>
                <p className="text-[#DCC48F]/70 text-sm mb-4">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-3">
                  {member.socials.linkedin && (
                    <a 
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#AC8B57] hover:bg-[#DCC48F] text-[#2E0506] p-2 rounded transition-colors inline-flex items-center justify-center"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a 
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#AC8B57] hover:bg-[#DCC48F] text-[#2E0506] p-2 rounded transition-colors inline-flex items-center justify-center"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Description */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed">
            Nossa equipe é formada por advogados com sólida formação acadêmica e vasta experiência prática. 
            Estamos constantemente nos atualizando sobre as mudanças legislativas e jurisprudenciais 
            para oferecer o melhor serviço aos nossos clientes.
          </p>
        </div>
      </div>
    </section>
  );
}
