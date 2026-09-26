import React, { useState } from 'react';
import { CalendarEvent, HighlightEvent, SigaDeadline, Competition } from '../types';
import { CPS_CAMPUSES } from '../data/mockData';

interface CalendarViewProps {
  events: CalendarEvent[];
  highlightEvents: HighlightEvent[];
  deadlines: SigaDeadline[];
  competitions: Competition[];
  onOpenSyncModal: () => void;
  onOpenCreateEventModal: () => void;
  onSelectEvent: (event: CalendarEvent) => void;
  onToggleHighlightInterest: (id: string) => void;
  onToggleHighlightSave: (id: string) => void;
  searchFilter: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  highlightEvents,
  deadlines,
  competitions,
  onOpenSyncModal,
  onOpenCreateEventModal,
  onSelectEvent,
  onToggleHighlightInterest,
  onToggleHighlightSave,
  searchFilter,
}) => {
  const [activeView, setActiveView] = useState<'month' | 'week' | 'list'>('month');
  const [selectedCampus, setSelectedCampus] = useState('todas');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cps' | 'provas' | 'maratona' | 'sematec' | 'carreiras'>('all');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(5); // 5 for May 2025
  const [monthName, setMonthName] = useState('Maio de 2025');

  // Filter events based on category, campus, search
  const filteredEvents = events.filter((evt) => {
    if (selectedCategory !== 'all' && evt.type !== selectedCategory) return false;
    if (selectedCampus !== 'todas') {
      const campusObj = CPS_CAMPUSES.find((c) => c.id === selectedCampus);
      if (campusObj && !evt.campus.toLowerCase().includes(campusObj.name.toLowerCase().split(' ')[1] || '')) {
        if (!evt.campus.includes('Todas')) return false;
      }
    }
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        evt.title.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.campus.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getDayEvents = (day: number) => {
    return filteredEvents.filter((e) => e.day === day && e.month === currentMonthIndex);
  };

  const handlePrevMonth = () => {
    if (currentMonthIndex === 5) {
      setCurrentMonthIndex(4);
      setMonthName('Abril de 2025');
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 5) {
      setCurrentMonthIndex(6);
      setMonthName('Junho de 2025');
    }
  };

  const handleToday = () => {
    setCurrentMonthIndex(5);
    setMonthName('Maio de 2025');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Academic Context Header & Action Bar */}
      <section className="w-full bg-[#eff4ff] py-8 sm:py-10 border-b border-[#e5eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col max-w-2xl">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000e] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">school</span>
                Portal Oficial de Cronogramas CPS
              </span>
              <span className="text-[12px] font-semibold text-[#425064]">
                Semestre 2025/1
              </span>
            </div>
            <h1 className="text-[26px] sm:text-[34px] font-extrabold text-[#0b1c30] tracking-tight leading-tight">
              Calendário Acadêmico & Eventos FATEC
            </h1>
            <p className="mt-2 text-[14px] text-[#425064] leading-relaxed">
              Acompanhe datas oficiais do Centro Paula Souza, prazos do SIGA, defesas de TCC, hackathons, maratonas de programação e semanas de tecnologia integradas de todas as unidades.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenSyncModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0b1c30] shadow-xs hover:bg-[#e5eeff] transition-all text-[13px] font-semibold cursor-pointer border border-[#dce9ff]"
            >
              <span className="material-symbols-outlined text-[20px] text-[#4059aa]">sync</span>
              <span>Sincronizar com Agenda</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0b1c30] shadow-xs hover:bg-[#e5eeff] transition-all text-[13px] font-semibold cursor-pointer border border-[#dce9ff]"
            >
              <span className="material-symbols-outlined text-[20px] text-[#425064]">picture_as_pdf</span>
              <span>Exportar PDF</span>
            </button>
            <button
              onClick={onOpenCreateEventModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a20513] text-white shadow-sm hover:bg-[#c62828] transition-all text-[13px] font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>Notificar Evento</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter & View Controls */}
      <section className="w-full bg-white shadow-xs border-b border-[#e5eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex flex-col gap-3.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* View switchers */}
            <div className="inline-flex p-1 rounded-xl bg-[#eff4ff] max-w-fit border border-[#dce9ff]">
              <button
                onClick={() => setActiveView('month')}
                className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                  activeView === 'month'
                    ? 'bg-white text-[#0b1c30] shadow-xs'
                    : 'text-[#425064] hover:text-[#0b1c30]'
                }`}
              >
                Mês
              </button>
              <button
                onClick={() => setActiveView('week')}
                className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                  activeView === 'week'
                    ? 'bg-white text-[#0b1c30] shadow-xs'
                    : 'text-[#425064] hover:text-[#0b1c30]'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                  activeView === 'list'
                    ? 'bg-white text-[#0b1c30] shadow-xs'
                    : 'text-[#425064] hover:text-[#0b1c30]'
                }`}
              >
                Lista / Próximos
              </button>
            </div>

            {/* Campus Selector Dropdown */}
            <div className="flex items-center gap-3">
              <div className="relative min-w-[270px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#425064] pointer-events-none">
                  location_on
                </span>
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 appearance-none rounded-xl bg-[#eff4ff] text-[13px] text-[#0b1c30] border border-[#dce9ff] focus:outline-none focus:bg-white cursor-pointer font-medium"
                >
                  {CPS_CAMPUSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#425064] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Categories Pills with Counts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap flex items-center gap-2 cursor-pointer transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#a20513] text-white shadow-xs'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
              }`}
            >
              <span>Todos os Tipos</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${selectedCategory === 'all' ? 'bg-white/20' : 'bg-[#dce9ff]'}`}>
                {events.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('cps')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap flex items-center gap-2 cursor-pointer transition-all ${
                selectedCategory === 'cps'
                  ? 'bg-[#a20513] text-white shadow-xs'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#a20513]" />
              <span>Prazos SIGA / CPS</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedCategory === 'cps' ? 'bg-white/20' : 'bg-[#dce9ff]'}`}>
                7
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('provas')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap flex items-center gap-2 cursor-pointer transition-all ${
                selectedCategory === 'provas'
                  ? 'bg-[#4059aa] text-white shadow-xs'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#4059aa]" />
              <span>Avaliações & P1/P2/Exames</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedCategory === 'provas' ? 'bg-white/20' : 'bg-[#dce9ff]'}`}>
                9
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('maratona')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap flex items-center gap-2 cursor-pointer transition-all ${
                selectedCategory === 'maratona'
                  ? 'bg-[#5a687d] text-white shadow-xs'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#5a687d]" />
              <span>Maratonas & Hackathons</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedCategory === 'maratona' ? 'bg-white/20' : 'bg-[#dce9ff]'}`}>
                5
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('sematec')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap flex items-center gap-2 cursor-pointer transition-all ${
                selectedCategory === 'sematec'
                  ? 'bg-[#4059aa] text-white shadow-xs'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#8fa7fe]" />
              <span>Semanas Tech & FETEPS</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedCategory === 'sematec' ? 'bg-white/20' : 'bg-[#dce9ff]'}`}>
                4
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('carreiras')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap flex items-center gap-2 cursor-pointer transition-all ${
                selectedCategory === 'carreiras'
                  ? 'bg-[#425064] text-white shadow-xs'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#425064]" />
              <span>Feiras de Estágio</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedCategory === 'carreiras' ? 'bg-white/20' : 'bg-[#dce9ff]'}`}>
                3
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Body: 2 Columns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Primary Column (Calendar & Weekly Highlights) */}
          <section className="lg:col-span-8 flex flex-col gap-8 min-w-0">
            {/* View Month */}
            {activeView === 'month' && (
              <div className="bg-white rounded-2xl shadow-xs border border-[#e5eeff] p-5 sm:p-7 flex flex-col">
                {/* Calendar Header Navigation */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#ffdad6] flex items-center justify-center text-[#a20513]">
                      <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                    </div>
                    <div>
                      <h2 className="text-[22px] sm:text-[24px] text-[#0b1c30] font-bold tracking-tight">
                        {monthName}
                      </h2>
                      <p className="text-[12px] text-[#425064]">
                        14º ciclo letivo • Período oficial de entregas parciais
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevMonth}
                      aria-label="Mês anterior"
                      className="w-9 h-9 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <button
                      onClick={handleToday}
                      className="px-3.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-[12px] font-bold transition-colors cursor-pointer"
                    >
                      Hoje
                    </button>
                    <button
                      onClick={handleNextMonth}
                      aria-label="Próximo mês"
                      className="w-9 h-9 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </div>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-2 pb-2 text-center">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                    <span
                      key={day}
                      className="text-[11px] font-bold text-[#425064] uppercase tracking-wider py-1"
                    >
                      {day}
                    </span>
                  ))}
                </div>

                {/* Calendar Matrix (May 2025: May 1 is Thursday) */}
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                  {/* Previous month fill days: 27, 28, 29, 30 */}
                  {[27, 28, 29, 30].map((d) => (
                    <div
                      key={`prev-${d}`}
                      className="min-h-[88px] sm:min-h-[96px] p-1.5 sm:p-2 rounded-xl bg-[#eff4ff]/30 opacity-40 flex flex-col justify-between border border-transparent"
                    >
                      <span className="text-[11px] text-[#425064] font-medium">{d}</span>
                    </div>
                  ))}

                  {/* Days 1 to 31 */}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const dayEvents = getDayEvents(day);
                    const isToday = day === 14 && currentMonthIndex === 5;
                    const hasHoliday = dayEvents.some((e) => e.isHoliday);

                    return (
                      <div
                        key={`day-${day}`}
                        onClick={() => {
                          if (dayEvents.length > 0) {
                            onSelectEvent(dayEvents[0]);
                          }
                        }}
                        className={`min-h-[88px] sm:min-h-[96px] p-1.5 sm:p-2 rounded-xl flex flex-col justify-between transition-all cursor-pointer group ${
                          isToday
                            ? 'bg-[#ffdad6]/30 ring-2 ring-[#a20513] shadow-xs'
                            : 'bg-[#eff4ff] hover:bg-[#dce9ff]/80 hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[12px] font-bold ${
                              isToday
                                ? 'w-5 h-5 rounded-full bg-[#a20513] text-white flex items-center justify-center text-[10px]'
                                : hasHoliday
                                ? 'text-[#a20513]'
                                : 'text-[#0b1c30]'
                            }`}
                          >
                            {day}
                          </span>
                          {isToday && (
                            <span className="text-[9px] uppercase font-bold text-[#a20513] tracking-wide">
                              Hoje
                            </span>
                          )}
                          {hasHoliday && (
                            <span className="material-symbols-outlined text-[13px] text-[#a20513]">
                              event_busy
                            </span>
                          )}
                          {day === 24 && (
                            <span className="material-symbols-outlined text-[13px] text-[#4059aa]">
                              code
                            </span>
                          )}
                        </div>

                        {/* Events Badges in Calendar Day */}
                        <div className="flex flex-col gap-1 mt-1 overflow-hidden">
                          {dayEvents.map((evt) => {
                            let badgeBg = 'bg-[#e5eeff] text-[#0b1c30]';
                            if (evt.badgeStyle === 'error') badgeBg = 'bg-[#ffdad6] text-[#93000a] font-semibold';
                            else if (evt.badgeStyle === 'primary') badgeBg = 'bg-[#a20513] text-white font-semibold';
                            else if (evt.badgeStyle === 'secondary') badgeBg = 'bg-[#4059aa] text-white font-semibold';
                            else if (evt.badgeStyle === 'dim') badgeBg = 'bg-[#d5e3fc] text-[#0d1c2e]';
                            else if (evt.badgeStyle === 'tertiary') badgeBg = 'bg-[#dce9ff] text-[#425064]';

                            return (
                              <span
                                key={evt.id}
                                title={evt.title}
                                className={`block px-1.5 py-0.5 rounded text-[9.5px] sm:text-[10px] truncate leading-tight shadow-2xs ${badgeBg}`}
                              >
                                {evt.shortTitle}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Legend */}
                <div className="mt-6 pt-4 border-t border-[#e5eeff] flex flex-wrap items-center gap-4 text-[12px] text-[#425064]">
                  <span className="font-bold text-[#0b1c30]">Legenda rápida:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#a20513]" />
                    <span>Prazos SIGA Críticos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4059aa]" />
                    <span>Competições & Hackathons</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8fa7fe]" />
                    <span>Eventos Acadêmicos & Feiras</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d3e4fe]" />
                    <span>Bancas & Provas</span>
                  </div>
                </div>
              </div>
            )}

            {/* View List */}
            {activeView === 'list' && (
              <div className="bg-white rounded-2xl shadow-xs border border-[#e5eeff] p-6 flex flex-col gap-3">
                <h3 className="font-bold text-[18px] text-[#0b1c30] mb-2">
                  Todos os Prazos e Eventos em Lista
                </h3>
                <div className="divide-y divide-[#eff4ff]">
                  {filteredEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => onSelectEvent(evt)}
                      className="py-3.5 flex items-start justify-between gap-4 hover:bg-[#eff4ff]/60 px-3 rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex flex-col items-center justify-center shrink-0 border border-[#dce9ff]">
                          <span className="text-[14px] font-extrabold text-[#a20513]">
                            {evt.day}
                          </span>
                          <span className="text-[9px] uppercase font-bold text-[#425064]">
                            MAI
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eff4ff] text-[#4059aa] uppercase">
                              {evt.type}
                            </span>
                            <span className="text-[11px] text-[#5b403d]">{evt.campus}</span>
                          </div>
                          <h4 className="font-bold text-[14px] text-[#0b1c30]">
                            {evt.title}
                          </h4>
                          <p className="text-[12px] text-[#425064] line-clamp-1 mt-0.5">
                            {evt.description}
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#425064] text-[20px] shrink-0 mt-2">
                        chevron_right
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View Week */}
            {activeView === 'week' && (
              <div className="bg-white rounded-2xl shadow-xs border border-[#e5eeff] p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
                  <h3 className="font-bold text-[18px] text-[#0b1c30]">
                    Semana Atual: 12 a 18 de Maio de 2025
                  </h3>
                  <span className="text-[12px] font-bold text-[#a20513] bg-[#ffdad6] px-2.5 py-1 rounded-full">
                    Semana da Entrega Intermediária
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                  {[12, 13, 14, 15, 16, 17, 18].map((d) => {
                    const dayEvts = getDayEvents(d);
                    const isToday = d === 14;
                    const weekNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
                    return (
                      <div
                        key={`wk-${d}`}
                        className={`p-3 rounded-xl min-h-[140px] flex flex-col justify-between border ${
                          isToday
                            ? 'bg-[#ffdad6]/20 border-[#a20513]'
                            : 'bg-[#eff4ff] border-[#dce9ff]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-bold text-[#425064]">
                              {weekNames[d - 12]}
                            </span>
                            <span className={`text-[12px] font-bold ${isToday ? 'text-[#a20513]' : 'text-[#0b1c30]'}`}>
                              {d}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1 mt-2">
                            {dayEvts.map((e) => (
                              <div
                                key={e.id}
                                onClick={() => onSelectEvent(e)}
                                className="text-[10px] p-1.5 rounded bg-white text-[#0b1c30] shadow-2xs cursor-pointer hover:bg-[#ffdad6]/50 transition-colors font-medium"
                              >
                                {e.shortTitle}
                              </div>
                            ))}
                          </div>
                        </div>
                        {isToday && (
                          <span className="text-[9px] uppercase font-bold text-[#a20513] mt-2">
                            ● Hoje
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Weekly Highlights Section */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#dce1ff] flex items-center justify-center text-[#4059aa]">
                    <span className="material-symbols-outlined text-[20px]">local_activity</span>
                  </div>
                  <h3 className="text-[18px] sm:text-[20px] text-[#0b1c30] font-bold tracking-tight">
                    Eventos em Destaque nesta Semana
                  </h3>
                </div>
                <span className="text-[12px] font-semibold text-[#425064]">
                  12 a 18 de Maio, 2025
                </span>
              </div>

              {/* Event Cards */}
              {highlightEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-2xl shadow-xs border border-[#e5eeff] p-5 sm:p-6 hover:shadow-md transition-all flex flex-col md:flex-row gap-5 items-start"
                >
                  <div className="w-full md:w-52 h-40 rounded-xl overflow-hidden shrink-0 relative bg-[#eff4ff]">
                    <img
                      src={evt.imageUrl}
                      alt={evt.imageAlt}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-[#4059aa] text-white text-[11px] font-bold shadow-xs">
                      {evt.category}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {evt.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[#0b1c30] text-[11px] font-semibold"
                          >
                            {t}
                          </span>
                        ))}
                        <span className="px-2.5 py-0.5 rounded-full bg-[#dce1ff] text-[#264191] text-[11px] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">podium</span>
                          {evt.modality}
                        </span>
                      </div>

                      <h4
                        onClick={() =>
                          onSelectEvent({
                            id: evt.id,
                            title: evt.title,
                            shortTitle: evt.title.slice(0, 18),
                            type: evt.category === 'Hackathon' ? 'maratona' : 'carreiras',
                            dateStr: '2025-05-14',
                            day: 14,
                            month: 5,
                            year: 2025,
                            campus: evt.locationFormatted,
                            description: evt.description,
                            badgeStyle: 'secondary',
                          })
                        }
                        className="text-[16px] text-[#0b1c30] font-bold hover:text-[#a20513] transition-colors cursor-pointer leading-snug"
                      >
                        {evt.title}
                      </h4>
                      <p className="mt-1.5 text-[13px] text-[#425064] line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#eff4ff] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[#425064] text-[12px]">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#4059aa]">
                            calendar_today
                          </span>
                          {evt.dateFormatted}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#a20513]">
                            domain
                          </span>
                          {evt.locationFormatted}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={() => onToggleHighlightSave(evt.id)}
                          className={`px-3.5 py-1.5 rounded-lg border border-[#dce9ff] text-[12px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                            evt.isSaved
                              ? 'bg-[#ffdad6] text-[#a20513] border-[#a20513]/30'
                              : 'bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {evt.isSaved ? 'bookmark' : 'bookmark_border'}
                          </span>
                          <span>{evt.isSaved ? 'Salvo' : 'Salvar'}</span>
                        </button>

                        <button
                          onClick={() => onToggleHighlightInterest(evt.id)}
                          className={`px-4 py-1.5 rounded-lg text-[12px] font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1 ${
                            evt.isInterested
                              ? 'bg-[#1e3989] text-white hover:bg-[#152a65]'
                              : 'bg-[#a20513] text-white hover:bg-[#c62828]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {evt.isInterested ? 'check' : 'notifications_active'}
                          </span>
                          <span>{evt.isInterested ? 'Interesse Confirmado' : 'Tenho Interesse'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar Column (Critical SIGA Deadlines, Competitions & Student Utils) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Critical SIGA Deadlines Widget */}
            <div className="bg-white rounded-2xl shadow-xs border border-[#e5eeff] p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#a20513]">
                    <span className="material-symbols-outlined text-[20px]">notification_important</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-[#0b1c30] tracking-tight">
                    Prazos Críticos SIGA
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#ffdad6] text-[#93000a] text-[10px] font-extrabold uppercase">
                  Urgente
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {deadlines.map((dl) => (
                  <div
                    key={dl.id}
                    className="p-3.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff]/60 transition-colors flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-[#0b1c30] leading-snug">
                          {dl.title}
                        </span>
                        <span className="text-[11px] text-[#425064]">
                          {dl.department}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${
                          dl.daysRemaining <= 5
                            ? 'bg-[#a20513] text-white'
                            : 'bg-[#dce9ff] text-[#0b1c30]'
                        }`}
                      >
                        Faltam {dl.daysRemaining} dias
                      </span>
                    </div>

                    <div className="w-full bg-[#d3e4fe] rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          dl.daysRemaining <= 5 ? 'bg-[#a20513]' : 'bg-[#4059aa]'
                        }`}
                        style={{ width: `${dl.progressPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#425064]">
                      <span>{dl.deadlineDateText}</span>
                      <button
                        onClick={onOpenSyncModal}
                        className="text-[#a20513] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                      >
                        {dl.actionText}
                        <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={onOpenSyncModal}
                className="w-full py-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#a20513] text-[13px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">checklist</span>
                <span>Acessar Cronograma Completo SIGA</span>
              </button>
            </div>

            {/* Academic Competitions & Marathons Block */}
            <div className="bg-white rounded-2xl shadow-xs border border-[#e5eeff] p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#dce1ff] flex items-center justify-center text-[#4059aa]">
                    <span className="material-symbols-outlined text-[20px]">terminal</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-[#0b1c30] tracking-tight">
                    Competições & Hackathons
                  </h3>
                </div>
              </div>

              {/* Marathon Card */}
              <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-[#4059aa] text-white text-[10px] font-bold">
                    Oficial CPS
                  </span>
                  <span className="text-[11px] text-[#4059aa] font-bold">
                    1ª Fase Classificatória
                  </span>
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#0b1c30]">
                    Maratona de Programação Inter-Fatecs 2025/1
                  </h4>
                  <p className="text-[12px] text-[#425064] mt-1 leading-relaxed">
                    Times de até 3 alunos competindo em C++, Java, Python e Kotlin. Vagas garantidas para a grande final em São Paulo.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#425064]">
                    Inscrição de squads até <strong>28/Maio</strong>
                  </span>
                  <button
                    onClick={onOpenCreateEventModal}
                    className="px-3.5 py-1 rounded-lg bg-[#4059aa] text-white text-[12px] font-bold hover:bg-[#1d3989] transition-colors cursor-pointer"
                  >
                    Montar Time
                  </button>
                </div>
              </div>

              {/* Sebrae Innovation Challenge */}
              <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#425064]">
                    Inovação Aplicada
                  </span>
                  <span className="text-[11px] text-[#a20513] font-bold">
                    Bolsas R$ 1.200/mês
                  </span>
                </div>
                <h4 className="text-[14px] font-bold text-[#0b1c30]">
                  Desafio de Ideias CPS & Sebrae for Startups
                </h4>
                <p className="text-[12px] text-[#425064] leading-relaxed">
                  Apresente uma solução de impacto para Agritech, Logística ou Saúde Digital desenvolvida no seu Projeto Integrador.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-[#425064]">Pitch Day: 06/Junho</span>
                  <button
                    onClick={onOpenSyncModal}
                    className="text-[12px] text-[#a20513] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    Regulamento
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* System & Institutional Status Widget */}
            <div className="bg-white rounded-2xl shadow-xs border border-[#e5eeff] p-6 flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#425064] uppercase tracking-wider">
                  Status das Plataformas CPS
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Operacional
                </span>
              </div>
              <div className="flex flex-col gap-2 text-[12px]">
                <div className="flex items-center justify-between py-1.5 bg-[#eff4ff] px-3 rounded-lg">
                  <span className="text-[#0b1c30] font-medium">SIGA - Sistema Integrado de Gestão</span>
                  <span className="text-[#425064] font-mono font-bold">100% Online</span>
                </div>
                <div className="flex items-center justify-between py-1.5 bg-[#eff4ff] px-3 rounded-lg">
                  <span className="text-[#0b1c30] font-medium">Teams & Email Institucional CPS</span>
                  <span className="text-[#425064] font-mono font-bold">Normal</span>
                </div>
                <div className="flex items-center justify-between py-1.5 bg-[#eff4ff] px-3 rounded-lg">
                  <span className="text-[#0b1c30] font-medium">Repositório Institucional RI-CPS</span>
                  <span className="text-[#425064] font-mono font-bold">Normal</span>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between text-[#425064] text-[11px]">
                <span>Dúvidas sobre o cronograma?</span>
                <a
                  href="mailto:secretaria@fatec.sp.gov.br"
                  className="text-[#a20513] hover:underline font-bold"
                >
                  Fale com a Secretaria
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
