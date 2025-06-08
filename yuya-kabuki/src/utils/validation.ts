export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  custom?: (value: string) => string | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

export const validateField = (
  value: string,
  rules: ValidationRule
): string | null => {
  if (rules.required && !value.trim()) {
    return "この項目は必須です";
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `${rules.minLength}文字以上入力してください`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `${rules.maxLength}文字以内で入力してください`;
  }

  if (rules.email && value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return "有効なメールアドレスを入力してください";
    }
  }

  if (rules.pattern && value && !rules.pattern.test(value)) {
    return "入力形式が正しくありません";
  }

  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const validateForm = <T extends Record<string, string>>(
  formData: T,
  validationRules: Record<keyof T, ValidationRule>
): ValidationError[] => {
  const errors: ValidationError[] = [];

  Object.keys(formData).forEach((field) => {
    const rules = validationRules[field as keyof T];
    if (rules) {
      const error = validateField(formData[field as keyof T], rules);
      if (error) {
        errors.push({ field, message: error });
      }
    }
  });

  return errors;
}; 