export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      header: 'Web Services Enrolment',
      english: 'English',
      french: 'French',
      submit: 'Submit',
      validations: {
        required: '{property} is required',
        minLength: '{property} must be at least {min} characters',
        alpha: '{property} must contain only letters',
        email: '{property} must be a valid email address',
        isBefore: '{property} must be a date before today',
        containsNumber: '{property} must contain at least one number',
        requiredIf: '{property} is required',
        sameAs: 'You must check the box to continue'
      }
    },
    fr: {
      header: 'Inscription aux services Web',
      english: 'Anglais',
      french: 'Français',
      submit: 'Soumettre',
      validations: {
        required: '{property} est requis',
        minLength: '{property} doit contenir au moins {min} caractères',
        alpha: '{property} doit contenir uniquement des lettres',
        email: '{property} doit être une adresse e-mail valide',
        isBefore: `{property} doit être une date antérieure à aujourd'hui`,
        containsNumber: '{property} doit contenir au moins un chiffre',
        requiredIf: '{property} est requis',
        sameAs: 'Vous devez cocher la case pour continuer'
      }
    }
  }
}));
