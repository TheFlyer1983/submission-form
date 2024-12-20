export default defineEventHandler(async (event) => {
  return [
    {
      label: 'Name',
      name: 'name',
      type: 'text'
    },
    {
      label: 'Email',
      name: 'email',
      type: 'text'
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password'
    },
    {
      label: 'Date of Birth',
      name: 'date_of_birth',
      type: 'date'
    },
    {
      label: 'Services',
      name: 'services',
      type: 'select'
    },
    {
      label: 'Please check this box to agree with our terms and conditions',
      name: 'terms_and_conditions',
      type: 'checkbox'
    }
  ];
});
