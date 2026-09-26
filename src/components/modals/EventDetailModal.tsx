import React from 'react';
import { CalendarEvent } from '../../types';

interface EventDetailModalProps {
  event: CalendarEvent | null;
  onClose: () => void;
  onSyncOne: (event: CalendarEvent) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onSyncOne,
}) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#e5eeff] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#eff4ff] border-b border-[#e5eeff] flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c62828] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">event</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#ffdad6] text-[#a20513] uppercase">
                  {event.type.toUpperCase()}
                </span>
                {event.isUrgent && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdad6] text-[#ba1a1a] uppercase">
                    Prazo Crítico
                  </span>
                )}
                {event.isToday && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#a20513] text-white uppercase">
                    Hoje
                  </span>
                )}
              </div>
              <h3 className="font-bold text-[17px] text-[#0b1c30] leading-snug">
                {event.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5b403d] hover:bg-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body Info */}
        <div className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3 p-3 bg-[#f8f9ff] rounded-xl border border-[#e5eeff]">
            <div className="flex items-center gap-2 text-[#425064] text-[13px]">
              <span className="material-symbols-outlined text-[18px] text-[#4059aa]">
                calendar_today
              </span>
              <span>
                {event.day} de Maio de {event.year}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#425064] text-[13px]">
              <span className="material-symbols-outlined text-[18px] text-[#a20513]">
                location_on
              </span>
              <span className="truncate">{event.campus}</span>
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#5b403d] mb-1.5">
              Sobre a Atividade / Prazo
            </h4>
            <p className="text-[14px] text-[#0b1c30] leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="p-3 bg-[#eff4ff] rounded-xl flex items-center justify-between text-[12px]">
            <span className="text-[#425064]">Sistema Oficial Responsável:</span>
            <span className="font-bold text-[#0b1c30]">Centro Paula Souza / SIGA</span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              onClick={() => onSyncOne(event)}
              className="px-4 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#4059aa] text-[12px] font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">event_available</span>
              Sincronizar no Google Agenda
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#a20513] text-white hover:bg-[#c62828] text-[12px] font-bold transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
