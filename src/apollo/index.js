import VueApollo from 'vue-apollo';
import { apolloClient } from '../apollo-controller/index';

/**
 * Module resolution here is a promise because the endpoint has to be queried first for Union and Interface types.
 * Workaround from https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
 */
export default async function apolloProviderPromise() {
  return new Promise((resolve, reject) => {
    resolve(
      new VueApollo({
        defaultClient: apolloClient
      })
    );
  });
}
