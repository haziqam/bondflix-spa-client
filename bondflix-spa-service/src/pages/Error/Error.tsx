import React from 'react';
import { ErrorContent } from './Error.components.tsx'; 
import './Error.styles.css';

const ErrorPage: React.FC = () => {
  const returnToHome = () => {
    
  };

  return (
    <div>
      <ErrorContent onReturnHome={returnToHome} />
    </div>
  );
};

export default ErrorPage;