
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
    languages: "",
    experience: [] as Experience[],
    education: [] as Education[],
    projects: [] as Project[],
    certificates: [] as Certificate[],
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

  const handleSave = () => {
    toast({
      title: "Success!",
      description: "Your CV has been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Section */}
          <Card className="p-8 bg-white shadow-lg h-fit sticky top-8">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center border-b pb-6">
                <h1 className="text-3xl font-bold text-gray-900">{cvData.fullName || "Your Name"}</h1>
                <p className="text-lg text-gray-600 mt-2">{cvData.jobTitle || "Job Title"}</p>
                <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-600 flex-wrap">
                  {cvData.email && <span>{cvData.email}</span>}
                  {cvData.phone && <span>• {cvData.phone}</span>}
                  {cvData.location && <span>• {cvData.location}</span>}
                  {cvData.linkedIn && <span>• LinkedIn: {cvData.linkedIn}</span>}
                </div>
              </div>

              {/* Summary */}
              {cvData.summary && (
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Professional Summary</h2>
                  <p className="text-gray-600">{cvData.summary}</p>
                </section>
              )}

              {/* Experience */}
              {cvData.experience.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Experience</h2>
                  <div className="space-y-4">
                    {cvData.experience.map((exp) => (
                      <div key={exp.id} className="border-b pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{exp.title}</h3>
                            <p className="text-gray-600">{exp.company}</p>
                          </div>
                          <div className="text-sm text-gray-500 text-right">
                            <div>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                            <div>{exp.location}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {cvData.education.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Education</h2>
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
                            {edu.gpa && <div>GPA: {edu.gpa}</div>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              {cvData.skills && (
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Skills</h2>
                  <p className="text-gray-600">{cvData.skills}</p>
                </section>
              )}

              {/* Languages */}
              {cvData.languages && (
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Languages</h2>
                  <p className="text-gray-600">{cvData.languages}</p>
                </section>
              )}
            </div>
          </Card>

          {/* Form Section */}
          <div className="space-y-6">
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="languages">Languages</TabsTrigger>
              </TabsList>

              {/* Contact Section */}
              <TabsContent value="contact" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Full Name"
                    name="fullName"
                    value={cvData.fullName}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Job Title"
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
                    placeholder="Phone"
                    name="phone"
                    value={cvData.phone}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Location"
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
                    placeholder="Portfolio Website"
                    name="portfolio"
                    value={cvData.portfolio}
                    onChange={handleInputChange}
                  />
                </div>
              </TabsContent>

              {/* Summary Section */}
              <TabsContent value="summary" className="space-y-4 mt-4">
                <Textarea
                  placeholder="Write a brief professional summary..."
                  name="summary"
                  value={cvData.summary}
                  onChange={handleInputChange}
                  className="min-h-[200px]"
                />
              </TabsContent>

              {/* Experience Section */}
              <TabsContent value="experience" className="space-y-6 mt-4">
                {cvData.experience.map((exp, index) => (
                  <Card key={exp.id} className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[index].title = e.target.value;
                          setCvData((prev) => ({ ...prev, experience: newExp }));
                        }}
                      />
                      <Input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[index].company = e.target.value;
                          setCvData((prev) => ({ ...prev, experience: newExp }));
                        }}
                      />
                      <Input
                        placeholder="Start Date"
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[index].startDate = e.target.value;
                          setCvData((prev) => ({ ...prev, experience: newExp }));
                        }}
                      />
                      <Input
                        placeholder="End Date"
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[index].endDate = e.target.value;
                          setCvData((prev) => ({ ...prev, experience: newExp }));
                        }}
                      />
                      <Input
                        placeholder="Location"
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
                      Remove
                    </Button>
                  </Card>
                ))}
                <Button onClick={addExperience} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </TabsContent>

              {/* Education Section */}
              <TabsContent value="education" className="space-y-6 mt-4">
                {cvData.education.map((edu, index) => (
                  <Card key={edu.id} className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[index].degree = e.target.value;
                          setCvData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                      <Input
                        placeholder="School"
                        value={edu.school}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[index].school = e.target.value;
                          setCvData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                      <Input
                        placeholder="Start Date"
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[index].startDate = e.target.value;
                          setCvData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                      <Input
                        placeholder="End Date"
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[index].endDate = e.target.value;
                          setCvData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                      <Input
                        placeholder="Location"
                        value={edu.location}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[index].location = e.target.value;
                          setCvData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                      <Input
                        placeholder="GPA (optional)"
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
                      Remove
                    </Button>
                  </Card>
                ))}
                <Button onClick={addEducation} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </TabsContent>

              {/* Skills Section */}
              <TabsContent value="skills" className="space-y-4 mt-4">
                <Textarea
                  placeholder="List your technical skills, tools, and technologies..."
                  name="skills"
                  value={cvData.skills}
                  onChange={handleInputChange}
                  className="min-h-[200px]"
                />
              </TabsContent>

              {/* Languages Section */}
              <TabsContent value="languages" className="space-y-4 mt-4">
                <Textarea
                  placeholder="List your languages and proficiency levels..."
                  name="languages"
                  value={cvData.languages}
                  onChange={handleInputChange}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4">
              <Button onClick={handleSave} variant="default" className="bg-primary hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4" />
                Save CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVGenerator;
