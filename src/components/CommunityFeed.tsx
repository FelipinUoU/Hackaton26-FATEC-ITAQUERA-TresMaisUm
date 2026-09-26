import React, { useState } from 'react';
import { Post, NavTab } from '../types';

interface CommunityFeedProps {
  posts: Post[];
  onOpenCreatePostModal: () => void;
  onSelectPost: (post: Post) => void;
  onVotePost: (postId: string, dir: 'up' | 'down') => void;
  onToggleSavePost: (postId: string) => void;
  onSelectTab: (tab: NavTab) => void;
  searchFilter: string;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  posts,
  onOpenCreatePostModal,
  onSelectPost,
  onVotePost,
  onToggleSavePost,
  onSelectTab,
  searchFilter,
}) => {
  const [feedFilter, setFeedFilter] = useState<'hot' | 'recent' | 'top' | 'saved' | 'solved'>('hot');
  const [courseFilter, setCourseFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Copy code helper
  const handleCopyCode = (id: string, code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (feedFilter === 'saved' && !post.isSaved) return false;
    if (feedFilter === 'solved' && !post.isResolved) return false;
    if (courseFilter !== 'all') {
      if (courseFilter === 'ads' && !post.tagCategory.includes('ads')) return false;
      if (courseFilter === 'dsm' && !post.tagCategory.includes('dsm')) return false;
      if (courseFilter === 'ge' && !post.tagCategory.includes('ge')) return false;
    }
    if (tagFilter && !post.title.toLowerCase().includes(tagFilter.toLowerCase().replace('#', '')) && !post.tagCategory.toLowerCase().includes(tagFilter.toLowerCase())) {
      return false;
    }
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.authorName.toLowerCase().includes(q) ||
        post.tagCategory.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (feedFilter === 'recent') return b.id.localeCompare(a.id);
    if (feedFilter === 'top') return b.upvotes - a.upvotes;
    return 0; // default hot
  });

  return (
    <div className="flex flex-col w-full">
      {/* Dynamic Notification Bar / Academic Announcement */}
      <div className="w-full bg-[#eff4ff] text-[#0b1c30] py-2.5 px-4 sm:px-6 border-b border-[#dce9ff]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#a20513] text-white text-[11px] font-bold">
              !
            </span>
            <span className="font-bold text-[#a20513]">Aviso Geral CPS:</span>
            <span className="text-[#425064]">
              Inscrições abertas para a Maratona Inter-FATECs de Programação 2025/1. Submeta seu squad até 28/Março.
            </span>
          </div>
          <button
            onClick={() => onSelectTab('calendario')}
            className="hidden md:inline-flex items-center gap-1 text-[12px] font-bold text-[#a20513] hover:underline cursor-pointer"
          >
            Ver edital completo
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Primary Workspace Layout (3 Columns) */}
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-12 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR: Navigational Directory & Academic Hubs (Spans 3 cols) */}
          <aside className="hidden lg:flex lg:col-span-3 flex-col gap-5 sticky top-20">
            {/* Feeds Filter Group */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e5eeff]">
              <div className="flex items-center justify-between px-2 mb-3">
                <span className="text-[11px] font-bold text-[#5b403d] uppercase tracking-wider">
                  Navegação Principal
                </span>
                <span className="w-2 h-2 rounded-full bg-[#a20513]" />
              </div>
              <nav className="flex flex-col space-y-1">
                <button
                  onClick={() => {
                    setFeedFilter('hot');
                    setTagFilter(null);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-[13px] transition-all cursor-pointer ${
                    feedFilter === 'hot' && !tagFilter
                      ? 'bg-[#eff4ff] text-[#a20513]'
                      : 'text-[#425064] hover:bg-[#f8f9ff] hover:text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-[#a20513]">
                      local_fire_department
                    </span>
                    <span>Em Alta</span>
                  </div>
                  <span className="text-[11px] bg-[#ffdad6] text-[#a20513] px-2 py-0.5 rounded-full font-bold">
                    24+
                  </span>
                </button>

                <button
                  onClick={() => {
                    setFeedFilter('recent');
                    setTagFilter(null);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-[13px] transition-all cursor-pointer ${
                    feedFilter === 'recent'
                      ? 'bg-[#eff4ff] text-[#a20513]'
                      : 'text-[#425064] hover:bg-[#f8f9ff] hover:text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                    <span>Mais Recentes</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setFeedFilter('solved');
                    setTagFilter(null);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-[13px] transition-all cursor-pointer ${
                    feedFilter === 'solved'
                      ? 'bg-[#eff4ff] text-[#a20513]'
                      : 'text-[#425064] hover:bg-[#f8f9ff] hover:text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-[#4059aa]">
                      check_circle
                    </span>
                    <span>Dúvidas Resolvidas</span>
                  </div>
                  <span className="text-[11px] text-[#4059aa] font-bold">98.2%</span>
                </button>

                <button
                  onClick={() => {
                    setFeedFilter('saved');
                    setTagFilter(null);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-[13px] transition-all cursor-pointer ${
                    feedFilter === 'saved'
                      ? 'bg-[#eff4ff] text-[#a20513]'
                      : 'text-[#425064] hover:bg-[#f8f9ff] hover:text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">bookmark</span>
                    <span>Itens Salvos</span>
                  </div>
                </button>
              </nav>
            </div>

            {/* Cursos & Áreas da FATEC */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e5eeff]">
              <div className="flex items-center justify-between px-2 mb-3">
                <span className="text-[11px] font-bold text-[#5b403d] uppercase tracking-wider">
                  Cursos & Diretórios
                </span>
                <button
                  onClick={() => onSelectTab('cursos')}
                  className="text-[11px] font-bold text-[#4059aa] hover:underline cursor-pointer"
                >
                  Ver todos
                </button>
              </div>
              <div className="flex flex-col space-y-1">
                {[
                  { tag: '#ads', name: 'ADS • Análise e Des. de Sist.', count: '1.4k', color: 'bg-[#a20513]' },
                  { tag: '#dsm', name: 'DSM • Desenv. de Soft. Multi.', count: '920', color: 'bg-[#4059aa]' },
                  { tag: '#ge', name: 'Gestão Empresarial', count: '745', color: 'bg-[#425064]' },
                  { tag: '#bd', name: 'Banco de Dados', count: '512', color: 'bg-[#8fa7fe]' },
                  { tag: '#rc', name: 'Redes de Computadores', count: '388', color: 'bg-[#8f706c]' },
                ].map((c) => (
                  <button
                    key={c.tag}
                    onClick={() => {
                      setTagFilter(tagFilter === c.tag ? null : c.tag);
                    }}
                    className={`group flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer text-left ${
                      tagFilter === c.tag ? 'bg-[#eff4ff]' : 'hover:bg-[#f8f9ff]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full ${c.color} shrink-0`} />
                      <span className="text-[12px] font-semibold text-[#0b1c30] truncate group-hover:text-[#a20513]">
                        {c.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#5b403d] font-mono">{c.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Campi Populares */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e5eeff]">
              <div className="flex items-center justify-between px-2 mb-3">
                <span className="text-[11px] font-bold text-[#5b403d] uppercase tracking-wider">
                  Campi em Destaque
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#5b403d]">domain</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { code: 'SP', name: 'Fatec SP - Bom Retiro', desc: 'Sede Matriz • 3.2k membros', color: 'text-[#a20513]' },
                  { code: 'SO', name: 'Fatec Sorocaba', desc: 'Campus Regional • 1.8k membros', color: 'text-[#4059aa]' },
                  { code: 'SC', name: 'Fatec São Caetano do Sul', desc: 'Polo Tecnológico • 1.1k membros', color: 'text-[#425064]' },
                ].map((camp) => (
                  <div
                    key={camp.code}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#eff4ff] text-[#0b1c30] transition-colors cursor-pointer"
                  >
                    <span className={`w-7 h-7 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[11px] font-extrabold ${camp.color}`}>
                      {camp.code}
                    </span>
                    <div className="flex flex-col min-w-0 text-left">
                      <span className="text-[12px] font-bold truncate leading-tight">{camp.name}</span>
                      <span className="text-[10px] text-[#5b403d] truncate mt-0.5">{camp.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Institucionais & SIGA */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e5eeff]">
              <span className="text-[11px] font-bold text-[#5b403d] uppercase tracking-wider px-2 block mb-3">
                Recursos & SIGA
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectTab('calendario')}
                  className="flex items-center gap-2 p-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors text-[#0b1c30] text-[11px] font-semibold text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#a20513] text-[18px]">calendar_month</span>
                  <span className="truncate">Calendário</span>
                </button>
                <a
                  href="https://siga.cps.sp.gov.br"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors text-[#0b1c30] text-[11px] font-semibold text-left"
                >
                  <span className="material-symbols-outlined text-[#4059aa] text-[18px]">school</span>
                  <span className="truncate">Acesso SIGA</span>
                </a>
                <button
                  onClick={() => onSelectTab('cursos')}
                  className="flex items-center gap-2 p-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors text-[#0b1c30] text-[11px] font-semibold text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#425064] text-[18px]">menu_book</span>
                  <span className="truncate">Guia Aluno</span>
                </button>
                <a
                  href="https://www.cps.sp.gov.br"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors text-[#0b1c30] text-[11px] font-semibold text-left"
                >
                  <span className="material-symbols-outlined text-[#5b403d] text-[18px]">gavel</span>
                  <span className="truncate">Regras CPS</span>
                </a>
              </div>
            </div>
          </aside>

          {/* CENTRAL FEED: Academic Discussion Stream (Spans 6 cols) */}
          <main className="col-span-1 lg:col-span-6 flex flex-col gap-4">
            
            {/* Quick Post Composer */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e5eeff]">
              <div className="flex items-center gap-3 pb-3">
                <div className="w-10 h-10 rounded-full bg-[#a20513] flex items-center justify-center text-white shrink-0 shadow-xs font-bold text-[13px]">
                  LM
                </div>
                <button
                  onClick={onOpenCreatePostModal}
                  className="w-full text-left bg-[#eff4ff] hover:bg-[#dce9ff]/70 text-[#5b403d] rounded-full px-4 py-2.5 text-[13px] transition-colors flex items-center justify-between cursor-pointer border border-[#dce9ff]"
                >
                  <span>Criar nova discussão, dúvida ou compartilhar projeto...</span>
                  <span className="material-symbols-outlined text-[18px] text-[#5b403d]">edit_note</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#eff4ff] flex-wrap gap-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={onOpenCreatePostModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#eff4ff] text-[#425064] hover:text-[#0b1c30] text-[12px] font-semibold transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[#a20513] text-[18px]">article</span>
                    <span>Texto</span>
                  </button>
                  <button
                    onClick={onOpenCreatePostModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#eff4ff] text-[#425064] hover:text-[#0b1c30] text-[12px] font-semibold transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[#4059aa] text-[18px]">code_blocks</span>
                    <span>Snippet Código</span>
                  </button>
                  <button
                    onClick={onOpenCreatePostModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#eff4ff] text-[#425064] hover:text-[#0b1c30] text-[12px] font-semibold transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[#425064] text-[18px]">help_center</span>
                    <span>Pergunta SIGA/PI</span>
                  </button>
                </div>
                <button
                  onClick={onOpenCreatePostModal}
                  className="bg-[#a20513] hover:bg-[#c62828] text-white px-4 py-1.5 rounded-full text-[12px] font-bold transition-colors shadow-xs cursor-pointer ml-auto"
                >
                  Publicar
                </button>
              </div>
            </div>

            {/* Filter & Sorting Bar */}
            <div className="bg-white rounded-2xl px-4 py-2.5 shadow-xs border border-[#e5eeff] flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setFeedFilter('hot')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold cursor-pointer transition-all ${
                    feedFilter === 'hot'
                      ? 'bg-[#a20513] text-white shadow-xs'
                      : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                  <span>Em Alta</span>
                </button>
                <button
                  onClick={() => setFeedFilter('recent')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold cursor-pointer transition-all ${
                    feedFilter === 'recent'
                      ? 'bg-[#a20513] text-white shadow-xs'
                      : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>Mais Recentes</span>
                </button>
                <button
                  onClick={() => setFeedFilter('top')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold cursor-pointer transition-all ${
                    feedFilter === 'top'
                      ? 'bg-[#a20513] text-white shadow-xs'
                      : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  <span>Mais Votados</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-[#5b403d]">Semestre:</span>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="bg-[#eff4ff] text-[#0b1c30] text-[12px] font-bold rounded-lg px-2.5 py-1 focus:outline-none border border-[#dce9ff] cursor-pointer"
                >
                  <option value="all">Todos os Cursos</option>
                  <option value="ads">Apenas ADS</option>
                  <option value="dsm">Apenas DSM</option>
                  <option value="ge">Apenas Gestão</option>
                </select>
              </div>
            </div>

            {/* Posts List */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-[#e5eeff]">
                <span className="material-symbols-outlined text-[40px] text-[#5b403d] mb-2">
                  search_off
                </span>
                <p className="text-[15px] font-bold text-[#0b1c30]">
                  Nenhuma discussão encontrada
                </p>
                <p className="text-[13px] text-[#425064] mt-1">
                  Tente alterar seus filtros ou seja o primeiro a publicar sobre este assunto.
                </p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => onSelectPost(post)}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e5eeff] transition-all hover:shadow-md cursor-pointer group"
                >
                  <div className="flex gap-3 sm:gap-4 items-start">
                    {/* Voting Pill */}
                    <div
                      className="flex flex-col items-center bg-[#eff4ff] rounded-full px-1.5 py-2 shrink-0 border border-[#dce9ff]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onVotePost(post.id, 'up')}
                        aria-label="Upvote"
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                          post.userVote === 'up'
                            ? 'text-[#a20513] bg-[#ffdad6]'
                            : 'text-[#5b403d] hover:text-[#a20513] hover:bg-[#ffdad6]/40'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">keyboard_arrow_up</span>
                      </button>
                      <span className="text-[13px] font-bold text-[#a20513] my-0.5">
                        {post.upvotes}
                      </span>
                      <button
                        onClick={() => onVotePost(post.id, 'down')}
                        aria-label="Downvote"
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                          post.userVote === 'down'
                            ? 'text-[#4059aa] bg-[#dce1ff]'
                            : 'text-[#5b403d] hover:text-[#4059aa] hover:bg-[#dce1ff]/40'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
                      </button>
                    </div>

                    {/* Thread Content */}
                    <div className="flex-1 min-w-0">
                      {/* Meta Header */}
                      <div className="flex items-center flex-wrap gap-2 mb-2 text-[11px] font-semibold">
                        <span className="bg-[#4059aa]/10 text-[#4059aa] px-2.5 py-0.5 rounded-full font-bold">
                          {post.tagCategory}
                        </span>
                        <span className="bg-[#eff4ff] text-[#a20513] font-bold px-2 py-0.5 rounded-md">
                          {post.tagCategoryType}
                        </span>
                        <span className="text-[#5b403d]">•</span>
                        <span className="text-[#0b1c30] font-medium">{post.authorEmail}</span>
                        {post.isVerified && (
                          <span className="inline-flex items-center text-[#4059aa] gap-0.5" title="Aluno Verificado">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            <span className="text-[10px] uppercase font-bold">{post.authorCampus}</span>
                          </span>
                        )}
                        <span className="text-[#5b403d]">• {post.timeAgo}</span>
                      </div>

                      {/* Headline */}
                      <h2 className="text-[15px] sm:text-[16px] text-[#0b1c30] font-bold group-hover:text-[#a20513] transition-colors leading-snug mb-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-[13px] text-[#425064] mb-3 leading-relaxed line-clamp-3">
                        {post.content}
                      </p>

                      {/* Code Preview Component if available */}
                      {post.codeSnippet && (
                        <div
                          className="bg-[#eff4ff] rounded-xl p-3 my-3 overflow-x-auto text-[12px] font-mono text-[#0b1c30] border border-[#dce9ff]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="text-[#5b403d] pb-1 font-sans font-semibold text-[11px] flex justify-between items-center">
                            <span>{post.codeSnippet.filename}</span>
                            <button
                              onClick={(e) => handleCopyCode(post.id, post.codeSnippet!.code, e)}
                              className="text-[#4059aa] cursor-pointer hover:underline flex items-center gap-1 font-sans"
                            >
                              <span className="material-symbols-outlined text-[13px]">
                                {copiedCodeId === post.id ? 'check' : 'content_copy'}
                              </span>
                              {copiedCodeId === post.id ? 'Copiado!' : 'Copiar código'}
                            </button>
                          </div>
                          <pre className="text-[11.5px] leading-relaxed whitespace-pre font-mono">
                            <code>{post.codeSnippet.code}</code>
                          </pre>
                        </div>
                      )}

                      {/* Image Preview if available */}
                      {post.imageUrl && (
                        <div className="rounded-xl overflow-hidden mb-3 max-h-72 w-full bg-[#eff4ff] relative border border-[#e5eeff]">
                          <img
                            src={post.imageUrl}
                            alt={post.imageAlt || post.title}
                            className="w-full h-56 object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {post.imageCaption && (
                            <div className="absolute bottom-2 left-2 bg-[#213145]/85 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[11px] font-bold">
                              {post.imageCaption}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Moderation Tip Callout if available */}
                      {post.moderationTip && (
                        <div className="bg-[#eff4ff] rounded-xl p-3 my-2 flex items-start gap-2.5 border border-[#dce9ff]">
                          <span className="material-symbols-outlined text-[#a20513] text-[18px] shrink-0">
                            lightbulb
                          </span>
                          <div className="text-[12px] text-[#0b1c30]">
                            <span className="font-bold text-[#a20513]">Dica da moderação: </span>
                            {post.moderationTip.replace('Dica da moderação: ', '')}
                          </div>
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="flex items-center gap-3 sm:gap-4 text-[#5b403d] text-[12px] font-semibold pt-2">
                        <span className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded-full text-[#0b1c30]">
                          <span className="material-symbols-outlined text-[17px] text-[#4059aa]">
                            chat_bubble_outline
                          </span>
                          <span>{post.commentCount} respostas</span>
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (navigator.share) {
                              navigator.share({ title: post.title, text: post.content, url: window.location.href });
                            } else {
                              navigator.clipboard.writeText(window.location.href);
                              alert('Link da discussão copiado!');
                            }
                          }}
                          className="flex items-center gap-1 hover:text-[#a20513] transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[17px]">share</span>
                          <span className="hidden sm:inline">Compartilhar</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSavePost(post.id);
                          }}
                          className={`flex items-center gap-1 transition-colors cursor-pointer ${
                            post.isSaved ? 'text-[#a20513]' : 'hover:text-[#a20513]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[17px]">
                            {post.isSaved ? 'bookmark' : 'bookmark_border'}
                          </span>
                          <span className="hidden sm:inline">{post.isSaved ? 'Salvo' : 'Salvar'}</span>
                        </button>

                        {post.isResolved && (
                          <span className="ml-auto text-[#0b1c30] text-[11px] bg-[#e5eeff] px-2.5 py-0.5 rounded-full font-bold">
                            Resolvida ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}

            {/* Load More Button */}
            <div className="text-center py-4">
              <button
                onClick={onOpenCreatePostModal}
                className="px-6 py-2.5 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-[13px] font-bold rounded-full transition-colors shadow-2xs border border-[#dce9ff] cursor-pointer"
              >
                Carregar mais discussões acadêmicas
              </button>
            </div>
          </main>

          {/* RIGHT SIDEBAR: Community Stats, CPS Calendar, Trending Tags (Spans 3 cols) */}
          <aside className="col-span-1 lg:col-span-3 flex flex-col gap-5 sticky top-20">
            {/* Card: Sobre a Plataforma */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e5eeff]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#a20513] flex items-center justify-center text-white shadow-xs shrink-0">
                  <span className="material-symbols-outlined text-[24px]">forum</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#0b1c30] leading-tight">
                    FATEC Voz do Fatecano
                  </h3>
                  <p className="text-[10px] text-[#a20513] uppercase font-extrabold tracking-wider">
                    Rede Acadêmica Oficial
                  </p>
                </div>
              </div>

              <p className="text-[12px] text-[#425064] mb-4 leading-relaxed">
                Espaço colaborativo independente criado para conectar alunos, pesquisadores e ex-alunos de todas as unidades FATEC do Estado de São Paulo.
              </p>

              {/* Metrics Bento Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4 bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff]">
                <div>
                  <div className="text-[18px] text-[#a20513] font-extrabold font-mono">14.8k</div>
                  <div className="text-[11px] text-[#5b403d] font-semibold">Alunos Ativos</div>
                </div>
                <div>
                  <div className="text-[18px] text-[#4059aa] font-extrabold font-mono">78</div>
                  <div className="text-[11px] text-[#5b403d] font-semibold">Campi FATEC</div>
                </div>
              </div>

              {/* Institutional Micro Badge */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#eff4ff] text-[#0b1c30] text-[12px] border border-[#dce9ff]">
                <span className="material-symbols-outlined text-[#4059aa] text-[18px]">verified_user</span>
                <span>Acesso autenticado via <strong className="text-[#0b1c30]">@alunos.cps.sp.gov.br</strong></span>
              </div>

              <div className="mt-4 pt-3 border-t border-[#eff4ff] flex flex-col gap-2">
                <button
                  onClick={onOpenCreatePostModal}
                  className="w-full bg-[#a20513] hover:bg-[#c62828] text-white py-2 rounded-xl text-[12px] font-bold transition-colors shadow-xs cursor-pointer"
                >
                  Criar Tópico de Discussão
                </button>
                <a
                  href="#regras"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Regras de convivência FATEC: Respeito mútuo, colaboração aberta em projetos, respeito à integridade acadêmica e código de honra do CPS.');
                  }}
                  className="w-full text-center text-[#5b403d] hover:text-[#0b1c30] py-1 text-[11px] font-semibold transition-colors"
                >
                  Ler Regras de Convivência
                </a>
              </div>
            </div>

            {/* Academic Calendar & Deadlines (CPS) */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e5eeff]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#eff4ff]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#a20513] text-[20px]">event_note</span>
                  <h4 className="text-[14px] font-bold text-[#0b1c30]">Prazos & Calendário</h4>
                </div>
                <span className="text-[11px] text-[#a20513] font-bold">2025/1</span>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => onSelectTab('calendario')}
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#eff4ff] transition-colors cursor-pointer"
                >
                  <div className="bg-[#ffdad6] text-[#a20513] rounded-lg p-2 text-center min-w-[44px]">
                    <span className="block font-bold text-[13px]">15</span>
                    <span className="block text-[9px] uppercase font-bold">ABR</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[12px] text-[#0b1c30] block truncate font-bold">
                      Término P1 / Provas Bimestrais
                    </span>
                    <span className="text-[11px] text-[#5b403d]">Lançamento de notas parciais SIGA</span>
                  </div>
                </div>

                <div
                  onClick={() => onSelectTab('calendario')}
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#eff4ff] transition-colors cursor-pointer"
                >
                  <div className="bg-[#dce1ff] text-[#4059aa] rounded-lg p-2 text-center min-w-[44px]">
                    <span className="block font-bold text-[13px]">28</span>
                    <span className="block text-[9px] uppercase font-bold">ABR</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[12px] text-[#0b1c30] block truncate font-bold">
                      Entrega 1ª Fase - Projeto Integrador
                    </span>
                    <span className="text-[11px] text-[#5b403d]">Documentação e repositório Git</span>
                  </div>
                </div>

                <div
                  onClick={() => onSelectTab('calendario')}
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#eff4ff] transition-colors cursor-pointer"
                >
                  <div className="bg-[#d5e3fc] text-[#425064] rounded-lg p-2 text-center min-w-[44px]">
                    <span className="block font-bold text-[13px]">12</span>
                    <span className="block text-[9px] uppercase font-bold">MAI</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[12px] text-[#0b1c30] block truncate font-bold">
                      Validação Horas Complementares
                    </span>
                    <span className="text-[11px] text-[#5b403d]">Certificados de cursos e eventos</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectTab('calendario')}
                className="w-full text-center mt-3 text-[#4059aa] text-[12px] font-bold hover:underline cursor-pointer"
              >
                Ver Cronograma Completo no Calendário
              </button>
            </div>

            {/* Trending Topics of the Week */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e5eeff]">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#4059aa] text-[20px]">tag</span>
                <h4 className="text-[14px] font-bold text-[#0b1c30]">Tópicos da Semana</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  '#TCC2025',
                  '#MaratonaCPS',
                  '#HorasComplementares',
                  '#ReactSpring',
                  '#EstagioTecnologia',
                  '#SIGAFatec',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                      tagFilter === tag
                        ? 'bg-[#a20513] text-white shadow-xs'
                        : 'bg-[#eff4ff] hover:bg-[#ffdad6]/60 text-[#0b1c30]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Academic Activity Chart Widget */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e5eeff]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[14px] font-bold text-[#0b1c30]">Atividade na Rede</h4>
                <span className="text-[11px] text-[#a20513] font-bold">+18% hoje</span>
              </div>
              <p className="text-[11px] text-[#5b403d] mb-3">Interações em tempo real na FATEC Voz do Fatecano:</p>
              
              <div className="w-full flex items-end justify-between h-20 pt-2 gap-2">
                {[
                  { day: 'Seg', height: 'h-8', bg: 'bg-[#8fa7fe]' },
                  { day: 'Ter', height: 'h-12', bg: 'bg-[#8fa7fe]' },
                  { day: 'Qua', height: 'h-10', bg: 'bg-[#8fa7fe]' },
                  { day: 'Qui', height: 'h-14', bg: 'bg-[#8fa7fe]' },
                  { day: 'Hoje', height: 'h-16', bg: 'bg-[#a20513]', bold: true },
                  { day: 'Sáb', height: 'h-6', bg: 'bg-[#dce9ff]' },
                ].map((col) => (
                  <div key={col.day} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      className={`w-full ${col.bg} rounded-t-md ${col.height} transition-all duration-300 group-hover:brightness-90`}
                    />
                    <span className={`text-[10px] ${col.bold ? 'font-bold text-[#a20513]' : 'text-[#5b403d]'}`}>
                      {col.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
