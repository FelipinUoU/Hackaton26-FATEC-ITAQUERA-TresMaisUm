import React, { useState } from 'react';
import { Post } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Omit<Post, 'id' | 'timeAgo' | 'upvotes' | 'commentCount'>) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'code' | 'siga'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagCategory, setTagCategory] = useState('#ads');
  const [tagCategoryType, setTagCategoryType] = useState('[Projeto Integrador]');
  const [hasCode, setHasCode] = useState(false);
  const [codeFileName, setCodeFileName] = useState('');
  const [codeContent, setCodeContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      authorName: 'Lucas Mendonça',
      authorEmail: 'lucas.mendonca@alunos.cps.sp.gov.br',
      authorCampus: 'Fatec SP',
      isVerified: true,
      tagCategory,
      tagCategoryType,
      title,
      content,
      codeSnippet: hasCode && codeContent ? {
        filename: codeFileName || 'Solution.ts',
        language: 'typescript',
        code: codeContent,
      } : undefined,
      imageUrl: imageUrl.trim() || undefined,
      imageCaption: imageUrl.trim() ? 'Anexo da Comunidade' : undefined,
    });

    // Reset and close
    setTitle('');
    setContent('');
    setCodeFileName('');
    setCodeContent('');
    setImageUrl('');
    setHasCode(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e5eeff] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#eff4ff] border-b border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#a20513] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">edit_note</span>
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-[#0b1c30]">Criar Nova Discussão</h3>
              <p className="text-[12px] text-[#425064]">
                Compartilhe dúvidas, soluções ou projetos com a rede FATEC
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5b403d] hover:bg-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-4">
          {/* Post Type Selector */}
          <div className="flex items-center gap-2 p-1 bg-[#f8f9ff] rounded-xl border border-[#e5eeff]">
            <button
              type="button"
              onClick={() => {
                setActiveTab('text');
                setTagCategoryType('[Discussão Geral]');
              }}
              className={`flex-1 py-2 rounded-lg text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-white text-[#a20513] shadow-xs'
                  : 'text-[#425064] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">article</span>
              Texto & Dúvida
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('code');
                setHasCode(true);
                setTagCategoryType('[Projeto Integrador]');
              }}
              className={`flex-1 py-2 rounded-lg text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-white text-[#4059aa] shadow-xs'
                  : 'text-[#425064] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">code_blocks</span>
              Snippet Código
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('siga');
                setTagCategoryType('[Dúvida SIGA]');
              }}
              className={`flex-1 py-2 rounded-lg text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'siga'
                  ? 'bg-white text-[#a20513] shadow-xs'
                  : 'text-[#425064] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">help_center</span>
              Pergunta SIGA / PI
            </button>
          </div>

          {/* Categorization Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
                Curso / Hub
              </label>
              <select
                value={tagCategory}
                onChange={(e) => setTagCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#a20513]/20"
              >
                <option value="#ads">#ads - Análise e Desenv. Sistemas</option>
                <option value="#dsm">#dsm - Desenv. Software Multiplataforma</option>
                <option value="#ge">#ge - Gestão Empresarial</option>
                <option value="#bd">#bd - Banco de Dados</option>
                <option value="#vagas">#vagas - Oportunidades & Estágio</option>
                <option value="#institucional">#institucional - Secretaria & SIGA</option>
                <option value="#pesquisa">#pesquisa - TCC & Iniciação Científica</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
                Tipo do Tópico
              </label>
              <input
                type="text"
                value={tagCategoryType}
                onChange={(e) => setTagCategoryType(e.target.value)}
                placeholder="Ex: [Projeto Integrador], [Dúvida SIGA]"
                className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#a20513]/20"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
              Título da Discussão *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Descreva claramente o assunto ou problema..."
              className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[14px] text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#a20513]/20"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
              Explicação Detalhada *
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Explique o contexto, passos executados, semestre atual e qual ajuda procura..."
              className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#a20513]/20 resize-none"
            />
          </div>

          {/* Code Section */}
          {(activeTab === 'code' || hasCode) && (
            <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#dce9ff] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#0b1c30] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#4059aa]">terminal</span>
                  Trecho de Código ou Configuração
                </span>
                <input
                  type="text"
                  value={codeFileName}
                  onChange={(e) => setCodeFileName(e.target.value)}
                  placeholder="Nome do arquivo (ex: SecurityConfig.java)"
                  className="px-2.5 py-1 bg-white border border-[#dce9ff] rounded-lg text-[11px] font-mono text-[#0b1c30]"
                />
              </div>
              <textarea
                rows={4}
                value={codeContent}
                onChange={(e) => setCodeContent(e.target.value)}
                placeholder="// Cole seu código aqui..."
                className="w-full p-2.5 bg-[#213145] text-[#eaf1ff] font-mono text-[12px] rounded-lg focus:outline-none resize-none"
              />
            </div>
          )}

          {/* Optional Image URL */}
          <div>
            <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
              Link de Imagem / Anexo (Opcional)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.png ou link do print"
              className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#a20513]/20"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-[#e5eeff] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[13px] font-semibold text-[#425064] hover:bg-[#eff4ff] transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#a20513] hover:bg-[#c62828] text-white text-[13px] font-bold shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              Publicar Discussão
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
