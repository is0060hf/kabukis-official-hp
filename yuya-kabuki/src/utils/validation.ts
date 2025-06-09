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
    // RFC 5322準拠のメールアドレス検証（簡略版）
    // より厳密な検証のためのパターン
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailPattern.test(value)) {
      return "有効なメールアドレスを入力してください";
    }
    
    // 追加のメールアドレス検証
    if (value.length > 254) {
      return "メールアドレスが長すぎます（254文字以内）";
    }
    
    const [localPart, domainPart] = value.split('@');
    if (localPart.length > 64) {
      return "メールアドレスのローカル部が長すぎます（64文字以内）";
    }
    
    if (domainPart.length > 253) {
      return "メールアドレスのドメイン部が長すぎます（253文字以内）";
    }
    
    // 連続するドットのチェック
    if (localPart.includes('..') || domainPart.includes('..')) {
      return "メールアドレスに連続するドットは使用できません";
    }
    
    // 開始・終了がドットでないかチェック
    if (localPart.startsWith('.') || localPart.endsWith('.')) {
      return "メールアドレスのローカル部はドットで開始・終了できません";
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