<template>
  <div class="order-item">
    <h2>{{item.name}}</h2>
    <p class="description">{{item.description}}</p>
    <p class="price">{{currency(item.price)}}</p>
    <img :src="item.img">
  </div>
</template>

<script>
import currency from '@/mixins/currency'

export default {
  name: 'OrderItem',
  mixins: [currency],
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
