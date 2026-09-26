import React, { useState } from 'react';
import { COURSES_DIRECTORY } from '../data/mockData';

interface CoursesViewProps {
  onSelectCourse?: (code: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = () => {
  const [selectedCourse, setSelectedCourse] = useState(COURSES_DIRECTORY[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 w-full flex flex-col gap-6">
      {/* Header */}
      <div className="bg-[#eff4ff] rounded-2xl p-6 sm:p-8 border border-[#e5eeff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#a20513] uppercase tracking-wider bg-[#ffdad6] px-3 py-1 rounded-full">
            Diretório de Cursos & Matérias CPS
          </span>
          <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#0b1c30] tracking-tight mt-2">
            Hub Acadêmico de Graduação Tecnológica
          </h1>
          <p className="text-[14px] text-[#425064] mt-1 max-w-2xl">
            Acesse ementas oficiais, repositórios de Projetos Integradores (PI), grupos de estudo por semestre e fóruns de turmas de todas as Fatecs.
          </p>
        </div>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {COURSES_DIRECTORY.map((course) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              selectedCourse.id === course.id
                ? 'bg-white border-[#a20513] shadow-md ring-2 ring-[#a20513]/20'
                : 'bg-white border-[#e5eeff] hover:bg-[#eff4ff] shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-2.5 py-1 rounded-lg text-white font-extrabold text-[12px]"
                  style={{ backgroundColor: course.color }}
                >
                  {course.code}
                </span>
                <span className="text-[12px] font-mono text-[#5b403d] font-semibold">
                  {course.members} alunos
                </span>
              </div>
              <h3 className="text-[16px] font-bold text-[#0b1c30] mb-1.5">
                {course.name}
              </h3>
              <p className="text-[13px] text-[#425064] leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#eff4ff] flex items-center justify-between text-[12px] font-bold text-[#a20513]">
              <span>Ver Matérias & Semestres</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Course Detail */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e5eeff] shadow-xs flex flex-col gap-5">
        <div className="flex items-center gap-3 pb-3 border-b border-[#eff4ff]">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-[14px]"
            style={{ backgroundColor: selectedCourse.color }}
          >
            {selectedCourse.code}
          </span>
          <div>
            <h2 className="text-[20px] font-bold text-[#0b1c30]">
              {selectedCourse.name} — Matérias em Destaque
            </h2>
            <p className="text-[12px] text-[#425064]">
              Grade curricular de referência do Centro Paula Souza
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { sem: '1º Ciclo', subj: 'Algoritmos & Lógica', ch: '80h', prof: 'Prof. Marcos' },
            { sem: '2º Ciclo', subj: 'Engenharia de Software I', ch: '80h', prof: 'Profa. Denise' },
            { sem: '3º Ciclo', subj: 'Estruturas de Dados (C++)', ch: '80h', prof: 'Prof. Carlos' },
            { sem: '4º Ciclo', subj: 'Projeto Integrador (Web/API)', ch: '80h', prof: 'Coord. Nelson' },
            { sem: '5º Ciclo', subj: 'Sistemas Distribuídos & Cloud', ch: '80h', prof: 'Prof. André' },
            { sem: '6º Ciclo', subj: 'Segurança da Informação', ch: '80h', prof: 'Profa. Luciana' },
            { sem: '6º Ciclo', subj: 'Trabalho de Conclusão (TCC)', ch: '120h', prof: 'Banca Examinadora' },
            { sem: 'Eletiva', subj: 'Inteligência Artificial Aplicada', ch: '40h', prof: 'Prof. Roberto' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#a20513] bg-[#ffdad6] px-2 py-0.5 rounded">
                  {item.sem}
                </span>
                <h4 className="text-[13px] font-bold text-[#0b1c30] mt-2 leading-snug">
                  {item.subj}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-[#dce9ff]/60 flex items-center justify-between text-[11px] text-[#5b403d]">
                <span>{item.prof}</span>
                <span className="font-mono font-bold">{item.ch}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
