
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
  padding: '15mm',
  margin: '0 auto',
  backgroundColor: 'white',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lineHeight: '1.4',
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
            <h1 className="text-2xl font-bold text-gray-900">{cvData.fullName}</h1>
            <p className="text-base text-gray-600 mt-1">{cvData.jobTitle}</p>
            <div className="flex justify-center flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
              {cvData.email && <span>{cvData.email}</span>}
              {cvData.phone && <span>•&nbsp;{cvData.phone}</span>}
              {cvData.location && <span>•&nbsp;{cvData.location}</span>}
              {cvData.linkedIn && <span>•&nbsp;{cvData.linkedIn}</span>}
              {cvData.github && <span>•&nbsp;{cvData.github}</span>}
              {cvData.portfolio && <span>•&nbsp;{cvData.portfolio}</span>}
            </div>
          </div>

          <div className="space-y-3">
            {/* Résumé */}
            {cvData.summary && (
              <section>
                <h2 className="text-lg font-semibold mb-1 text-gray-800 border-b pb-1">
                  Résumé Professionnel
                </h2>
                <p className="text-sm text-gray-600">{cvData.summary}</p>
              </section>
            )}

            {/* Expérience */}
            {cvData.experience.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-2 text-gray-800 border-b pb-1">
                  Expérience Professionnelle
                </h2>
                <div className="space-y-2">
                  {cvData.experience.map((exp: any) => (
                    <div key={exp.id} className="mb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{exp.title}</h3>
                          <p className="text-gray-600 text-sm">{exp.company}</p>
                        </div>
                        <div className="text-xs text-gray-500 text-right whitespace-nowrap ml-2">
                          <div>{exp.startDate} - {exp.current ? "Présent" : exp.endDate}</div>
                          <div>{exp.location}</div>
                        </div>
                      </div>
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="mt-1 space-y-1">
                          {exp.responsibilities.map((resp: string, index: number) => (
                            <li key={index} className="text-sm text-gray-600 pl-4 relative before:content-['•'] before:absolute before:left-1">
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
                <h2 className="text-lg font-semibold mb-2 text-gray-800 border-b pb-1">
                  Formation
                </h2>
                <div className="space-y-2">
                  {cvData.education.map((edu: any) => (
                    <div key={edu.id} className="mb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                          <p className="text-gray-600 text-sm">{edu.school}</p>
                        </div>
                        <div className="text-xs text-gray-500 text-right whitespace-nowrap ml-2">
                          <div>{edu.startDate} - {edu.endDate}</div>
                          <div>{edu.location}</div>
                          {edu.gpa && <div>Moyenne : {edu.gpa}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Compétences et Langues en colonnes */}
            <div className="grid grid-cols-2 gap-4">
              {/* Compétences */}
              {cvData.skills && (
                <section>
                  <h2 className="text-lg font-semibold mb-1 text-gray-800 border-b pb-1">
                    Compétences
                  </h2>
                  <p className="text-sm text-gray-600">{cvData.skills}</p>
                </section>
              )}

              {/* Langues */}
              {cvData.languages.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold mb-1 text-gray-800 border-b pb-1">
                    Langues
                  </h2>
                  <div className="space-y-1">
                    {cvData.languages.map((lang: any) => (
                      <div key={lang.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-900">{lang.name}</span>
                        <span className="text-gray-600">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Projets */}
            {cvData.projects.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-2 text-gray-800 border-b pb-1">
                  Projets
                </h2>
                <div className="space-y-2">
                  {cvData.projects.map((project: any) => (
                    <div key={project.id} className="text-sm">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        <span className="text-gray-500 text-xs">{project.technologies}</span>
                      </div>
                      <p className="text-gray-600 mt-0.5">{project.description}</p>
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-xs mt-0.5 block"
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
                <h2 className="text-lg font-semibold mb-2 text-gray-800 border-b pb-1">
                  Certifications
                </h2>
                <div className="space-y-2">
                  {cvData.certificates.map((cert: any) => (
                    <div key={cert.id} className="mb-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                          <p className="text-gray-600 text-sm">{cert.issuer}</p>
                        </div>
                        <div className="text-xs text-gray-500">{cert.date}</div>
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
