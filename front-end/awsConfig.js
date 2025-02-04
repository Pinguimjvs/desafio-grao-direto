import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: "us-east-1", // Troque pela sua região da AWS
    userPoolId: "us-east-1_XXXXXX",
    userPoolWebClientId: "XXXXXXXXXXXXXX",
  },
});

export default Amplify;
