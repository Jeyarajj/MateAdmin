import * as moment from 'moment-timezone'

export const timezones = {
  state: {
    timezones: moment.tz.names()
  },
  getters: {
    timezones: state => state.timezones
  }
}
