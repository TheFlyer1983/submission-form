import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime';

import FormField from './FormField.vue';
import UiInput from '@/components/ui/input/Input.vue';
import UiSelect from '@/components/ui/select/Select.vue';
import UiCheckbox from '@/components/ui/checkbox/Checkbox.vue';

registerEndpoint('/api/services?locale=en', () => [
  {
    label: 'Web Development',
    value: 'web_development'
  },
  {
    label: 'Mobile Development',
    value: 'mobile_development'
  },
  {
    label: 'SEO Services',
    value: 'seo_services'
  },
  {
    label: 'Other',
    value: 'other'
  }
]);

describe('FormField', () => {
  describe('when the field type is text', () => {
    it('should render correctly', async () => {
      const wrapper = await mountSuspended(FormField, {
        props: {
          modelValue: 'Paul',
          field: {
            label: 'Name',
            name: 'name',
            type: 'text',
            required: true,
            parent: null,
            visible: true,
            validationRules: {
              required: true,
              minLength: 2,
              alpha: true
            }
          },
          visible: true,
          locale: 'en'
        }
      });

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.findComponent(UiInput).exists()).toBe(true);
      expect(wrapper.findComponent(UiSelect).exists()).toBe(false);
      expect(wrapper.findComponent(UiCheckbox).exists()).toBe(false);
    });
  });

  describe('when the field type is date', () => {
    it('should render correctly', async () => {
      const wrapper = await mountSuspended(FormField, {
        props: {
          modelValue: 'Paul',
          field: {
            label: 'Date of Birth',
            name: 'date_of_birth',
            type: 'date',
            required: false,
            parent: null,
            visible: true,
            validationRules: {
              isBefore: true
            }
          },
          visible: true,
          locale: 'en'
        }
      });

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.findComponent(UiInput).exists()).toBe(true);
      expect(wrapper.findComponent(UiSelect).exists()).toBe(false);
      expect(wrapper.findComponent(UiCheckbox).exists()).toBe(false);
    });
  });

  describe('when the field type is select', () => {
    it('should render correctly', async () => {
      const wrapper = await mountSuspended(FormField, {
        props: {
          modelValue: 'Paul',
          field: {
            label: 'Services',
            name: 'services',
            type: 'select',
            required: false,
            visible: true
          },
          visible: true,
          locale: 'en'
        }
      });

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.findComponent(UiInput).exists()).toBe(false);
      expect(wrapper.findComponent(UiSelect).exists()).toBe(true);
      expect(wrapper.findComponent(UiCheckbox).exists()).toBe(false);
    });
  });

  describe('when the field type is checkbox', () => {
    it('should render correctly', async () => {
      const wrapper = await mountSuspended(FormField, {
        props: {
          modelValue: true,
          field: {
            label:
              'Please check this box to agree with our terms and conditions',
            name: 'terms_and_conditions',
            type: 'checkbox',
            required: true,
            parent: null,
            visible: true,
            validationRules: {
              checked: true
            }
          },
          visible: true,
          locale: 'en'
        }
      });

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.findComponent(UiInput).exists()).toBe(false);
      expect(wrapper.findComponent(UiSelect).exists()).toBe(false);
      expect(wrapper.findComponent(UiCheckbox).exists()).toBe(true);
    });
  });
});
