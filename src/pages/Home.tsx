
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Créez votre CV 
              <span className="text-primary"> optimisé pour ATS</span>
            </h1>
            <p className="text-lg text-gray-600">
              Générez gratuitement un CV professionnel optimisé pour les systèmes ATS. 
              Simple, rapide et efficace pour maximiser vos chances d'être sélectionné.
            </p>
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md text-lg font-medium"
            >
              Créer mon CV maintenant
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg" />
            <img
              src="/placeholder.svg"
              alt="Exemple de CV"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
