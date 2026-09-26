import React, { useState } from 'react';
import { JOBS_LIST } from '../data/mockData';

export const JobsView: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const handleApply = (id: string, role: string) => {
    if (appliedJobs.includes(id)) {
      alert(`Você já demonstrou interesse na oportunidade de ${role}.`);
    } else {
      setAppliedJobs([...appliedJobs, id]);
      alert(`Inscrição enviada com sucesso para o banco de estágios conveniados CPS! Boa sorte!`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 w-full flex flex-col gap-6">
      {/* Banner */}
      <div className="bg-[#eff4ff] rounded-2xl p-6 sm:p-8 border border-[#e5eeff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#4059aa] uppercase tracking-wider bg-[#dce1ff] px-3 py-1 rounded-full">
            Convênios Oficiais de Estágio CPS
          </span>
          <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#0b1c30] tracking-tight mt-2">
            Central de Carreiras & Vagas para Alunos FATEC
          </h1>
          <p className="text-[14px] text-[#425064] mt-1 max-w-2xl">
            Oportunidades com empresas parceiras aprovadas pelo Centro Paula Souza com validação facilitada de TCE e horas complementares no SIGA.
          </p>
        </div>
      </div>

      {/* SIGA Tips Box */}
      <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#a20513] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[24px]">verified</span>
        </div>
        <div className="flex-1">
          <h3 className="text-[14px] font-bold text-[#0b1c30]">
            Instrução de Validação de Estágio no SIGA (Prazo Semestral)
          </h3>
          <p className="text-[13px] text-[#425064] mt-0.5 leading-relaxed">
            Certifique-se de que o Termo de Compromisso de Estágio (TCE) possua assinatura digital qualificada (Gov.br) antes de protocolar no SIGA. Relatórios intermediários devem ser assinados pelo supervisor da empresa e professor orientador de estágio.
          </p>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {JOBS_LIST.map((job) => {
          const isApplied = appliedJobs.includes(job.id);
          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-bold text-[#a20513] bg-[#ffdad6] px-2.5 py-0.5 rounded-full">
                    {job.company}
                  </span>
                  <span className="text-[11px] text-[#5b403d] font-semibold">{job.postedAgo}</span>
                </div>

                <h3 className="text-[16px] font-bold text-[#0b1c30] mb-2 leading-snug">
                  {job.role}
                </h3>

                <div className="flex items-center gap-2 text-[12px] text-[#425064] mb-3">
                  <span className="material-symbols-outlined text-[16px] text-[#4059aa]">
                    location_on
                  </span>
                  <span>{job.type}</span>
                </div>

                <div className="p-3 bg-[#eff4ff] rounded-xl text-[12px] font-bold text-[#0b1c30] mb-3">
                  Bolsa Auxílio: <span className="text-[#a20513] font-mono">{job.stipend}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#4059aa] text-[11px] font-bold font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#eff4ff] flex items-center justify-between gap-3">
                <span className="text-[11px] text-[#5b403d]">{job.deadline}</span>
                <button
                  onClick={() => handleApply(job.id, job.role)}
                  className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                    isApplied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#a20513] hover:bg-[#c62828] text-white shadow-xs'
                  }`}
                >
                  {isApplied ? 'Inscrito ✓' : 'Candidatar-se'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
