<template>
  <el-row>
    <el-col :span="12">
      <layout-section size="small">
        <order-item :item="item"/>
      </layout-section>
    </el-col>
    <el-col :span="12">
      <layout-section>
        <h1>Checkout</h1>
        <order-payment>
          <order-summary :price="item.price"/>
        </order-payment>
      </layout-section>
    </el-col>
  </el-row>
</template>

<script>
import LayoutSection from '@/components/Layout/Section.vue'
import OrderItem from '@/components/Order/Item.vue'
import OrderPayment from '@/components/Order/Payment.vue'
import OrderSummary from '@/components/Order/Summary.vue'

export default {
  name: 'Checkout',
  components: {
    LayoutSection,
    OrderItem,
    OrderPayment,
    OrderSummary
  },
  computed: {
    item () {
      return {
        name: 'Wedding Cake Pops',
        description: '6 pcs/set',
        price: 69.99,
        img: '/cake.png'
      }
    }
  }
}
</script>
