<template>
  <el-form ref="form"
           :model="model"
           :rules="rules">
    <simple-form :fields="fields"
                 :model.sync="model"/>
    <slot/>
    <el-button @click="submitPayment">Checkout now</el-button>
  </el-form>
</template>

<script>
import moment from 'moment'
import SimpleForm from '@/components/Form/Simple.vue'

export default {
  name: 'OrderPayment',
  components: {
    SimpleForm
  },
  data () {
    return {
      model: {
        name: 'Catalin Vasile',
        cardNumber: '1234 5678 9012 3456',
        expiryDate: '',
        cvv: '12'
      }
    }
  },
  computed: {
    fields () {
      return [{
        id: 'name',
        label: 'Cardholder Name',
        isRequired: true,
        regExp: /^[A-Za-z\-, ]+$/,
        suffixIcon: 'el-icon-user'
      }, {
        id: 'cardNumber',
        label: 'Card number',
        isRequired: true,
        regExp: /^\d{4} ?\d{4} ?\d{4} ?\d{4}$/,
        suffixIcon: 'el-icon-bank-card'
      }, {
        id: 'expiryDate',
        label: 'Expiry Date',
        isRequired: true,
        date: true,
        dateFormat: 'MM/YY',
        dateAfter: 'today',
        size: 16,
        placeholder: 'MM/YY',
        suffixIcon: 'el-icon-date'
      }, {
        id: 'cvv',
        label: 'CVV',
        isRequired: true,
        regExp: /^\d{3}$/,
        size: 8
      }]
    },
    rules () {
      let rules = {}
      this.fields.forEach(field => {
        let fieldRules = []
        if (field.isRequired) {
          fieldRules.push({
            required: true,
            message: 'Please input value',
            trigger: 'blur'
          })
        }
        if (field.regExp) {
          fieldRules.push({
            validator: this.validateRegExp,
            regExp: field.regExp,
            trigger: 'blur'
          })
        }
        if (field.date) {
          fieldRules.push({
            validator: this.validateDate,
            dateAfter: field.dateAfter,
            dateFormat: field.dateFormat,
            trigger: 'blur'
          })
        }
        rules[field.id] = fieldRules
      })
      return rules
    }
  },
  methods: {
    validateRegExp (rule, value, callback) {
      if (value.match(new RegExp(rule.regExp))) callback()
      else callback(new Error('Field is invalid'))
    },
    validateDate (rule, value, callback) {
      const momentValue = moment(value, rule.dateFormat, true)
      if (!momentValue.isValid()) {
        callback(new Error('Please input a valid date'))
      } else if (rule.dateAfter) {
        let dateToBeAfter = moment(rule.dateAfter, rule.dateFormat, true)
        if (rule.dateAfter === 'today') dateToBeAfter = moment().format(rule.dateFormat, true)
        if (momentValue.isBefore(dateToBeAfter)) {
          callback(new Error('Please input a date in the future'))
        }
      }
      callback()
    },
    submitPayment () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        }
      })
    }
  }
}
</script>
