import React, { useState } from 'react';
import { NavTab } from '../types';
import avatarImg from '../assets/images/avatar_lucas_mendonca_1790451315320.jpg';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifications = [
    {
      id: 'n1',
      title: 'Prazo Crítico SIGA',
      desc: 'Faltam 4 dias para envio das Horas Complementares no SIGA.',
      time: 'há 20 min',
      unread: true,
    },
    {
      id: 'n2',
      title: 'Novo comentário na sua discussão',
      desc: 'Carlos Eduardo respondeu sobre a autenticação JWT com Spring Boot 3.',
      time: 'há 1h',
      unread: true,
    },
    {
      id: 'n3',
      title: 'Inscrições Abertas',
      desc: 'Maratona Inter-FATECs 2025/1 com vagas para a final em São Paulo.',
      time: 'há 3h',
      unread: false,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4 md:gap-6">
        
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => onSelectTab('comunidade')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-[#c62828] flex items-center justify-center shadow-sm group-hover:bg-[#a20513] transition-colors">
              <span className="material-symbols-outlined text-white text-[22px]">forum</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] sm:text-[16px] text-[#a20513] leading-tight tracking-tight">
                FATEC <span className="text-[#0b1c30] font-normal">Voz do Aluno</span>
              </span>
              <span className="text-[10px] text-[#5b403d] uppercase tracking-wider font-semibold">
                Rede Acadêmica
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onSelectTab('comunidade')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                currentTab === 'comunidade'
                  ? 'text-[#a20513] bg-[#ffdad6]/60 shadow-xs'
                  : 'text-[#425064] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              Comunidade
            </button>
            <button
              onClick={() => onSelectTab('calendario')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                currentTab === 'calendario'
                  ? 'text-[#a20513] bg-[#ffdad6]/60 shadow-xs'
                  : 'text-[#425064] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              Calendário
            </button>
            <button
              onClick={() => onSelectTab('cursos')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                currentTab === 'cursos'
                  ? 'text-[#a20513] bg-[#ffdad6]/60 shadow-xs'
                  : 'text-[#425064] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              Cursos
            </button>
            <button
              onClick={() => onSelectTab('vagas')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                currentTab === 'vagas'
                  ? 'text-[#a20513] bg-[#ffdad6]/60 shadow-xs'
                  : 'text-[#425064] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              Vagas
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-3.5 text-[#5b403d] text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Pesquisar discussões, hubs de matéria e colegas..."
              className="w-full pl-10 pr-4 py-2 bg-[#eff4ff] focus:bg-white rounded-full text-[13px] text-[#0b1c30] placeholder:text-[#5b403d] border border-transparent focus:border-[#a20513]/30 focus:outline-none focus:ring-2 focus:ring-[#a20513]/10 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-[#5b403d] hover:text-[#0b1c30] text-[16px] material-symbols-outlined"
              >
                close
              </button>
            )}
          </div>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification Button & Popover */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#425064] hover:bg-[#dce9ff] hover:text-[#0b1c30] transition-colors relative cursor-pointer"
              title="Notificações Acadêmicas"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#a20513] ring-2 ring-[#f8f9ff]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-xl shadow-xl border border-[#e5eeff] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between px-2 pb-2 border-b border-[#eff4ff]">
                  <span className="text-[13px] font-bold text-[#0b1c30]">Notificações</span>
                  <span className="text-[11px] text-[#a20513] font-semibold cursor-pointer hover:underline">
                    Marcar como lidas
                  </span>
                </div>
                <div className="divide-y divide-[#eff4ff] max-h-72 overflow-y-auto mt-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                        n.unread ? 'bg-[#eff4ff]/60 hover:bg-[#eff4ff]' : 'hover:bg-slate-50'
                      }`}
                      onClick={() => setShowNotifications(false)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-bold text-[#0b1c30]">{n.title}</span>
                        <span className="text-[10px] text-[#5b403d]">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#425064] mt-0.5 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 text-center border-t border-[#eff4ff]">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onSelectTab('calendario');
                    }}
                    className="text-[11px] text-[#4059aa] font-semibold hover:underline"
                  >
                    Ver todos os prazos no Calendário
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Button */}
          <button
            onClick={() => onSelectTab('perfil')}
            className={`flex items-center gap-2 group px-2.5 py-1.5 rounded-full transition-all cursor-pointer ${
              currentTab === 'perfil'
                ? 'bg-[#ffdad6] ring-1 ring-[#a20513]/40'
                : 'hover:bg-[#eff4ff]'
            }`}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#a20513]/30 shrink-0">
              <img
                src={avatarImg}
                alt="Lucas Mendonça"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[12px] font-semibold text-[#0b1c30] leading-none group-hover:text-[#a20513] transition-colors">
                Lucas Mendonça
              </span>
              <span className="text-[10px] text-[#5b403d] mt-0.5 leading-none">
                Meu Perfil
              </span>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#425064] hover:bg-[#eff4ff]"
            aria-label="Abrir Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f8f9ff] border-b border-[#e5eeff] px-4 py-3 flex flex-col gap-2">
          <div className="relative mb-2">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#5b403d] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-3 py-2 bg-white rounded-lg text-[13px] border border-[#dce9ff]"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectTab('comunidade');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left text-[13px] font-semibold ${
                currentTab === 'comunidade' ? 'bg-[#ffdad6] text-[#a20513]' : 'bg-white text-[#0b1c30]'
              }`}
            >
              Comunidade
            </button>
            <button
              onClick={() => {
                onSelectTab('calendario');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left text-[13px] font-semibold ${
                currentTab === 'calendario' ? 'bg-[#ffdad6] text-[#a20513]' : 'bg-white text-[#0b1c30]'
              }`}
            >
              Calendário
            </button>
            <button
              onClick={() => {
                onSelectTab('cursos');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left text-[13px] font-semibold ${
                currentTab === 'cursos' ? 'bg-[#ffdad6] text-[#a20513]' : 'bg-white text-[#0b1c30]'
              }`}
            >
              Cursos
            </button>
            <button
              onClick={() => {
                onSelectTab('vagas');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left text-[13px] font-semibold ${
                currentTab === 'vagas' ? 'bg-[#ffdad6] text-[#a20513]' : 'bg-white text-[#0b1c30]'
              }`}
            >
              Vagas
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
