# Incrementer.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=akhtarja_incrementer&metric=alert_status)](https://sonarcloud.io/dashboard?id=akhtarja_incrementer)

## Notes
This application is a REST service that allows users to register using their Google account in exchange for an API key, which allows access to the following Incrementer API endpoints:

|Endpoint|Purpose|
|-|-|
|`GET current`|Returns the current integer value|
|`GET next`|Returns the next integer value|
|`PUT current`|Sets the current integer to a provided value|

### Date
Wednesday, February 12, 2020

### Location of deployed application
|Component|Location|
|-|-|
|Front end|`http://incrementer-app.s3-website-us-east-1.amazonaws.com`|
|Current integer|`curl https://w24rye5hx0.execute-api.us-east-1.amazonaws.com/prod/current -H "Authorization: Bearer [API key]"`|
|Next integer|`curl https://w24rye5hx0.execute-api.us-east-1.amazonaws.com/prod/next -H "Authorization: Bearer [API key]"`|
|Set new integer|`curl -X "PUT" https://w24rye5hx0.execute-api.us-east-1.amazonaws.com/prod/current --data "current=[new integer]" -H "Authorization: Bearer [API key]"`|

### Time spent
This project took approximately 4.5 hours to complete, including documentation and production deployment to AWS.

### Assumptions made
- Use of this application assumes that users have a Google account that they can use to sign in and get an API key.

### Shortcuts/Compromises made
- This was my first time using Google login on anything I've built. Consequently this is a very simple implementation where I just take the user's profile information on login and pass it to my service to create their account. There is no ability to "stay logged in", and navigating away from the site will require a user to log in again. Any existing, persistent login behaviour is driven entirely by Google in the current implementation.
- Since this is deployed to AWS, the resulting URL's are the auto-generated Amazon URL's. In a real life scenario, I would add a certificate and custom domain, as well as a CDN using AWS Cloudfront.
- I kept the out-of-the-box styling for a default React app. I am not a designer, and I have always felt that the best user experiences come from designers and developers working together.

### Stretch goals attempted
- I built a UI for the service, to facilitate account creation. This is a React app hosted as a static site on AWS S3.
- The application allows signup using a user's Google account. If the user is signing in for the first time, a new API key is created and returned to them in the UI, and their current integer is set to 0. If the user has logged in before, they will get their existing API key in the UI, and their current integer is unchanged.
- The API is deployed and available in AWS. The back-end services run in AWS Lambda, triggered by API Gateway HTTP events. The data store to persist a user's current integer is DynamoDB, with their Google Account ID as the primary kay.

### Instructions to run assignment locally
The application has three microservices that need to be deployed to AWS in order to work. The React front end can be run locally once this is complete.

- Install `node`.
- Install `serverless` (`npm install --global serverless`).
- Install the AWS CLI (https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).
- In the Google Developer Console (https://console.developers.google.com/projectcreate), create a new project with new OAuth credentials. Copy the client id for the OAuth client. This will look like a URL that ends with `.apps.googleusercontent.com`.
- Create an environment variable called `GOOGLE_CLIENT_ID_[dev|prod]` with the ID you just copied as the value.
- In AWS IAM create a user with programmatic access and copy the API keys.
- Add a new profile to your local AWS credential files using the API keys you just created: `aws configure --profile incrementer-[dev|prod]`.
- Clone this repo.
- Change to the `db` folder and deploy the service with `serverless deploy --stage dev`.
- Change to the `auth` folder and deploy the service with `npm install && serverless deploy --stage dev`.
- Change to the `integers` folder and deploy the service with `npm install && serverless deploy --stage dev`.
- Change to the `app` folder and run the React app locally with `npm install && npm run start`.
- The app is now running at `localhost:3000`.

To create an optimized production build: `npm run build`.

### What did you not include in your solution that you want us to know about?
I believe everything that was asked for in the assignment has been included here.

### Other information about your submission that you feel it's important to know if applicable
I believe everything notable is covered above.

### Your feedback on the technical challenge
This was a really fun project - and the assignment was well outlined and documented, with enough flexibility to make it my own.
