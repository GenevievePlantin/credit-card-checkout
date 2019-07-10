<template>
  <div class="section"
       :class="{'is-small': size === 'small'}">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'LayoutSection',
  props: {
    size: {
      type: String,
      default: 'large'
    }
  }
}
</script>
