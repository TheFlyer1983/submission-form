export default defineEventHandler(async (event) => {
  const { locale } = getQuery(event);

  return [
    {
      label: locale === 'fr' ? 'Nom' : 'Name',
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
      label: locale === 'fr' ? 'Mot de passe' : 'Password',
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
      label: locale === 'fr' ? 'Date de naissance' : 'Date of Birth',
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
      visible: true
    },
    {
      label: locale === 'fr' ? 'Veuillez préciser' : 'Please specify',
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
      label:
        locale === 'fr'
          ? 'Veuillez cocher cette case pour accepter nos conditions générales'
          : 'Please check this box to agree with our terms and conditions',
      name: 'terms_and_conditions',
      type: 'checkbox',
      required: true,
      parent: null,
      visible: true,
      validationRules: {
        checked: true
      }
    }
  ];
});
