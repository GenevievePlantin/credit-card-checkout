// mixin rather than filter because of the summary-row of element-ui's table
export default {
  methods: {
    currency (value) {
      const parsedValue = parseFloat(value)
      if (isNaN(parsedValue)) return value
      return `$${value.toFixed(2)}`
    }
  }
}
