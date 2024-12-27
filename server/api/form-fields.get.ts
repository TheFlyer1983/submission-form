export default defineEventHandler(async () => {
  return [
    {
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
    {
      label: 'Email',
      name: 'email',
      type: 'text',
      required: true,
      parent: null,
      visible: true,
      validationRules: {
        required: true,
        email: true
      }
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      required: true,
      parent: null,
      visible: true,
      validationRules: {
        required: true,
        minLength: 8,
        containsNumber: true
      }
    },
    {
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
    {
      label: 'Services',
      name: 'services',
      type: 'select',
      required: false,
      visible: true,
      validationRules: {}
    },
    {
      label: 'Please specify',
      name: 'services_other',
      type: 'text',
      required: true,
      parent: 'services',
      visible: false,
      validationRules: {
        requiredIf: 'other'
      }
    },
    {
      label: 'Please check this box to agree with our terms and conditions',
      name: 'terms_and_conditions',
      type: 'checkbox',
      required: true,
      parent: null,
      visible: true,
      validationRules: {
        required: true
      }
    }
  ];
});
