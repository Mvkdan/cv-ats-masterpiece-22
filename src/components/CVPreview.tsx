
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CVPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: any;
}

const CVPreview = ({ isOpen, onClose, cvData }: CVPreviewProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Prévisualisation du CV</DialogTitle>
        </DialogHeader>
        <div className="p-6 bg-white">
          {/* En-tête */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{cvData.fullName}</h1>
            <p className="text-xl text-gray-600 mt-2">{cvData.jobTitle}</p>
            <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600 flex-wrap">
              {cvData.email && <span>{cvData.email}</span>}
              {cvData.phone && <span>• {cvData.phone}</span>}
              {cvData.location && <span>• {cvData.location}</span>}
              {cvData.linkedIn && <span>• LinkedIn: {cvData.linkedIn}</span>}
            </div>
          </div>

          {/* Sections du CV */}
          <div className="space-y-8">
            {cvData.summary && (
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  Résumé Professionnel
                </h2>
                <p className="text-gray-600 leading-relaxed">{cvData.summary}</p>
              </section>
            )}

            {cvData.experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  Expérience Professionnelle
                </h2>
                <div className="space-y-6">
                  {cvData.experience.map((exp: any) => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                          <p className="text-gray-600">{exp.company}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          <div>{exp.startDate} - {exp.current ? "Présent" : exp.endDate}</div>
                          <div>{exp.location}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Autres sections similaires */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CVPreview;
