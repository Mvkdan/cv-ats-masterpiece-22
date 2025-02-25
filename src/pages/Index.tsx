import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";

const CVGenerator = () => {
  const { toast } = useToast();
  const [cvData, setCvData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    blogs: "",
    twitter: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCvData((prev) => ({
      ...prev,
      [name]: value,
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
          <Card className="p-8 bg-white shadow-lg">
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">{cvData.fullName || "Your Name"}</h1>
              <p className="text-gray-600">{cvData.jobTitle || "Job Title"}</p>
              <div className="space-y-2">
                <p>{cvData.email}</p>
                <p>{cvData.phone}</p>
                <p>{cvData.address}</p>
              </div>
              {/* Add more sections for the CV preview */}
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
                    placeholder="Address"
                    name="address"
                    value={cvData.address}
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
                    placeholder="Portfolio"
                    name="portfolio"
                    value={cvData.portfolio}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Blogs"
                    name="blogs"
                    value={cvData.blogs}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Twitter"
                    name="twitter"
                    value={cvData.twitter}
                    onChange={handleInputChange}
                  />
                </div>
              </TabsContent>

              {/* Other tab contents will be implemented in next iterations */}
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
