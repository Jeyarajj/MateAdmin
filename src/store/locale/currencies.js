export const currencies = {
  state: {
    availableCurrencies: [
      {id: 1, text: 'EUR', iso: 'eu'},
      {id: 2, text: 'USD', iso: 'us'},
      {id: 3, text: 'JPY', iso: 'jp'},
      {id: 4, text: 'MXN', iso: 'mx'}
    ]
  },
  getters: {
    availableCurrencies: state => state.availableCurrencies
  }
}
