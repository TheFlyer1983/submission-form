import {
  alpha,
  minLength,
  required,
  email,
  sameAs,
  helpers,
  requiredIf
} from '@vuelidate/validators';
import type { FormType } from '~~/shared/types';

export const useValidationRules = (form: FormType) => {
  const dayjs = useDayjs()

  const rules = computed(() => ({
    name: {
      required: helpers.withMessage('Name is required', required),
      alpha,
      minLength: helpers.withMessage(
        'Name must contain at least 2 characters',
        minLength(2)
      )
    },
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Email is invalid', email)
    },
    date_of_birth: {
      isBefore: helpers.withMessage(
        'The date must be in the past',
        (value: string) => (value ? dayjs(value).isBefore(dayjs()) : true)
      )
    },
    password: {
      required: helpers.withMessage('Password is required', required),
      minLength: helpers.withMessage(
        'Password must contain at least 8 characters',
        minLength(8)
      ),
      constainsNumber: helpers.withMessage('Password must contain a number', helpers.regex(/[0-9]{1,}/))
    },
    services_other: {
      requiredIf: helpers.withMessage(
        'Please specify other value.',
        requiredIf(() => form.services === 'other')
      )
    },
    terms_and_conditions: {
      sameAs: helpers.withMessage(
        'You must agree to the terms and conditions to continute.',
        sameAs(() => true)
      )
    }
  }));

  return { rules };
  
}
