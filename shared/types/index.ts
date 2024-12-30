export type ValidationRules = {
  required?: boolean;
  minLength?: number;
  alpha?: boolean;
  email?: boolean;
  isBefore?: boolean;
  containsNumber?: boolean;
  requiredIf?: string;
  checked?: boolean;
}

export type FormField = {
  label: string;
  name: string;
  type: 'text' | 'password' | 'date' | 'select' | 'checkbox';
  required: boolean;
  parent: string | null;
  visible: boolean;
  requiredIf?: string;
  validationRules: ValidationRules
};

export type FormType = Record<string, string | boolean>;
