<template>
  <el-form ref="form"
           :model="model"
           :rules="rules">
    <el-row :gutter="20">
      <el-col v-for="field in fields"
              :key="field.id"
              :span="field.size || 24">
        <el-form-item :label="field.label"
                      :name="field.id"
                      :prop="field.id">
          <el-input :placeholder="field.placeholder"
                    v-model="innerModel[field.id]"
                    :suffix-icon="field.suffixIcon"/>
        </el-form-item>
      </el-col>
    </el-row>
    <slot/>
    <el-button type="success"
               @click="submit">
      {{submitLabel}}
    </el-button>
  </el-form>
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
    },
    rules: {
      type: Object,
      default: () => {}
    },
    submitLabel: {
      type: String,
      default: 'Submit'
    }
  },
  data () {
    return {
      innerModel: Object.assign({}, this.model)
    }
  },
  watch: {
    innerModel: {
      deep: true,
      handler () {
        this.$emit('update:model', this.innerModel)
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit')
          // reset model
          Object.keys(this.innerModel).forEach(key => {
            this.innerModel[key] = ''
          })
        }
      })
    }
  }
}
</script>
