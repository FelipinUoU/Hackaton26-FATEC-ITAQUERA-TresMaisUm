import React, { useState } from 'react';

interface SyncCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SyncCalendarModal: React.FC<SyncCalendarModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const icalUrl = 'https://siga.cps.sp.gov.br/calendario/fatec-2025-1.ics';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(icalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleGoogleSync = () => {
    // Generate Google Calendar add URL for May 2025 semester
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=FATEC+Calendário+Acadêmico+2025/1&details=Cronograma+Oficial+do+Centro+Paula+Souza+e+Prazos+do+SIGA&dates=20250501T080000Z/20250531T200000Z`;
    window.open(googleUrl, '_blank');
  };

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FATEC Voz do Fatecano//Calendario 2025//PT-BR
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Horas Complementares SIGA
DESCRIPTION:Prazo fatal para envio no portal SIGA Centro Paula Souza
DTSTART;VALUE=DATE:20250514
DTEND;VALUE=DATE:20250519
END:VEVENT
BEGIN:VEVENT
SUMMARY:Hackathon AWS Intercampi
DESCRIPTION:Desafio Serverless FATEC
DTSTART;VALUE=DATE:20250514
DTEND;VALUE=DATE:20250515
END:VEVENT
BEGIN:VEVENT
SUMMARY:Maratona Inter-Fatecs 2025/1
DESCRIPTION:1a Fase Classificatória
DTSTART;VALUE=DATE:20250524
DTEND;VALUE=DATE:20250525
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fatec-calendario-2025-1.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#e5eeff] overflow-hidden flex flex-col">
        <div className="p-6 bg-[#eff4ff] border-b border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4059aa] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">sync</span>
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-[#0b1c30]">Sincronizar com Agenda</h3>
              <p className="text-[12px] text-[#425064]">
                Integre prazos com sua conta @alunos.cps.sp.gov.br
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

        <div className="p-6 flex flex-col gap-4">
          <div className="p-3.5 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] text-[13px] text-[#0b1c30] leading-relaxed">
            Ao sincronizar, todos os prazos do SIGA (entregas de TCC, envio de horas, avaliações P1/P2) e eventos aparecerão automaticamente no seu aplicativo de calendário com notificações prévias.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleGoogleSync}
              className="p-3.5 rounded-xl border border-[#dce9ff] hover:border-[#4059aa] hover:bg-[#eff4ff] text-left transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[13px] text-[#0b1c30] group-hover:text-[#4059aa]">
                  Google Agenda
                </span>
                <span className="material-symbols-outlined text-[#4059aa] text-[20px]">
                  open_in_new
                </span>
              </div>
              <span className="text-[11px] text-[#425064]">
                Vincular à conta institucional Google Workspace CPS
              </span>
            </button>

            <button
              onClick={handleDownloadIcs}
              className="p-3.5 rounded-xl border border-[#dce9ff] hover:border-[#a20513] hover:bg-[#eff4ff] text-left transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[13px] text-[#0b1c30] group-hover:text-[#a20513]">
                  Arquivo iCal (.ics)
                </span>
                <span className="material-symbols-outlined text-[#a20513] text-[20px]">
                  download
                </span>
              </div>
              <span className="text-[11px] text-[#425064]">
                Apple Calendar, Outlook e outros clientes locais
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-1.5 pt-2">
            <span className="text-[12px] font-semibold text-[#0b1c30]">
              Link direto de assinatura WebCal / iCal
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={icalUrl}
                className="flex-1 px-3 py-2 bg-[#f8f9ff] border border-[#dce9ff] rounded-xl text-[12px] font-mono text-[#425064] select-all"
              />
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-xl bg-[#4059aa] text-white text-[12px] font-bold hover:bg-[#1d3989] transition-colors shrink-0 cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#eff4ff] text-[#0b1c30] text-[13px] font-semibold hover:bg-[#dce9ff] transition-colors cursor-pointer"
            >
              Concluído
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
