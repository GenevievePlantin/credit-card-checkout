import { expect } from 'chai'
import { createLocalVue, mount } from '@vue/test-utils'
import ElementUI from 'element-ui'
import SimpleForm from '@/components/Form/Simple.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('Simple form', () => {
  it('displays the fied according to specification', () => {
    const fields = [{
      id: 'test',
      label: 'A test',
      suffixIcon: 'el-icon-user',
      size: 8,
      placeholder: 'A placeholder'
    }]
    let model = { test: 'Some first input' }

    const wrapper = mount(SimpleForm, { localVue, propsData: { fields, model } })

    expect(wrapper.find('.el-col').classes()).to.include('el-col-8')
    expect(wrapper.find('.el-form-item[name="test"]').exists()).to.be.true
    const label = wrapper.find('label[for="test"]')
    expect(label.exists()).to.be.true
    expect(label.text()).to.equal('A test')
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).to.equal('A placeholder')
    expect(input.element.value).to.equal('Some first input')
  })

  it('submits the form with valid information', () => {
    const fields = [{
      id: 'test',
      label: 'A test'
    }]
    let model = { test: 'Some first input' }
    const rules = { test: [{
      required: true,
      message: 'Please input value',
      trigger: 'blur'
    }] }

    const wrapper = mount(SimpleForm, { localVue, propsData: { fields, model, rules } })

    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('submit').length).to.equal(1)
  })

  it('does not submit the form with invalid information', () => {
    const fields = [{
      id: 'test',
      label: 'A test'
    }]
    let model = { test: '' }
    const rules = { test: [{
      required: true,
      message: 'Please input value',
      trigger: 'blur'
    }] }

    const wrapper = mount(SimpleForm, { localVue, propsData: { fields, model, rules } })

    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('submit')).to.be.undefined
  })
})
