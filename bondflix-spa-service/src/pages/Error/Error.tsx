import React from 'react';
import ErrorContent from './Error.components'; 
import './Error.styles.css';

export function Error() {
  return (
    <div className="error-container">
      <ErrorContent />
    </div>
  );
}

export default Error;
