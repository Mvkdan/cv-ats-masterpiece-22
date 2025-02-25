
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
  padding: '20mm',
  margin: '0 auto',
  backgroundColor: 'white',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  fontFamily: "'IBM Plex Sans', sans-serif",
};

const CVPreview = ({ isOpen, onClose, cvData }: CVPreviewProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[210mm] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair">Prévisualisation du CV</DialogTitle>
        </DialogHeader>
        <div className="bg-white" style={A4_STYLES}>
          {/* En-tête */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-playfair">{cvData.fullName}</h1>
            <p className="text-xl text-gray-600 mt-2 font-inter">{cvData.jobTitle}</p>
            <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600 flex-wrap font-inter">
              {cvData.email && <span>{cvData.email}</span>}
              {cvData.phone && <span>• {cvData.phone}</span>}
              {cvData.location && <span>• {cvData.location}</span>}
              {cvData.linkedIn && <span>• LinkedIn: {cvData.linkedIn}</span>}
              {cvData.github && <span>• GitHub: {cvData.github}</span>}
              {cvData.portfolio && <span>• Portfolio: {cvData.portfolio}</span>}
            </div>
          </div>

          <div className="space-y-6">
            {/* Résumé */}
            {cvData.summary && (
              <section>
                <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2 font-playfair">
                  Résumé Professionnel
                </h2>
                <p className="text-gray-600 leading-relaxed">{cvData.summary}</p>
              </section>
            )}

            {/* Expérience */}
            {cvData.experience.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2 font-playfair">
                  Expérience Professionnelle
                </h2>
                <div className="space-y-4">
                  {cvData.experience.map((exp: any) => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                          <p className="text-gray-600">{exp.company}</p>
                        </div>
                        <div className="text-sm text-gray-500 text-right">
                          <div>{exp.startDate} - {exp.current ? "Présent" : exp.endDate}</div>
                          <div>{exp.location}</div>
                        </div>
                      </div>
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="mt-2 list-disc list-inside text-gray-600 text-sm">
                          {exp.responsibilities.map((resp: string, index: number) => (
                            <li key={index}>{resp}</li>
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
                <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2 font-playfair">
                  Formation
                </h2>
                <div className="space-y-4">
                  {cvData.education.map((edu: any) => (
                    <div key={edu.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                          <p className="text-gray-600">{edu.school}</p>
                        </div>
                        <div className="text-sm text-gray-500 text-right">
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

            {/* Projets */}
            {cvData.projects.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2 font-playfair">
                  Projets
                </h2>
                <div className="space-y-4">
                  {cvData.projects.map((project: any) => (
                    <div key={project.id} className="mb-4">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-gray-600 mt-1">{project.description}</p>
                      <p className="text-gray-500 mt-1">Technologies : {project.technologies}</p>
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm mt-1 block"
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
                <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2 font-playfair">
                  Certifications
                </h2>
                <div className="space-y-4">
                  {cvData.certificates.map((cert: any) => (
                    <div key={cert.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                          <p className="text-gray-600">{cert.issuer}</p>
                        </div>
                        <div className="text-sm text-gray-500">{cert.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Compétences */}
            {cvData.skills && (
              <section>
                <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2 font-playfair">
                  Compétences
                </h2>
                <p className="text-gray-600">{cvData.skills}</p>
              </section>
            )}

            {/* Langues */}
            {cvData.languages.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2 font-playfair">
                  Langues
                </h2>
                <div className="space-y-2">
                  {cvData.languages.map((lang: any) => (
                    <div key={lang.id} className="flex justify-between items-center">
                      <span className="text-gray-900">{lang.name}</span>
                      <span className="text-gray-600">{lang.level}</span>
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
