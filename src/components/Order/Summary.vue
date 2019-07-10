<template>
  <el-table :data="summary"
            :summary-method="getTotal"
            show-summary
            :show-header="false">
    <el-table-column prop="description"/>
    <el-table-column prop="price"
                     align="right"/>
  </el-table>
</template>

<script>
export default {
  name: 'OrderSummary',
  props: {
    price: {
      type: Number,
      required: true
    }
  },
  computed: {
    summary () {
      return [{
        description: 'Subtotal',
        price: this.price
      }, {
        description: 'taxes',
        price: 0
      }, {
        description: 'Shipping',
        price: 'Free'
      }]
    }
  },
  methods: {
    getTotal (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Grand Total'
          return
        } else {
          sums[index] = data.reduce(this.sumOfData, 0)
          return
        }
      })
      return sums
    },
    sumOfData (total, item) {
      let price = item.price
      if (price === 'Free') price = 0
      return total + price
    }
  }
}
</script>
