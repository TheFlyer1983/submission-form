import type { ValidationRuleWithParams } from '@vuelidate/core';
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

export const useValidationRules = () => {
  const dayjs = useDayjs();

  const rules = ref<
    | Record<string, Record<string, ValidationRuleWithParams>>
    | Record<string, never>
  >({});

  function createValidationRules(fields: FormField[], form: FormType) {
    const mappedRules = fields.reduce(
      (
        acc: Record<string, Record<string, ValidationRuleWithParams>>,
        field
      ) => {
        return {
          ...acc,
          [field.name]: {
            ...(field.validationRules
              ? {
                  ...(field.validationRules.required
                    ? {
                        required: helpers.withMessage(
                          `${field.label} is required`,
                          required
                        )
                      }
                    : {}),
                  ...(field.validationRules.email
                    ? {
                        email: helpers.withMessage(
                          `${field.label} is invalid`,
                          email
                        )
                      }
                    : {}),
                  ...(field.validationRules.alpha
                    ? {
                        alpha: helpers.withMessage(
                          `${field.label} is not alphabetical`,
                          alpha
                        )
                      }
                    : {}),
                  ...(field.validationRules.minLength
                    ? {
                        minLength: helpers.withMessage(
                          `${field.label} must contain at least ${field.validationRules.minLength} characters`,
                          minLength(field.validationRules.minLength)
                        )
                      }
                    : {}),
                  ...(field.validationRules.containsNumber
                    ? {
                        containsNumber: helpers.withMessage(
                          `${field.label} must contain a number`,
                          helpers.regex(/[0-9]{1,}/)
                        )
                      }
                    : {}),
                  ...(field.validationRules.isBefore
                    ? {
                        isBefore: helpers.withMessage(
                          'The date must be in the past',
                          (value: string) =>
                            value ? dayjs(value).isBefore(dayjs()) : true
                        )
                      }
                    : {}),
                  ...(field.validationRules.requiredIf
                    ? {
                        requiredIf: helpers.withMessage(
                          `Please specify other value.`,
                          requiredIf(() => {
                            if (field.parent) {
                              return (
                                form[field.parent] ===
                                field.validationRules.requiredIf
                              );
                            } else {
                              return true;
                            }
                          })
                        )
                      }
                    : {}),
                  ...(field.validationRules.checked
                    ? {
                        sameAs: helpers.withMessage(
                          `You must check the box to continue.`,
                          sameAs(true)
                        )
                      }
                    : {})
                }
              : {})
          }
        };
      },
      {}
    );
    rules.value = mappedRules;
  }

  return { rules, createValidationRules };
};
