<template>
  <el-table :data="summary"
            :summary-method="getTotal"
            show-summary
            :show-header="false"
            :cell-class-name="getCellClass">
    <el-table-column prop="description"/>
    <el-table-column prop="price"
                     align="right"
                     :formatter="setCurrency"/>
  </el-table>
</template>

<script>
import currency from '@/mixins/currency'

export default {
  name: 'OrderSummary',
  mixins: [currency],
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
          return true
        } else {
          sums[index] = this.currency(data.reduce(this.sumOfData, 0))
          return true
        }
      })
      return sums
    },
    sumOfData (total, item) {
      let price = item.price
      if (price === 'Free') price = 0
      return total + price
    },
    getCellClass ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'is-bold'
      } else if (column.property === 'price' && row.price === 'Free') {
        return 'is-green'
      }
      return ''
    },
    setCurrency (row, column, cellValue, index) {
      return this.currency(row[column.property])
    }
  }
}
</script>
