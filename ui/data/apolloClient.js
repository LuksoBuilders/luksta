import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:8000/subgraphs/name/gnosisauctionservice",
  cache: new InMemoryCache(),
});

export default client;
