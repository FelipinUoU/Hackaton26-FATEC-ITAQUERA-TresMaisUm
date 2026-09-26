import React, { useState } from 'react';
import { UserProfileData, Post } from '../types';
import avatarImg from '../assets/images/avatar_lucas_mendonca_1790451315320.jpg';

interface UserProfileProps {
  profile: UserProfileData;
  profilePosts: Post[];
  onOpenEditModal: () => void;
  onSelectPost: (post: Post) => void;
  onVotePost: (postId: string, dir: 'up' | 'down') => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  profile,
  profilePosts,
  onOpenEditModal,
  onSelectPost,
  onVotePost,
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'saved' | 'projects' | 'solved'>('posts');
  const [sortOption, setSortOption] = useState<'top' | 'recent' | 'comments'>('top');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profile.name} - FATECHub`,
        text: `Perfil de ${profile.name} na rede acadêmica FATEC`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link do perfil copiado para a área de transferência!');
    }
  };

  // Generate a realistic 5-month contribution heatmap grid (Nov, Dez, Jan, Fev, Mar)
  // 5 months ~ 20-22 weeks, 7 days per week
  const months = ['Nov', 'Dez', 'Jan', 'Fev', 'Mar (Atual)'];
  // We can generate stable matrix
  const weeks = Array.from({ length: 22 }, (_, w) => {
    return Array.from({ length: 7 }, (_, d) => {
      // Create pattern of activities
      const val = (w * 7 + d * 13 + 5) % 17;
      if (val === 0 || val === 1) return 0; // empty
      if (val < 6) return 1; // light
      if (val < 11) return 2; // medium
      if (val < 15) return 3; // high
      return 4; // max
    });
  });

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-[#eff4ff]';
      case 1:
        return 'bg-[#ffdad6]';
      case 2:
        return 'bg-[#ffb4ac]';
      case 3:
        return 'bg-[#c62828]';
      case 4:
        return 'bg-[#93000e]';
      default:
        return 'bg-[#eff4ff]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 w-full flex flex-col gap-6">
      
      {/* Profile Card & Geometric CPS Banner */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#e5eeff] overflow-hidden">
        {/* Banner with dot matrix and crimson gradient on right */}
        <div className="h-32 sm:h-40 w-full relative bg-gradient-to-r from-[#0b1c30] via-[#213145] to-[#a20513] overflow-hidden p-4 sm:p-6 flex items-start justify-between">
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Institutional Badge */}
          <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Fatec Hub Verified Community</span>
          </div>

          {/* Student CPS ID */}
          <div className="relative z-10 text-white/80 font-mono text-[11px] bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-lg">
            {profile.studentId}
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 sm:px-8 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-5">
            {/* Avatar & Main Info */}
            <div className="flex items-end gap-4">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-white shadow-md shrink-0 bg-white">
                <img
                  src={avatarImg}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div
                  className="absolute bottom-1 right-1 w-5 h-5 bg-[#a20513] text-white rounded-full flex items-center justify-center shadow-xs ring-2 ring-white"
                  title="Estudante FATEC Verificado"
                >
                  <span className="material-symbols-outlined text-[13px]">check</span>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-[22px] sm:text-[26px] font-extrabold text-[#0b1c30] tracking-tight">
                    {profile.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#a20513] text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    {profile.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[12px] text-[#425064] mt-1 flex-wrap">
                  <span className="font-semibold text-[#0b1c30]">{profile.handle}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#a20513] font-bold">
                    <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                    {profile.karma.toLocaleString()} Karma Acadêmico
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenEditModal}
                className="px-4 py-2 rounded-xl bg-[#a20513] hover:bg-[#c62828] text-white text-[13px] font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                <span>Editar Perfil</span>
              </button>

              <button
                onClick={handleShareProfile}
                aria-label="Compartilhar Perfil"
                className="w-9 h-9 rounded-xl border border-[#dce9ff] bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </button>

              <button
                onClick={() => alert('Configurações de conta e privacidade da FATECHub.')}
                aria-label="Configurações"
                className="w-9 h-9 rounded-xl border border-[#dce9ff] bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">settings</span>
              </button>
            </div>
          </div>

          {/* 4-Bento Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#a20513] shadow-2xs shrink-0">
                <span className="material-symbols-outlined text-[18px]">developer_mode</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#5b403d] tracking-wider">
                  Curso & Semestre
                </span>
                <span className="text-[12px] font-bold text-[#0b1c30] truncate">
                  {profile.courseSemester}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#4059aa] shadow-2xs shrink-0">
                <span className="material-symbols-outlined text-[18px]">domain</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#5b403d] tracking-wider">
                  Campus
                </span>
                <span className="text-[12px] font-bold text-[#0b1c30] truncate">
                  {profile.campus}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#425064] shadow-2xs shrink-0">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#5b403d] tracking-wider">
                  Membro Desde
                </span>
                <span className="text-[12px] font-bold text-[#0b1c30] truncate">
                  {profile.memberSince}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#a20513] shadow-2xs shrink-0">
                <span className="material-symbols-outlined text-[18px]">military_tech</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#5b403d] tracking-wider">
                  Nível Acadêmico
                </span>
                <span className="text-[12px] font-bold text-[#a20513] truncate">
                  {profile.academicLevel} ({profile.levelBadge})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bento + Contribution Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Metrics & Contribution Heatmap & Posts (Spans 8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-white rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#5b403d] text-[11px] font-bold uppercase mb-1">
                <span>Publicações</span>
                <span className="material-symbols-outlined text-[18px] text-[#a20513]">edit_note</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[26px] font-extrabold text-[#0b1c30] font-mono leading-none">
                  {profile.stats.publications}
                </span>
                <span className="text-[11px] font-bold text-[#a20513]">
                  +{profile.stats.newThisMonth} este mês
                </span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#5b403d] text-[11px] font-bold uppercase mb-1">
                <span>Soluções</span>
                <span className="material-symbols-outlined text-[18px] text-[#4059aa]">check_circle</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[26px] font-extrabold text-[#0b1c30] font-mono leading-none">
                  {profile.stats.solutions}
                </span>
                <span className="text-[11px] font-semibold text-[#4059aa]">resolvidas</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#5b403d] text-[11px] font-bold uppercase mb-1">
                <span>Upvotes Totais</span>
                <span className="material-symbols-outlined text-[18px] text-[#a20513]">thumb_up</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[26px] font-extrabold text-[#0b1c30] font-mono leading-none">
                  {(profile.stats.totalUpvotes / 1000).toFixed(1)}k
                </span>
                <span className="text-[11px] font-semibold text-[#5b403d]">recebidos</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#5b403d] text-[11px] font-bold uppercase mb-1">
                <span>Streak Diário</span>
                <span className="material-symbols-outlined text-[18px] text-[#a20513]">bolt</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[26px] font-extrabold text-[#a20513] font-mono leading-none">
                  {profile.stats.dailyStreak}
                </span>
                <span className="text-[11px] font-semibold text-[#5b403d]">dias seguidos</span>
              </div>
            </div>
          </div>

          {/* Progress to Diamante */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5eeff] shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between text-[12px] font-bold">
              <span className="text-[#0b1c30]">Progresso para Colaborador Diamante</span>
              <span className="text-[#a20513] font-mono">
                {profile.progressCurrent} / {profile.progressMax} pts
              </span>
            </div>
            <div className="w-full bg-[#eff4ff] rounded-full h-2 overflow-hidden border border-[#dce9ff]">
              <div
                className="bg-gradient-to-r from-[#c62828] to-[#a20513] h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(profile.progressCurrent / profile.progressMax) * 100}%`,
                }}
              />
            </div>
            <p className="text-[11px] text-[#5b403d]">
              Faltam {profile.progressMax - profile.progressCurrent} pontos de contribuição para subir de nível de mentoria.
            </p>
          </div>

          {/* Academic Contribution Heatmap (5 Months) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e5eeff] shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#a20513] text-[20px]">
                  calendar_month
                </span>
                <h3 className="text-[15px] font-bold text-[#0b1c30]">
                  Mapa de Contribuição Acadêmica
                </h3>
              </div>
              <span className="text-[11px] text-[#5b403d] font-semibold">
                542 ações nos últimos 5 meses
              </span>
            </div>

            {/* Months Label */}
            <div className="flex items-center justify-between text-[11px] font-bold text-[#5b403d] px-1">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto pb-1">
              <div className="flex gap-1.5 min-w-full justify-between">
                {weeks.map((week, wIdx) => (
                  <div key={`w-${wIdx}`} className="flex flex-col gap-1.5">
                    {week.map((level, dIdx) => (
                      <div
                        key={`cell-${wIdx}-${dIdx}`}
                        title={`Nível ${level} de atividade acadêmica`}
                        className={`w-3.5 h-3.5 rounded-sm ${getHeatmapColor(
                          level
                        )} hover:scale-125 transition-transform cursor-pointer`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Badges / Distintivos Conquistados */}
            <div className="pt-3 border-t border-[#eff4ff]">
              <span className="text-[11px] uppercase font-bold text-[#5b403d] block mb-2.5">
                Distintivos Conquistados
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {profile.badges.map((b) => (
                  <div
                    key={b.id}
                    className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center gap-2 hover:bg-[#dce9ff]/60 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#a20513]">
                      {b.icon}
                    </span>
                    <span className="text-[11px] font-bold text-[#0b1c30] truncate">
                      {b.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Posts & Filter Tabs */}
          <div className="flex flex-col gap-4">
            {/* Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                    activeTab === 'posts'
                      ? 'bg-[#a20513] text-white shadow-xs'
                      : 'bg-white text-[#425064] border border-[#e5eeff] hover:bg-[#eff4ff]'
                  }`}
                >
                  Publicações ({profile.stats.publications})
                </button>
                <button
                  onClick={() => setActiveTab('replies')}
                  className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                    activeTab === 'replies'
                      ? 'bg-[#a20513] text-white shadow-xs'
                      : 'bg-white text-[#425064] border border-[#e5eeff] hover:bg-[#eff4ff]'
                  }`}
                >
                  Comentários & Respostas ({profile.stats.solutions})
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                    activeTab === 'saved'
                      ? 'bg-[#a20513] text-white shadow-xs'
                      : 'bg-white text-[#425064] border border-[#e5eeff] hover:bg-[#eff4ff]'
                  }`}
                >
                  Salvos
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                    activeTab === 'projects'
                      ? 'bg-[#a20513] text-white shadow-xs'
                      : 'bg-white text-[#425064] border border-[#e5eeff] hover:bg-[#eff4ff]'
                  }`}
                >
                  Projetos & Repos (3)
                </button>
                <button
                  onClick={() => setActiveTab('solved')}
                  className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                    activeTab === 'solved'
                      ? 'bg-[#a20513] text-white shadow-xs'
                      : 'bg-white text-[#425064] border border-[#e5eeff] hover:bg-[#eff4ff]'
                  }`}
                >
                  Dúvidas Resolvidas
                </button>
              </div>

              {/* Sorting Filter */}
              <div className="flex items-center gap-2 text-[12px]">
                <span className="text-[#5b403d] font-semibold">Ordenar por:</span>
                <button
                  onClick={() => setSortOption('top')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer ${
                    sortOption === 'top' ? 'bg-[#ffdad6] text-[#a20513]' : 'text-[#425064]'
                  }`}
                >
                  Mais Votadas
                </button>
                <button
                  onClick={() => setSortOption('recent')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer ${
                    sortOption === 'recent' ? 'bg-[#ffdad6] text-[#a20513]' : 'text-[#425064]'
                  }`}
                >
                  Mais Recentes
                </button>
              </div>
            </div>

            {/* Profile Posts List */}
            <div className="flex flex-col gap-4">
              {profilePosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => onSelectPost(post)}
                  className="bg-white rounded-2xl p-5 shadow-xs border border-[#e5eeff] transition-all hover:shadow-md cursor-pointer group"
                >
                  <div className="flex gap-4 items-start">
                    {/* Upvote Pill */}
                    <div
                      className="flex flex-col items-center bg-[#eff4ff] rounded-full px-2 py-2 shrink-0 border border-[#dce9ff]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onVotePost(post.id, 'up')}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#5b403d] hover:text-[#a20513] hover:bg-[#ffdad6]/40 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">keyboard_arrow_up</span>
                      </button>
                      <span className="text-[13px] font-bold text-[#a20513] my-0.5">
                        +{post.upvotes}
                      </span>
                      <button
                        onClick={() => onVotePost(post.id, 'down')}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#5b403d] hover:text-[#4059aa] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
                      </button>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Meta */}
                      <div className="flex items-center justify-between gap-2 mb-2 text-[11px] font-semibold flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#4059aa]/10 text-[#4059aa] px-2.5 py-0.5 rounded-full font-bold">
                            {post.tagCategory}
                          </span>
                          <span className="bg-[#eff4ff] text-[#a20513] font-bold px-2 py-0.5 rounded-md">
                            {post.tagCategoryType}
                          </span>
                          <span className="text-[#5b403d]">•</span>
                          <span className="text-[#5b403d]">{post.timeAgo}</span>
                        </div>

                        {post.isPinned && (
                          <span className="flex items-center gap-1 text-[#a20513] text-[11px] font-bold bg-[#ffdad6] px-2 py-0.5 rounded-md">
                            <span className="material-symbols-outlined text-[13px]">push_pin</span>
                            Fixado no perfil
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-[15px] sm:text-[16px] text-[#0b1c30] font-bold group-hover:text-[#a20513] transition-colors mb-2 leading-snug">
                        {post.title}
                      </h2>

                      {/* Content */}
                      <p className="text-[13px] text-[#425064] leading-relaxed mb-3">
                        {post.content}
                      </p>

                      {/* Code Snippet if present */}
                      {post.codeSnippet && (
                        <div
                          className="bg-[#213145] rounded-xl p-3 my-2 font-mono text-[12px] text-[#eaf1ff] border border-white/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[11px] text-white/60 font-sans">
                            <span>{post.codeSnippet.language}</span>
                            <span className="text-[#8fa7fe] hover:underline cursor-pointer">
                              {post.codeSnippet.filename}
                            </span>
                          </div>
                          <pre className="overflow-x-auto whitespace-pre">
                            <code>{post.codeSnippet.code}</code>
                          </pre>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-4 text-[12px] text-[#5b403d] font-semibold pt-2">
                        <span className="flex items-center gap-1.5 hover:text-[#0b1c30]">
                          <span className="material-symbols-outlined text-[17px] text-[#4059aa]">
                            chat_bubble_outline
                          </span>
                          <span>{post.commentCount} comentários</span>
                        </span>

                        {post.codeSnippet && (
                          <span className="flex items-center gap-1 hover:text-[#0b1c30]">
                            <span className="material-symbols-outlined text-[17px] text-[#4059aa]">
                              fork_right
                            </span>
                            <span>12 forks</span>
                          </span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert('Publicação salva nos seus favoritos acadêmicos!');
                          }}
                          className="flex items-center gap-1 hover:text-[#a20513] transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[17px]">bookmark_border</span>
                          <span>Salvar</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(window.location.href);
                            alert('Link da publicação copiado!');
                          }}
                          className="flex items-center gap-1 hover:text-[#a20513] transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[17px]">share</span>
                          <span>Compartilhar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center py-3">
              <button
                onClick={() => alert('Carregando mais artigos acadêmicos do histórico do aluno...')}
                className="px-6 py-2.5 bg-white border border-[#dce9ff] hover:bg-[#eff4ff] text-[#0b1c30] text-[13px] font-bold rounded-full transition-colors shadow-2xs cursor-pointer"
              >
                Carregar publicações anteriores
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Rankings, Hubs & Portfolio (Spans 4 cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Ranking Fatec SP Card */}
          <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#a20513] text-[20px]">
                  leaderboard
                </span>
                <h3 className="text-[14px] font-bold text-[#0b1c30]">Ranking Fatec SP</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#a20513] text-[10px] font-bold">
                Top 3%
              </span>
            </div>

            <p className="text-[12px] text-[#425064] leading-relaxed">
              Lucas ocupa o <strong className="text-[#a20513]">#14 lugar geral</strong> entre os mais de 1.400 discentes ativos do campus Bom Retiro neste semestre.
            </p>

            <div className="flex flex-col gap-2">
              {profile.rankings.map((r) => (
                <div
                  key={r.rank}
                  className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                    r.isSelf
                      ? 'bg-[#a20513] text-white shadow-xs font-bold'
                      : 'bg-[#eff4ff] text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        r.isSelf ? 'bg-white/20 text-white' : 'bg-white text-[#425064]'
                      }`}
                    >
                      {r.rank}
                    </span>
                    <span className="text-[12px]">
                      {r.name} {r.course && `(${r.course})`}
                    </span>
                  </div>
                  <span className={`text-[12px] font-mono ${r.isSelf ? 'text-white' : 'text-[#425064]'}`}>
                    {r.points.toLocaleString()} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hubs & Matérias do Semestre */}
          <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#eff4ff]">
              <span className="material-symbols-outlined text-[#4059aa] text-[20px]">
                device_hub
              </span>
              <h3 className="text-[14px] font-bold text-[#0b1c30]">
                Hubs & Matérias do Semestre
              </h3>
            </div>

            <div className="flex flex-col space-y-1.5">
              {profile.semesterSubjects.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#eff4ff] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#eff4ff] group-hover:bg-white flex items-center justify-center text-[#4059aa] shrink-0 border border-[#dce9ff]">
                      <span className="material-symbols-outlined text-[18px]">
                        {sub.icon}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] font-bold text-[#0b1c30] truncate group-hover:text-[#a20513] transition-colors">
                        {sub.name}
                      </span>
                      <span className="text-[11px] text-[#5b403d] truncate">
                        {sub.members}
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[#5b403d] group-hover:text-[#0b1c30]">
                    chevron_right
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Conexões & Portfólio */}
          <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#eff4ff]">
              <span className="material-symbols-outlined text-[#a20513] text-[20px]">
                link
              </span>
              <h3 className="text-[14px] font-bold text-[#0b1c30]">
                Conexões & Portfólio
              </h3>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={profile.socialLinks.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-all text-[#0b1c30] group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-[20px] text-[#0b1c30]">
                    code
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[12px] font-bold">GitHub</span>
                    <span className="text-[11px] text-[#425064] truncate">
                      {profile.socialLinks.github}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#5b403d] group-hover:text-[#a20513]">
                  open_in_new
                </span>
              </a>

              <a
                href={profile.socialLinks.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-all text-[#0b1c30] group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-[20px] text-[#4059aa]">
                    work
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[12px] font-bold">LinkedIn</span>
                    <span className="text-[11px] text-[#425064] truncate">
                      {profile.socialLinks.linkedin}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#5b403d] group-hover:text-[#a20513]">
                  open_in_new
                </span>
              </a>

              <a
                href={profile.socialLinks.lattesUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-all text-[#0b1c30] group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-[20px] text-[#a20513]">
                    school
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[12px] font-bold">Currículo Lattes / CNPq</span>
                    <span className="text-[11px] text-[#425064] truncate">
                      {profile.socialLinks.lattes}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#5b403d] group-hover:text-[#a20513]">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
