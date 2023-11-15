import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';

interface ErrorContentProps {
  onReturnHome: () => void; 
}

export const ErrorContent: React.FC<ErrorContentProps> = ({ onReturnHome }) => {
  const navigate = useNavigate();

  return (
    <div className="error-container" style={{ backgroundImage: `url('./assets/netflix_bg.png')` }}>
      <div className="error-content">
        <div className="error-text">
          <h1 className="error-heading">Sorry, something went wrong</h1>
          <p className="error-description">
            We can't seem to find the page you're looking for.
          </p>
          <button className="home-button" onClick={() => {
            navigate("/dashboard");
          }}>
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
