import moment from "moment-timezone";
import LogRocket from "logrocket";
LogRocket.init("k7c0zg/smart");
// LogRocket.identify("k7c0zg/smart", {
//   name: "Julio Njeza",
//   email: "julioxcoder@gmail.com",

//   // Add your own custom user variables here, ie:
//   subscriptionType: "pro",
// });

const logError = (error: Error & { digest?: string }) => {
  const timestamp = moment()
    .tz("Africa/Dar_es_Salaam")
    .format("YYYY-MMM-DD HH:mm:ss");

  const name = error.name;
  const cause = error.cause;
  const message = error.message;
  const digest = error.digest;
  const stack = error.stack;

  LogRocket.log({
    timestamp,
    name,
    cause,
    message,
    digest,
    stack,
  });
};

export { logError };
