<template>
  <el-row>
    <el-col :span="12">
      <layout-section title="Wedding Cake Pops" size="small">
        <order-item :item="item"/>
      </layout-section>
    </el-col>
    <el-col :span="12">
      <layout-section>
        <h1>Checkout</h1>
        <el-form ref="form"
                 :model="model"
                 :rules="rules">
          <simple-form :fields="fields"
                       :model.sync="model"/>
          <order-summary :price="item.price"/>
          <el-button type="submit">Checkout now</el-button>
        </el-form>
      </layout-section>
    </el-col>
  </el-row>
</template>

<script>
import LayoutSection from '@/components/Layout/Section.vue'
import SimpleForm from '@/components/Form/Simple.vue'
import OrderItem from '@/components/Order/Item.vue'
import OrderSummary from '@/components/Order/Summary.vue'

export default {
  name: 'Checkout',
  components: {
    LayoutSection,
    SimpleForm,
    OrderItem,
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
    },
    fields () {
      return [{
        id: 'name',
        label: 'Cardholder Name',
        rules: {
          isRequired: true
        },
        suffixIcon: 'el-icon-user'
      }, {
        id: 'cardNumber',
        label: 'Card number',
        rules: {
          isRequired: true,
          regex: /^\d{4} ?\d{4} ?\d{4} ?\d{4}$/
        },
        suffixIcon: 'el-icon-bank-card'
      }, {
        id: 'expiryDate',
        label: 'Expiry Date',
        rules: {
          isRequired: true,
          date: true,
          dateFormat: 'MM/YY',
          after: 'today'
        },
        size: 16,
        placeholder: 'MM/YY',
        suffixIcon: 'el-icon-date'
      }, {
        id: 'cvv',
        label: 'CVV',
        rules: {
          isRequired: true,
          regex: /^\d{3}$/
        },
        size: 8
      }]
    },
    model () {
      return {
        name: 'Catalin Vasile',
        cardNumber: '1234 5678 9012 3456',
        expiryDate: '',
        cvv: '12'
      }
    },
    rules () {
      return {}
    }
  }
}
</script>
