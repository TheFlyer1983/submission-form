export default defineEventHandler(async () => {
  return [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      required: true
    },
    {
      label: 'Email',
      name: 'email',
      type: 'text',
      required: true
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      required: true
    },
    {
      label: 'Date of Birth',
      name: 'date_of_birth',
      type: 'date',
      required: false
    },
    {
      label: 'Services',
      name: 'services',
      type: 'select',
      required: false
    },
    {
      label: 'Please check this box to agree with our terms and conditions',
      name: 'terms_and_conditions',
      type: 'checkbox',
      required: true
    }
  ];
});
