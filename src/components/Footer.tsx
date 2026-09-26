import React from 'react';

interface FooterProps {
  onOpenGuidelines?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuidelines }) => {
  return (
    <footer className="w-full bg-[#eff4ff] border-t border-[#e5eeff] mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="font-bold text-[15px] text-[#a20513]">
            FATEC <span className="text-[#0b1c30] font-normal">Voz do Aluno</span>
          </span>
          <span className="text-[#5b403d] text-[13px]">
            © 2025 Plataforma Colaborativa Universitária
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 text-[12px] font-semibold text-[#5b403d]">
          <button
            onClick={onOpenGuidelines}
            className="hover:text-[#0b1c30] transition-colors cursor-pointer"
          >
            Diretrizes da Comunidade
          </button>
          <button
            onClick={onOpenGuidelines}
            className="hover:text-[#0b1c30] transition-colors cursor-pointer"
          >
            Código de Ética
          </button>
          <a
            href="mailto:ouvidoria@cps.sp.gov.br"
            className="hover:text-[#0b1c30] transition-colors"
          >
            Suporte do Aluno
          </a>
        </div>
      </div>
    </footer>
  );
};
