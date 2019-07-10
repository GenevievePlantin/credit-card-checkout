import { expect } from 'chai'
import { createLocalVue, mount } from '@vue/test-utils'
import moment from 'moment'
import ElementUI from 'element-ui'
import OrderPayment from '@/components/Order/Payment.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
let wrapper = null
const successClass = 'is-success'
const errorClass = 'is-error'
const requiredErrorMessage = 'Please input value'
const invalidErrorMessage = 'Field is invalid'
const invalidDateErrorMessage = 'Please input a valid date'
const futureDateErrorMessage = 'Please input a date in the future'
const dateFormat = 'MM/YY'
let today = null

describe('Order payment form', () => {
  beforeEach(() => {
    wrapper = mount(OrderPayment, { localVue })
    today = moment()
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders a success for a valid cardholder name', () => {
    const formItem = wrapper.find('.el-form-item[name="name"]')
    expect(formItem.classes()).to.not.include(successClass)
    validateSuccessInput(formItem, 'Claire', successClass)
    validateSuccessInput(formItem, 'Claire Desilet', successClass)
    validateSuccessInput(formItem, 'Claire Desilet-Tremblay', successClass)
    validateSuccessInput(formItem, 'Desilet, Claire', successClass)
  })

  it('renders an error for an empty cardholder name', () => {
    const formItem = wrapper.find('.el-form-item[name="name"]')
    expect(formItem.classes()).to.not.include(errorClass)
    validateErrorInput(formItem, '', errorClass, requiredErrorMessage)
    validateErrorInput(formItem, null, errorClass, requiredErrorMessage)
  })

  it('renders an error for an invalid cardholder name', () => {
    const formItem = wrapper.find('.el-form-item[name="name"]')
    expect(formItem.classes()).to.not.include(errorClass)
    // validateErrorInput(formItem, undefined, errorClass, invalidErrorMessage)
    validateErrorInput(formItem, {}, errorClass, invalidErrorMessage)
    validateErrorInput(formItem, '22134', errorClass, invalidErrorMessage)
    validateErrorInput(formItem, 'Claire 1234', errorClass, invalidErrorMessage)
    validateErrorInput(formItem, 'Claire ~Desilet', errorClass, invalidErrorMessage)
    validateErrorInput(formItem, 'Claire.Desilet', errorClass, invalidErrorMessage)
    validateErrorInput(formItem, 'Claire!!!', errorClass, invalidErrorMessage)
  })

  it('renders a success for a valid card number', () => {
    const formItem = wrapper.find('.el-form-item[name="cardNumber"]')
    expect(formItem.classes()).to.not.include(successClass)
    validateSuccessInput(formItem, '1234567890123456', successClass)
    validateSuccessInput(formItem, '1234 5678 9012 3456', successClass)
  })

  it('renders an error for an empty card number', () => {
    const formItem = wrapper.find('.el-form-item[name="cardNumber"]')
    expect(formItem.classes()).to.not.include(errorClass)
    validateErrorInput(formItem, '', errorClass, requiredErrorMessage)
    validateErrorInput(formItem, null, errorClass, requiredErrorMessage)
  })

  it('renders an error for an invalid card number', () => {
    const formItem = wrapper.find('.el-form-item[name="cardNumber"]')
    expect(formItem.classes()).to.not.include(errorClass)
    validateErrorInput(formItem, undefined, errorClass, invalidErrorMessage)
    validateErrorInput(formItem, {}, errorClass, invalidErrorMessage)
    validateErrorInput(formItem, 'test', errorClass, invalidErrorMessage)
    validateErrorInput(formItem, '123456', errorClass, invalidErrorMessage)
    validateErrorInput(formItem, '1234 5678 9012 3456 ', errorClass, invalidErrorMessage)
    validateErrorInput(formItem, '1234 5678 9012 3456 1234', errorClass, invalidErrorMessage)
  })

  it('renders a success for a valid expiry date', () => {
    const formItem = wrapper.find('.el-form-item[name="expiryDate"]')
    expect(formItem.classes()).to.not.include(successClass)
    validateSuccessInput(formItem, today.format(dateFormat), successClass)
    validateSuccessInput(formItem, today.add(2, 'years').format(dateFormat), successClass)
  })

  it('renders an error for an empty expiry date', () => {
    const formItem = wrapper.find('.el-form-item[name="expiryDate"]')
    expect(formItem.classes()).to.not.include(errorClass)
    validateErrorInput(formItem, '', errorClass, requiredErrorMessage)
    validateErrorInput(formItem, null, errorClass, requiredErrorMessage)
  })

  it('renders an error for an invalid expiry date', () => {
    const formItem = wrapper.find('.el-form-item[name="expiryDate"]')
    expect(formItem.classes()).to.not.include(errorClass)
    validateErrorInput(formItem, undefined, errorClass, invalidDateErrorMessage)
    validateErrorInput(formItem, {}, errorClass, invalidDateErrorMessage)
    validateErrorInput(formItem, '13/20', errorClass, invalidDateErrorMessage)
    validateErrorInput(formItem, 'test', errorClass, invalidDateErrorMessage)
    validateErrorInput(formItem, '12/2020', errorClass, invalidDateErrorMessage)
    validateErrorInput(formItem, '01/12/2020', errorClass, invalidDateErrorMessage)
    validateErrorInput(formItem, today.subtract(2, 'months').format(dateFormat), errorClass, futureDateErrorMessage)
    today = moment()
    validateErrorInput(formItem, today.subtract(2, 'years').format(dateFormat), errorClass, futureDateErrorMessage)
  })

  it('renders a success for a valid CVV number', () => {
    const formItem = wrapper.find('.el-form-item[name="cvv"]')
    expect(formItem.classes()).to.not.include(successClass)
    validateSuccessInput(formItem, '123', successClass)
    validateSuccessInput(formItem, '789', successClass)
  })

  it('renders an error for an empty card number', () => {
    const formItem = wrapper.find('.el-form-item[name="cvv"]')
    expect(formItem.classes()).to.not.include(errorClass)
    validateErrorInput(formItem, '', errorClass, requiredErrorMessage)
    validateErrorInput(formItem, null, errorClass, requiredErrorMessage)
  })

  it('renders an error for an invalid card number', () => {
    const formItem = wrapper.find('.el-form-item[name="cvv"]')
    expect(formItem.classes()).to.not.include(errorClass)
    validateErrorInput(formItem, undefined, errorClass, invalidErrorMessage)
    validateErrorInput(formItem, {}, errorClass, invalidErrorMessage)
    validateErrorInput(formItem, 'eee', errorClass, invalidErrorMessage)
    validateErrorInput(formItem, '123456', errorClass, invalidErrorMessage)
    validateErrorInput(formItem, '12e', errorClass, invalidErrorMessage)
    validateErrorInput(formItem, '15', errorClass, invalidErrorMessage)
  })
})

function validateSuccessInput (formItem, newValue, classToValidate) {
  const input = formItem.find('input')
  input.setValue(newValue)
  input.trigger('blur')
  expect(formItem.classes()).to.include(classToValidate)
}

function validateErrorInput (formItem, newValue, classToValidate, messageToValidate) {
  const input = formItem.find('input')
  input.setValue(newValue)
  input.trigger('blur')
  expect(formItem.classes()).to.include(classToValidate)
  const errorElement = formItem.find('.el-form-item__error')
  expect(errorElement.text()).to.equal(messageToValidate)
}
