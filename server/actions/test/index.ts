"use server";

export const doSomething = async () => {
  // Simulate a delay of 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error("something went wrong");
};
