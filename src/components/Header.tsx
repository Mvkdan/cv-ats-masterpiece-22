
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
            <FileText className="h-6 w-6" />
            <span>CVBuilder</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/editor"
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm"
            >
              Créer mon CV
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
