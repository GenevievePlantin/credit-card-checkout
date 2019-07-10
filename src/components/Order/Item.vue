<template>
  <div class="order-item">
    <h2>{{item.name}}</h2>
    <p class="description">{{item.description}}</p>
    <p class="price">{{item.price}}</p>
    <img :src="item.img">
  </div>
</template>

<script>
  export default {
    name: 'OrderItem',
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>
