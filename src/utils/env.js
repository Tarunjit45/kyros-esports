/**
 * Environment configuration utility
 * Provides type-safe access to environment variables with fallbacks
 */

const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID',
  'REACT_APP_FIREBASE_MEASUREMENT_ID',
];

/**
 * Validates that all required environment variables are set
 * @throws {Error} If any required environment variables are missing
 */
const validateEnv = () => {
  if (process.env.NODE_ENV === 'test') return;
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars.join(', '));
    if (process.env.NODE_ENV === 'development') {
      console.warn('Running in development mode with missing environment variables may cause issues.');
    } else {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  }
};

/**
 * Get an environment variable with optional default value
 * @param {string} key - Environment variable name
 * @param {any} [defaultValue] - Default value if variable is not set
 * @returns {string|undefined} The environment variable value or default
 */
const getEnv = (key, defaultValue) => {
  const value = process.env[key];
  if (value === undefined && defaultValue === undefined && requiredEnvVars.includes(key)) {
    console.warn(`Environment variable ${key} is required but not set`);
  }
  return value !== undefined ? value : defaultValue;
};

/**
 * Get a boolean environment variable
 * @param {string} key - Environment variable name
 * @param {boolean} [defaultValue] - Default value if variable is not set
 * @returns {boolean} The boolean value of the environment variable
 */
const getBool = (key, defaultValue = false) => {
  const value = getEnv(key, String(defaultValue));
  return value === 'true' || value === '1' || value === 'yes';
};

/**
 * Get a number environment variable
 * @param {string} key - Environment variable name
 * @param {number} [defaultValue] - Default value if variable is not set or invalid
 * @returns {number} The number value of the environment variable
 */
const getNumber = (key, defaultValue = 0) => {
  const value = getEnv(key, String(defaultValue));
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

export {
  validateEnv,
  getEnv,
  getBool,
  getNumber,
  requiredEnvVars,
};

// Validate environment variables on import
if (process.env.NODE_ENV !== 'test') {
  validateEnv();
}
