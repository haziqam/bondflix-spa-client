import React from 'react';

export function ErrorContent() {
  return (
    <div className="error-content">
      <img
        src="https://via.placeholder.com/150" 
        alt="Error"
        className="error-image"
      />
      <div className="error-text">
        <h1 className="error-heading">Sorry, something went wrong</h1>
        <p className="error-description">
          We can't seem to find the page you're looking for.
        </p>
      </div>
    </div>
  );
}

export default ErrorContent;
