
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Download, Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  url: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface Language {
  id: string;
  name: string;
  level: string;
}

const CVGenerator = () => {
  const { toast } = useToast();
  const [cvData, setCvData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    summary: "",
    skills: "",
    experience: [] as Experience[],
    education: [] as Education[],
    projects: [] as Project[],
    certificates: [] as Certificate[],
    languages: [] as Language[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addExperience = () => {
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now().toString(),
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        responsibilities: [""],
      }],
    }));
  };

  const addEducation = () => {
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now().toString(),
        degree: "",
        school: "",
        location: "",
        startDate: "",
        endDate: "",
        gpa: "",
      }],
    }));
  };

  const addProject = () => {
    setCvData((prev) => ({
      ...prev,
      projects: [...prev.projects, {
        id: Date.now().toString(),
        name: "",
        description: "",
        technologies: "",
        url: "",
      }],
    }));
  };

  const addCertificate = () => {
    setCvData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, {
        id: Date.now().toString(),
        name: "",
        issuer: "",
        date: "",
      }],
    }));
  };

  const addLanguage = () => {
    setCvData((prev) => ({
      ...prev,
      languages: [...prev.languages, {
        id: Date.now().toString(),
        name: "",
        level: "",
      }],
    }));
  };

  const handleSave = () => {
    toast({
      title: "Succès !",
      description: "Votre CV a été enregistré.",
    });
  };

  const languageLevels = [
    "Débutant",
    "Intermédiaire",
    "Avancé",
    "Courant",
    "Bilingue",
    "Langue maternelle"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section Prévisualisation */}
          <Card className="p-8 bg-white shadow-lg h-fit sticky top-8">
            <div className="space-y-6">
              {/* En-tête */}
              <div className="text-center border-b pb-6">
                <h1 className="text-3xl font-bold text-gray-900">{cvData.fullName || "Votre Nom"}</h1>
                <p className="text-lg text-gray-600 mt-2">{cvData.jobTitle || "Titre du Poste"}</p>
                <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-600 flex-wrap">
                  {cvData.email && <span>{cvData.email}</span>}
                  {cvData.phone && <span>• {cvData.phone}</span>}
                  {cvData.location && <span>• {cvData.location}</span>}
                  {cvData.linkedIn && <span>• LinkedIn: {cvData.linkedIn}</span>}
                </div>
              </div>

              {/* Résumé */}
              {cvData.summary && (
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Résumé Professionnel</h2>
                  <p className="text-gray-600">{cvData.summary}</p>
                </section>
              )}

              {/* Expérience */}
              {cvData.experience.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Expérience Professionnelle</h2>
                  <div className="space-y-4">
                    {cvData.experience.map((exp) => (
                      <div key={exp.id} className="border-b pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{exp.title}</h3>
                            <p className="text-gray-600">{exp.company}</p>
                          </div>
                          <div className="text-sm text-gray-500 text-right">
                            <div>{exp.startDate} - {exp.current ? "Présent" : exp.endDate}</div>
                            <div>{exp.location}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Formation */}
              {cvData.education.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Formation</h2>
                  <div className="space-y-4">
                    {cvData.education.map((edu) => (
                      <div key={edu.id} className="border-b pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{edu.degree}</h3>
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
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Projets</h2>
                  <div className="space-y-4">
                    {cvData.projects.map((project) => (
                      <div key={project.id} className="border-b pb-4">
                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                        <p className="text-gray-600 mt-1">{project.description}</p>
                        <p className="text-gray-500 mt-1">Technologies : {project.technologies}</p>
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:text-blue-800 text-sm mt-1 block">
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
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Certifications</h2>
                  <div className="space-y-4">
                    {cvData.certificates.map((cert) => (
                      <div key={cert.id} className="border-b pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{cert.name}</h3>
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
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Compétences</h2>
                  <p className="text-gray-600">{cvData.skills}</p>
                </section>
              )}

              {/* Langues */}
              {cvData.languages.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Langues</h2>
                  <div className="space-y-2">
                    {cvData.languages.map((lang) => (
                      <div key={lang.id} className="flex justify-between items-center">
                        <span className="text-gray-900">{lang.name}</span>
                        <span className="text-gray-600">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </Card>

          {/* Section Formulaire */}
          <div className="space-y-6">
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="summary">Résumé</TabsTrigger>
                <TabsTrigger value="experience">Expérience</TabsTrigger>
                <TabsTrigger value="education">Formation</TabsTrigger>
                <TabsTrigger value="skills">Compétences</TabsTrigger>
                <TabsTrigger value="projects">Projets</TabsTrigger>
                <TabsTrigger value="certificates">Certifications</TabsTrigger>
                <TabsTrigger value="languages">Langues</TabsTrigger>
              </TabsList>

              {/* Section Contact */}
              <TabsContent value="contact" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nom Complet"
                    name="fullName"
                    value={cvData.fullName}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Titre du Poste"
                    name="jobTitle"
                    value={cvData.jobTitle}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={cvData.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Téléphone"
                    name="phone"
                    value={cvData.phone}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Localisation"
                    name="location"
                    value={cvData.location}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="LinkedIn"
                    name="linkedIn"
                    value={cvData.linkedIn}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="GitHub"
                    name="github"
                    value={cvData.github}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Site Portfolio"
                    name="portfolio"
                    value={cvData.portfolio}
                    onChange={handleInputChange}
                  />
                </div>
              </TabsContent>

              {/* Section Résumé */}
              <TabsContent value="summary" className="space-y-4 mt-4">
                <Textarea
                  placeholder="Écrivez un bref résumé professionnel..."
                  name="summary"
                  value={cvData.summary}
                  onChange={handleInputChange}
                  className="min-h-[200px]"
                />
              </TabsContent>

              {/* Section Expérience */}
              <TabsContent value="experience" className="space-y-6 mt-4">
                {cvData.experience.map((exp, index) => (
                  <Card key={exp.id} className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Titre du Poste"
                        value={exp.title}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[index].title = e.target.value;
                          setCvData((prev) => ({ ...prev, experience: newExp }));
                        }}
                      />
                      <Input
                        placeholder="Entreprise"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[index].company = e.target.value;
                          setCvData((prev) => ({ ...prev, experience: newExp }));
                        }}
                      />
                      <Input
                        placeholder="Date de Début"
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[index].startDate = e.target.value;
                          setCvData((prev) => ({ ...prev, experience: newExp }));
                        }}
                      />
                      <Input
                        placeholder="Date de Fin"
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[index].endDate = e.target.value;
                          setCvData((prev) => ({ ...prev, experience: newExp }));
                        }}
                      />
                      <Input
                        placeholder="Localisation"
                        value={exp.location}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[index].location = e.target.value;
                          setCvData((prev) => ({ ...prev, experience: newExp }));
                        }}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setCvData((prev) => ({
                          ...prev,
                          experience: prev.experience.filter((_, i) => i !== index),
                        }));
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </Button>
                  </Card>
                ))}
                <Button onClick={addExperience} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une Expérience
                </Button>
              </TabsContent>

              {/* Section Formation */}
              <TabsContent value="education" className="space-y-6 mt-4">
                {cvData.education.map((edu, index) => (
                  <Card key={edu.id} className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Diplôme"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[index].degree = e.target.value;
                          setCvData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                      <Input
                        placeholder="École"
                        value={edu.school}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[index].school = e.target.value;
                          setCvData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                      <Input
                        placeholder="Date de Début"
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[index].startDate = e.target.value;
                          setCvData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                      <Input
                        placeholder="Date de Fin"
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[index].endDate = e.target.value;
                          setCvData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                      <Input
                        placeholder="Localisation"
                        value={edu.location}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[index].location = e.target.value;
                          setCvData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                      <Input
                        placeholder="Moyenne (optionnel)"
                        value={edu.gpa}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[index].gpa = e.target.value;
                          setCvData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setCvData((prev) => ({
                          ...prev,
                          education: prev.education.filter((_, i) => i !== index),
                        }));
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </Button>
                  </Card>
                ))}
                <Button onClick={addEducation} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une Formation
                </Button>
              </TabsContent>

              {/* Section Projets */}
              <TabsContent value="projects" className="space-y-6 mt-4">
                {cvData.projects.map((project, index) => (
                  <Card key={project.id} className="p-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <Input
                        placeholder="Nom du Projet"
                        value={project.name}
                        onChange={(e) => {
                          const newProjects = [...cvData.projects];
                          newProjects[index].name = e.target.value;
                          setCvData((prev) => ({ ...prev, projects: newProjects }));
                        }}
                      />
                      <Textarea
                        placeholder="Description du Projet"
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = [...cvData.projects];
                          newProjects[index].description = e.target.value;
                          setCvData((prev) => ({ ...prev, projects: newProjects }));
                        }}
                      />
                      <Input
                        placeholder="Technologies Utilisées"
                        value={project.technologies}
                        onChange={(e) => {
                          const newProjects = [...cvData.projects];
                          newProjects[index].technologies = e.target.value;
                          setCvData((prev) => ({ ...prev, projects: newProjects }));
                        }}
                      />
                      <Input
                        placeholder="URL du Projet"
                        value={project.url}
                        onChange={(e) => {
                          const newProjects = [...cvData.projects];
                          newProjects[index].url = e.target.value;
                          setCvData((prev) => ({ ...prev, projects: newProjects }));
                        }}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setCvData((prev) => ({
                          ...prev,
                          projects: prev.projects.filter((_, i) => i !== index),
                        }));
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </Button>
                  </Card>
                ))}
                <Button onClick={addProject} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un Projet
                </Button>
              </TabsContent>

              {/* Section Certifications */}
              <TabsContent value="certificates" className="space-y-6 mt-4">
                {cvData.certificates.map((cert, index) => (
                  <Card key={cert.id} className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Nom de la Certification"
                        value={cert.name}
                        onChange={(e) => {
                          const newCerts = [...cvData.certificates];
                          newCerts[index].name = e.target.value;
                          setCvData((prev) => ({ ...prev, certificates: newCerts }));
                        }}
                      />
                      <Input
                        placeholder="Organisme"
                        value={cert.issuer}
                        onChange={(e) => {
                          const newCerts = [...cvData.certificates];
                          newCerts[index].issuer = e.target.value;
                          setCvData((prev) => ({ ...prev, certificates: newCerts }));
                        }}
                      />
                      <Input
                        placeholder="Date d'Obtention"
                        type="month"
                        value={cert.date}
                        onChange={(e) => {
                          const newCerts = [...cvData.certificates];
                          newCerts[index].date = e.target.value;
                          setCvData((prev) => ({ ...prev, certificates: newCerts }));
                        }}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setCvData((prev) => ({
                          ...prev,
                          certificates: prev.certificates.filter((_, i) => i !== index),
                        }));
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </Button>
                  </Card>
                ))}
                <Button onClick={addCertificate} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une Certification
                </Button>
              </TabsContent>

              {/* Section Compétences */}
              <TabsContent value="skills" className="space-y-4 mt-4">
                <Textarea
                  placeholder="Listez vos compétences techniques, outils et technologies..."
                  name="skills"
                  value={cvData.skills}
                  onChange={handleInputChange}
                  className="min-h-[200px]"
                />
              </TabsContent>

              {/* Section Langues */}
              <TabsContent value="languages" className="space-y-6 mt-4">
                {cvData.languages.map((lang, index) => (
                  <Card key={lang.id} className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Langue"
                        value={lang.name}
                        onChange={(e) => {
                          const newLangs = [...cvData.languages];
                          newLangs[index].name = e.target.value;
                          setCvData((prev) => ({ ...prev, languages: newLangs }));
                        }}
                      />
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={lang.level}
                        onChange={(e) => {
                          const newLangs = [...cvData.languages];
                          newLangs[index].level = e.target.value;
                          setCvData((prev) => ({ ...prev, languages: newLangs }));
                        }}
                      >
                        <option value="">Sélectionnez un niveau</option>
                        {languageLevels.map((level) => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setCvData((prev) => ({
                          ...prev,
                          languages: prev.languages.filter((_, i) => i !== index),
                        }));
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </Button>
                  </Card>
                ))}
                <Button onClick={addLanguage} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une Langue
                </Button>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4">
              <Button onClick={handleSave} variant="default" className="bg-primary hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4" />
                Enregistrer le CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVGenerator;
