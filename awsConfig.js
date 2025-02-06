import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolClient = new CognitoUserPool({
  UserPoolId: "us-east-1_zC8As2I7i",
  ClientId: "433h4kjc2qh88hjmfvaaa2qbkq",
});

export { userPoolClient };