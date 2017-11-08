# Cognito Identity Federation demo


This is a demo app for using AWS Cognito Federated Identities and DynamoDB directly from browser.

The frontend is done using following technologies:

* [Vue js](https://vuejs.org/v2/guide/)
* [AWS Cognito](https://aws.amazon.com/cognito/)

# Webscale trainee program
Want to learn most relevant cloud full stack technologies and get certified? 
### Apply!
 [Webscale trainee program](https://webscale.fi/trainee/)

## Requirements
- Facebook login application for domain http://localhost:8080
- AWS Account with Cognito Identity Pool with external auth provider facebook app id from above
- DynamoDB Table:
    - Table name: 'DEMO_USER'
    - KeySchema: primary hash key: String 'userId'
    - Additional object attributes referenced in UI: status, skills 
- Node 8.5.0
- Variables are configured in webpack.config.js

## Get started

* Install dependencies
```bash
npm install
```

* Run the local dev version
```bash
npm run dev
```

* Build production version
```bash
npm run production
```
