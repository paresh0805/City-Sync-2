import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Replace with your endpoint
  .setProject("68c6d0e4000ef577e616"); // Replace with your project ID

export const account = new Account(client);
