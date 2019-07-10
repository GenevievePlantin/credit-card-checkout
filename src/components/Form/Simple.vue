<template>
  <el-row :gutter="20">
    <el-col v-for="field in fields"
            :key="field.id"
            :span="field.size || 24">
      <el-form-item :label="field.label"
                    :prop="field.id">
        <el-input :placeholder="field.placeholder"
                  v-model="model[field.id]"
                  :suffix-icon="field.suffixIcon"/>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SimpleForm',
  props: {
    fields: {
      type: Array,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  }
}
</script>
