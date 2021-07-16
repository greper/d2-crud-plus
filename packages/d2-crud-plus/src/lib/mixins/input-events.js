import _ from 'lodash'
export default {
  data () {
    return {
      extraEvents: {}
    }
  },
  methods: {
    initExtraEvents (ignores = ['change', 'input']) {
      const extraEvents = {}
      const events = _.omit(this.$listeners, ignores)
      _.forEach(events, (item, key) => {
        extraEvents[key] = (e) => {
          this.$emit(key, e)
        }
      })
      this.extraEvents = extraEvents
    }
  }
}
