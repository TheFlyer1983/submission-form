import type {
  ValidationRuleWithoutParams,
  ValidationRuleWithParams
} from '@vuelidate/core';
import type { FormType } from '~~/shared/types';
import * as validators from '@vuelidate/validators';

export const useValidationRules = () => {
  const { createI18nMessage, helpers } = validators;
  const withI18nMessage = createI18nMessage({ t: useI18n().t });

  const required = withI18nMessage(validators.required);
  const email = withI18nMessage(validators.email);
  const alpha = withI18nMessage(validators.alpha);
  const minLength = withI18nMessage(validators.minLength, {
    withArguments: true
  });

  const containsNumber = () =>
    withI18nMessage(validators.helpers.regex(() => /[0-9]{1,}/));

  const isBefore = () =>
    withI18nMessage((value: string) =>
      value ? dayjs(value).isBefore(dayjs()) : true
    );

  const dayjs = useDayjs();

  const rules = ref<
    | Record<
        string,
        Record<
          string,
          ValidationRuleWithParams | ValidationRuleWithoutParams | unknown
        >
      >
    | Record<string, never>
  >({});

  function createValidationRules(fields: FormField[], form: FormType) {
    const mappedRules = fields.reduce(
      (
        acc: Record<
          string,
          Record<
            string,
            ValidationRuleWithParams | ValidationRuleWithoutParams | unknown
          >
        >,
        field
      ) => {
        return {
          ...acc,
          [field.name]: {
            ...(field.validationRules
              ? {
                  ...(field.validationRules.required
                    ? {
                        required: helpers.withParams(
                          { property: field.label },
                          required
                        )
                      }
                    : {}),
                  ...(field.validationRules.email
                    ? {
                        email: helpers.withParams(
                          { property: field.label },
                          email
                        )
                      }
                    : {}),
                  ...(field.validationRules.alpha
                    ? {
                        alpha: helpers.withParams(
                          { property: field.label },
                          alpha
                        )
                      }
                    : {}),
                  ...(field.validationRules.minLength
                    ? {
                        minLength: helpers.withParams(
                          { property: field.label },
                          minLength(field.validationRules.minLength)
                        )
                      }
                    : {}),
                  ...(field.validationRules.containsNumber
                    ? {
                        containsNumber: helpers.withParams(
                          { property: field.label },
                          containsNumber()
                        )
                      }
                    : {}),
                  ...(field.validationRules.isBefore
                    ? {
                        isBefore: helpers.withParams(
                          { property: field.label },
                          isBefore()
                        )
                      }
                    : {}),
                  ...(field.validationRules.requiredIf
                    ? {
                        requiredIf: helpers.withParams(
                          { property: field.label },
                          withI18nMessage(
                            validators.requiredIf(() => {
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
                        )
                      }
                    : {}),
                  ...(field.validationRules.checked
                    ? {
                        sameAs: withI18nMessage(validators.sameAs(true))
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
