import React, { useState } from 'react';
import { CalendarEvent } from '../../types';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: CalendarEvent) => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [shortTitle, setShortTitle] = useState('');
  const [type, setType] = useState<'cps' | 'provas' | 'maratona' | 'sematec' | 'carreiras'>('sematec');
  const [day, setDay] = useState(15);
  const [campus, setCampus] = useState('Fatec São Paulo');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvt: CalendarEvent = {
      id: `cal-custom-${Date.now()}`,
      title,
      shortTitle: shortTitle.trim() || title.slice(0, 16),
      type,
      dateStr: `2025-05-${String(day).padStart(2, '0')}`,
      day,
      month: 5,
      year: 2025,
      campus,
      description: description || 'Evento submetido por alunos e aprovado para visualização no cronograma unificado FATEC.',
      badgeStyle: type === 'maratona' || type === 'sematec' ? 'secondary' : 'primary',
    };

    onSubmit(newEvt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#e5eeff] overflow-hidden flex flex-col">
        <div className="p-6 bg-[#eff4ff] border-b border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#a20513] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-[#0b1c30]">Notificar Evento ou Prazo</h3>
              <p className="text-[12px] text-[#425064]">
                Adicione workshops, maratonas, bancas ou palestras ao calendário
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

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
              Nome do Evento / Atividade *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Workshop Docker & Kubernetes na Prática"
              className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[14px] text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#a20513]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
                Tipo da Atividade
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none"
              >
                <option value="sematec">Semanas Tech & FETEPS</option>
                <option value="maratona">Maratonas & Hackathons</option>
                <option value="cps">Prazos SIGA / CPS</option>
                <option value="provas">Avaliações / Bancas TCC</option>
                <option value="carreiras">Feira de Estágio & Carreiras</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
                Dia de Maio de 2025
              </label>
              <input
                type="number"
                min={1}
                max={31}
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
              Campus / Local
            </label>
            <select
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none"
            >
              <option value="Todas as Unidades">Todas as Unidades (Geral / Online)</option>
              <option value="Fatec São Paulo">Fatec São Paulo - Bom Retiro</option>
              <option value="Fatec Sorocaba">Fatec Sorocaba</option>
              <option value="Fatec São Caetano do Sul">Fatec São Caetano do Sul</option>
              <option value="Fatec Campinas">Fatec Campinas</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
              Descrição e Requisitos
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes para os alunos participantes, links de inscrição ou regras..."
              className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#e5eeff]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-semibold text-[#425064] hover:bg-[#eff4ff] rounded-xl cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#a20513] text-white text-[13px] font-bold hover:bg-[#c62828] transition-colors cursor-pointer"
            >
              Adicionar ao Calendário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
