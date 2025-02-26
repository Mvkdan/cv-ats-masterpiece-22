
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Download, Plus, Trash2, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { saveToLocalStorage, loadFromLocalStorage } from "@/utils/storage";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const languageLevels = [
  "Débutant",
  "Intermédiaire",
  "Avancé",
  "Bilingue",
  "Langue Maternelle"
];

interface Skill {
  id: string;
  name: string;
}

interface ProjectTechnology {
  id: string;
  name: string;
}

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
  technologies: ProjectTechnology[];
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
    skills: [] as Skill[],
    experience: [] as Experience[],
    education: [] as Education[],
    projects: [] as Project[],
    certificates: [] as Certificate[],
    languages: [] as Language[],
  });

  const [newSkill, setNewSkill] = useState("");
  const [newTechnology, setNewTechnology] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      // Assurer la rétrocompatibilité avec l'ancien format des compétences
      if (typeof savedData.skills === 'string') {
        savedData.skills = savedData.skills.split(',').map((skill: string) => ({
          id: Date.now().toString() + Math.random(),
          name: skill.trim()
        })).filter((skill: Skill) => skill.name);
      }
      // Assurer la rétrocompatibilité avec l'ancien format des technologies de projet
      savedData.projects = savedData.projects.map((project: any) => ({
        ...project,
        technologies: Array.isArray(project.technologies) ? project.technologies : 
          project.technologies.split(',').map((tech: string) => ({
            id: Date.now().toString() + Math.random(),
            name: tech.trim()
          })).filter((tech: ProjectTechnology) => tech.name)
      }));
      setCvData(savedData);
      toast({
        title: "Données restaurées",
        description: "Vos données précédentes ont été chargées avec succès.",
      });
    }
  }, []);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      saveToLocalStorage(cvData);
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [cvData]);

  useEffect(() => {
    const sections = {
      contact: !!cvData.fullName && !!cvData.email,
      summary: !!cvData.summary,
      experience: cvData.experience.length > 0,
      education: cvData.education.length > 0,
      skills: cvData.skills.length > 0,
      projects: cvData.projects.length > 0,
      certificates: cvData.certificates.length > 0,
      languages: cvData.languages.length > 0,
    };

    const completedSections = Object.values(sections).filter(Boolean).length;
    const totalSections = Object.keys(sections).length;
    setProgress((completedSections / totalSections) * 100);
  }, [cvData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now().toString(), name: newSkill.trim() }],
    }));
    setNewSkill("");
  };

  const removeSkill = (skillId: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== skillId),
    }));
  };

  const addTechnologyToProject = (projectId: string) => {
    if (!newTechnology.trim()) return;
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            technologies: [...project.technologies, { id: Date.now().toString(), name: newTechnology.trim() }],
          };
        }
        return project;
      }),
    }));
    setNewTechnology("");
  };

  const removeTechnologyFromProject = (projectId: string, techId: string) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            technologies: project.technologies.filter((tech) => tech.id !== techId),
          };
        }
        return project;
      }),
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
        technologies: [],
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
    saveToLocalStorage(cvData);
    toast({
      title: "Succès !",
      description: "Votre CV a été enregistré.",
    });
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('cv-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'mm',
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('mon-cv.pdf');

      toast({
        title: "Succès !",
        description: "Votre CV a été téléchargé au format PDF.",
      });
    } catch (error) {
      console.error('Erreur lors de l\'export :', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'export du CV.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progression du CV</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8 bg-white shadow-lg h-fit sticky top-8" id="cv-preview">
            <div className="space-y-6">
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

              {cvData.summary && (
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Résumé Professionnel</h2>
                  <p className="text-gray-600">{cvData.summary}</p>
                </section>
              )}

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

              {cvData.projects.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Projets</h2>
                  <div className="space-y-4">
                    {cvData.projects.map((project) => (
                      <div key={project.id} className="border-b pb-4">
                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                        <p className="text-gray-600 mt-1">{project.description}</p>
                        {project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.technologies.map((tech) => (
                              <span key={tech.id} className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                {tech.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {cvData.skills.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Compétences</h2>
                  <div className="flex flex-wrap gap-2">
                    {cvData.skills.map((skill) => (
                      <span key={skill.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}

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

          <div className="space-y-6">
            <div className="flex justify-end space-x-4 mb-6">
              <Button 
                onClick={handleSave}
                variant="outline"
                className="bg-white"
              >
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </Button>
              <Button 
                onClick={handleExportPDF}
                variant="default"
                className="bg-primary hover:bg-primary/90"
              >
                <Download className="mr-2 h-4 w-4" />
                Télécharger PDF
              </Button>
            </div>

            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="summary">Résumé</TabsTrigger>
                <TabsTrigger value="experience">Expérience</TabsTrigger>
                <TabsTrigger value="education">Formation</TabsTrigger>
                <TabsTrigger value="projects">Projets</TabsTrigger>
                <TabsTrigger value="skills">Compétences</TabsTrigger>
                <TabsTrigger value="certificates">Certifications</TabsTrigger>
                <TabsTrigger value="languages">Langues</TabsTrigger>
              </TabsList>

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

              <TabsContent value="summary" className="space-y-4 mt-4">
                <Textarea
                  placeholder="Écrivez un bref résumé professionnel..."
                  name="summary"
                  value={cvData.summary}
                  onChange={handleInputChange}
                  className="min-h-[200px]"
                />
              </TabsContent>

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
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Ajouter une technologie"
                            value={newTechnology}
                            onChange={(e) => setNewTechnology(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addTechnologyToProject(project.id);
                              }
                            }}
                          />
                          <Button 
                            variant="outline" 
                            onClick={() => addTechnologyToProject(project.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span key={tech.id} className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm">
                              {tech.name}
                              <button
                                onClick={() => removeTechnologyFromProject(project.id, tech.id)}
                                className="text-gray-500 hover:text-red-500"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
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

              <TabsContent value="skills" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ajouter une compétence"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      onClick={addSkill}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cvData.skills.map((skill) => (
                      <span key={skill.id} className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm">
                        {skill.name}
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className