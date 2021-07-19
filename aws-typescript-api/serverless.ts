import type { AWS } from '@serverless/typescript';

// import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'aws-typescript-api',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'serverlessUser',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { 
    getCityInfo: {
      handler: 'lambdas/getCityInfo.handler',
      events: [
        {
          http: {
            path: 'get-city/{city}',
            method: 'get',
            cors: true,
          }
        }
      ]
    }
   },
};

module.exports = serverlessConfiguration;
