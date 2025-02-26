
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
  padding: '10mm',
  margin: '0 auto',
  backgroundColor: 'white',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lineHeight: '1.15',
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
          <div className="text-center mb-2">
            <h1 className="text-[10px] font-bold tracking-wide text-gray-900">{cvData.fullName}</h1>
            <p className="text-[8px] text-gray-700 mt-0.5">{cvData.jobTitle}</p>
            <div className="flex justify-center flex-wrap gap-1.5 mt-0.5 text-[6px] text-gray-600">
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

          <div className="space-y-2">
            {/* Résumé */}
            {cvData.summary && (
              <section>
                <h2 className="text-[9px] font-semibold mb-0.5 text-gray-900 border-b border-gray-200 pb-0.5">
                  Résumé Professionnel
                </h2>
                <p className="text-[7px] text-gray-700 leading-3 mt-0.5">{cvData.summary}</p>
              </section>
            )}

            {/* Expérience */}
            {cvData.experience.length > 0 && (
              <section>
                <h2 className="text-[9px] font-semibold mb-1 text-gray-900 border-b border-gray-200 pb-0.5">
                  Expérience Professionnelle
                </h2>
                <div className="space-y-1.5">
                  {cvData.experience.map((exp: any) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h3 className="font-semibold text-[8px] text-gray-900">{exp.title}</h3>
                          <p className="text-[7px] text-gray-700">{exp.company}</p>
                        </div>
                        <div className="text-[6px] text-gray-600 text-right">
                          {exp.startDate} - {exp.current ? "Présent" : exp.endDate}
                          <div>{exp.location}</div>
                        </div>
                      </div>
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="mt-0.5 space-y-0.5">
                          {exp.responsibilities.map((resp: string, index: number) => (
                            <li key={index} className="text-[7px] text-gray-700 pl-2 relative before:content-['•'] before:absolute before:left-0 before:text-[5px] before:top-[1px]">
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
                <h2 className="text-[9px] font-semibold mb-1 text-gray-900 border-b border-gray-200 pb-0.5">
                  Formation
                </h2>
                <div className="space-y-1.5">
                  {cvData.education.map((edu: any) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h3 className="font-semibold text-[8px] text-gray-900">{edu.degree}</h3>
                          <p className="text-[7px] text-gray-700">{edu.school}</p>
                        </div>
                        <div className="text-[6px] text-gray-600 text-right">
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

            {/* Compétences */}
            {cvData.skills && (
              <section>
                <h2 className="text-[9px] font-semibold mb-0.5 text-gray-900 border-b border-gray-200 pb-0.5">
                  Compétences
                </h2>
                <div className="text-[7px] text-gray-700 mt-0.5 leading-3">
                  {cvData.skills}
                </div>
              </section>
            )}

            {/* Projets */}
            {cvData.projects.length > 0 && (
              <section>
                <h2 className="text-[9px] font-semibold mb-1 text-gray-900 border-b border-gray-200 pb-0.5">
                  Projets
                </h2>
                <div className="space-y-1.5">
                  {cvData.projects.map((project: any) => (
                    <div key={project.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-semibold text-[8px] text-gray-900">{project.name}</h3>
                        <span className="text-[6px] text-gray-600 ml-2">{project.technologies}</span>
                      </div>
                      <p className="text-[7px] text-gray-700 leading-3">{project.description}</p>
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[6px] text-blue-600 hover:text-blue-800 mt-0.5 inline-block"
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
                <h2 className="text-[9px] font-semibold mb-1 text-gray-900 border-b border-gray-200 pb-0.5">
                  Certifications
                </h2>
                <div className="space-y-1">
                  {cvData.certificates.map((cert: any) => (
                    <div key={cert.id}>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h3 className="font-semibold text-[8px] text-gray-900">{cert.name}</h3>
                          <p className="text-[7px] text-gray-700">{cert.issuer}</p>
                        </div>
                        <div className="text-[6px] text-gray-600">{cert.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Langues */}
            {cvData.languages.length > 0 && (
              <section>
                <h2 className="text-[9px] font-semibold mb-0.5 text-gray-900 border-b border-gray-200 pb-0.5">
                  Langues
                </h2>
                <div className="space-y-0.5 mt-0.5">
                  {cvData.languages.map((lang: any) => (
                    <div key={lang.id} className="flex justify-between items-center text-[7px]">
                      <span className="text-gray-900">{lang.name}</span>
                      <span className="text-gray-700">{lang.level}</span>
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
