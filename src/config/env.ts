const env = process.env.NODE_ENV || 'development';

const development = {
  apiUrl: 'http://localhost:8000/api',
  environment: 'development',
  enableAnalytics: false
};

const production = {
  apiUrl: 'https://api.loozr.io/api',
  environment: 'production',
  enableAnalytics: true
};

const config = {
  development,
  test: development,
  production
};

const configurationValue = config[env]
export default configurationValue;
