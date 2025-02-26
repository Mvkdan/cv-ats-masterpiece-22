
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CVPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: any;
}

const A4_STYLES = {
  width: '210mm',
  minHeight: '297mm',
  padding: '12mm',
  margin: '0 auto',
  backgroundColor: 'white',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lineHeight: '1.2',
  fontFamily: "'Arial', sans-serif",
};

const CVPreview = ({ isOpen, onClose, cvData }: CVPreviewProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[210mm] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Prévisualisation du CV</DialogTitle>
        </DialogHeader>
        <div className="bg-white" style={A4_STYLES}>
          {/* En-tête */}
          <div className="text-center mb-4">
            <h1 className="text-base font-bold tracking-wide text-gray-900">{cvData.fullName}</h1>
            <p className="text-[11px] text-gray-700 mt-0.5">{cvData.jobTitle}</p>
            <div className="flex justify-center flex-wrap gap-2 mt-1 text-[10px] text-gray-600">
              {cvData.email && <span>{cvData.email}</span>}
              {cvData.phone && <span>{cvData.phone}</span>}
              {cvData.location && <span>{cvData.location}</span>}
              {cvData.linkedIn && (
                <a href={cvData.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                  LinkedIn
                </a>
              )}
              {cvData.github && (
                <a href={cvData.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                  GitHub
                </a>
              )}
              {cvData.portfolio && (
                <a href={cvData.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                  Portfolio
                </a>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {/* Résumé */}
            {cvData.summary && (
              <section>
                <h2 className="text-[14px] font-semibold mb-1 text-gray-900 border-b border-gray-200 pb-0.5">
                  Résumé Professionnel
                </h2>
                <p className="text-[11px] text-gray-700 leading-4 mt-1">{cvData.summary}</p>
              </section>
            )}

            {/* Expérience */}
            {cvData.experience.length > 0 && (
              <section>
                <h2 className="text-[14px] font-semibold mb-2 text-gray-900 border-b border-gray-200 pb-0.5">
                  Expérience Professionnelle
                </h2>
                <div className="space-y-2">
                  {cvData.experience.map((exp: any) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h3 className="font-semibold text-[12px] text-gray-900">{exp.title}</h3>
                          <p className="text-[11px] text-gray-700">{exp.company}</p>
                        </div>
                        <div className="text-[10px] text-gray-600 text-right">
                          {exp.startDate} - {exp.current ? "Présent" : exp.endDate}
                          <div>{exp.location}</div>
                        </div>
                      </div>
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="mt-0.5 space-y-0.5">
                          {exp.responsibilities.map((resp: string, index: number) => (
                            <li key={index} className="text-[11px] text-gray-700 pl-2.5 relative before:content-['•'] before:absolute before:left-0 before:text-[8px] before:top-[2px]">
                              {resp}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Formation */}
            {cvData.education.length > 0 && (
              <section>
                <h2 className="text-[14px] font-semibold mb-2 text-gray-900 border-b border-gray-200 pb-0.5">
                  Formation
                </h2>
                <div className="space-y-2">
                  {cvData.education.map((edu: any) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h3 className="font-semibold text-[12px] text-gray-900">{edu.degree}</h3>
                          <p className="text-[11px] text-gray-700">{edu.school}</p>
                        </div>
                        <div className="text-[10px] text-gray-600 text-right">
                          {edu.startDate} - {edu.endDate}
                          <div>{edu.location}</div>
                          {edu.gpa && <div>GPA: {edu.gpa}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* Compétences */}
              {cvData.skills && (
                <section>
                  <h2 className="text-[14px] font-semibold mb-1 text-gray-900 border-b border-gray-200 pb-0.5">
                    Compétences
                  </h2>
                  <div className="text-[11px] text-gray-700 mt-1 leading-relaxed">
                    {cvData.skills}
                  </div>
                </section>
              )}

              {/* Langues */}
              {cvData.languages.length > 0 && (
                <section>
                  <h2 className="text-[14px] font-semibold mb-1 text-gray-900 border-b border-gray-200 pb-0.5">
                    Langues
                  </h2>
                  <div className="space-y-0.5 mt-1">
                    {cvData.languages.map((lang: any) => (
                      <div key={lang.id} className="flex justify-between items-center text-[11px]">
                        <span className="text-gray-900">{lang.name}</span>
                        <span className="text-gray-700">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Projets */}
            {cvData.projects.length > 0 && (
              <section>
                <h2 className="text-[14px] font-semibold mb-2 text-gray-900 border-b border-gray-200 pb-0.5">
                  Projets
                </h2>
                <div className="space-y-2">
                  {cvData.projects.map((project: any) => (
                    <div key={project.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-[12px] text-gray-900">{project.name}</h3>
                        <span className="text-[10px] text-gray-600">{project.technologies}</span>
                      </div>
                      <p className="text-[11px] text-gray-700 mt-0.5">{project.description}</p>
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-600 hover:text-blue-800 mt-0.5 inline-block"
                        >
                          Voir le projet
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {cvData.certificates.length > 0 && (
              <section>
                <h2 className="text-[14px] font-semibold mb-2 text-gray-900 border-b border-gray-200 pb-0.5">
                  Certifications
                </h2>
                <div className="space-y-2">
                  {cvData.certificates.map((cert: any) => (
                    <div key={cert.id}>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h3 className="font-semibold text-[12px] text-gray-900">{cert.name}</h3>
                          <p className="text-[11px] text-gray-700">{cert.issuer}</p>
                        </div>
                        <div className="text-[10px] text-gray-600">{cert.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CVPreview;
