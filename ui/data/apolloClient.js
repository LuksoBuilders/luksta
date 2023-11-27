import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://www.luksta.io/subgraphs/name/gnosisauctionservice",
  cache: new InMemoryCache(),
});

export default client;
