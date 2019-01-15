// import VueApollo from 'vue-apollo'

// import newClientPromiseFunction from './default_api'

// /**
//  * Module resolution here is a promise because the endpoint has to be queried first for Union and Interface types.
//  * Workaround from https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
//  */
// export default async function apolloProviderPromise () {
//   return new Promise((resolve, reject) => {
//     newClientPromiseFunction()
//     .then(
//       (newClient) => {
//         resolve(
//           new VueApollo({
//             defaultClient: newClient
//           })
//         )
//       }
//     )
//   })
// }


// import { ApolloClient } from 'apollo-client'
// import { HttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// const httpLink = new HttpLink({
//   uri: process.env.VUE_APP_GRAPHQL_URL
// })

// /* eslint-disable */
// export const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
//   connectToDevTools: true
// })



import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'http://localhost:22641/Mate/point/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
});