import React, { useState } from 'react';
import { UserProfileData } from '../../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfileData;
  onSave: (updated: Partial<UserProfileData>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [courseSemester, setCourseSemester] = useState(profile.courseSemester);
  const [campus, setCampus] = useState(profile.campus);
  const [github, setGithub] = useState(profile.socialLinks.github);
  const [linkedin, setLinkedin] = useState(profile.socialLinks.linkedin);
  const [lattes, setLattes] = useState(profile.socialLinks.lattes);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      handle,
      courseSemester,
      campus,
      socialLinks: {
        github,
        githubUrl: `https://${github}`,
        linkedin,
        linkedinUrl: `https://${linkedin}`,
        lattes,
        lattesUrl: `https://${lattes}`,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#e5eeff] overflow-hidden flex flex-col">
        <div className="p-6 bg-[#eff4ff] border-b border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#a20513] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-[#0b1c30]">Editar Perfil Acadêmico</h3>
              <p className="text-[12px] text-[#425064]">Atualize suas informações visíveis na rede</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5b403d] hover:bg-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">Nome Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">Handle / @</label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">Curso & Semestre</label>
              <input
                type="text"
                value={courseSemester}
                onChange={(e) => setCourseSemester(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">Campus FATEC</label>
              <input
                type="text"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">Repositório GitHub</label>
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">LinkedIn Perfil</label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">Currículo Lattes CNPq</label>
            <input
              type="text"
              value={lattes}
              onChange={(e) => setLattes(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-[#e5eeff] flex justify-end gap-3">
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
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
