import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div className={`inline-block ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses[size] || sizeClasses.medium} border-t-transparent border-purple-500`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default LoadingSpinner;
