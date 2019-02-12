import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import fetch from 'unfetch'

const newAPIHttpLink = new HttpLink({
  uri: "http://192.168.0.5:22641/Mate/point/graphql",
  credentials: 'same-origin'
})

/**
 * Module resolution here is a promise because the endpoint has to be queried first for Union and Interface types.
 * Workaround from https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
 */
export default async function newClientPromise () {
  return new Promise((resolve, reject) => {
    fetch('http://192.168.0.5:22641/Mate/point/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            {
              __schema {
                types {
                  kind
                  name
                  possibleTypes {
                    name
                  }
                }
              }
            }
          `
      })
    })
      .then(result => result.json())
      .then(schemaData => {
        // here we're filtering out any type information unrelated to unions or interfaces
        const filteredData = schemaData.data.__schema.types.filter(
          type => type.possibleTypes !== null
        )
        schemaData.data.__schema.types = filteredData

        // Middleware for adding localStorage token
        const newAPIHeaderTokenMiddlewareLink = new ApolloLink(
          (operation, forward) => {
            operation.setContext({
              headers: {
                'mate-api-client-token': localStorage.getItem('token') || null
              }
            })
            return forward(operation)
          }
        )

        // new api client combining both http link + header token middleware
        const newAPI = newAPIHeaderTokenMiddlewareLink.concat(newAPIHttpLink)

        resolve(
          new ApolloClient({
            link: newAPI,
            cache: new InMemoryCache({
              fragmentMatcher: new IntrospectionFragmentMatcher({
                introspectionQueryResultData: schemaData.data
              })
            }),
            connectToDevTools: true
          })
        )
      })
  })
}
