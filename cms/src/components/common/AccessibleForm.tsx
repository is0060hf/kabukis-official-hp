'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { announceToScreenReader } from './LiveRegion'

interface TextFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  placeholder?: string
  helpText?: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'url'
}

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  helpText,
  type = 'text',
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const errorId = `${id}-error`
  const helpId = `${id}-help`
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    
    // エラーがクリアされた場合、スクリーンリーダーに通知
    if (error && e.target.value) {
      announceToScreenReader('入力内容が修正されました', 'polite')
    }
  }
  
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="label">
        {label}
        {required && (
          <span className="text-cms-error ml-1" aria-label="必須">
            *
          </span>
        )}
      </label>
      
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={`${helpText ? helpId : ''} ${error ? errorId : ''}`.trim() || undefined}
          className={`
            input pr-10
            ${error ? 'border-cms-error focus:ring-cms-error' : ''}
          `}
        />
        
        {/* ステータスアイコン */}
        {error && (
          <AlertCircle 
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cms-error" 
            aria-hidden="true"
          />
        )}
        {!error && value && !isFocused && (
          <CheckCircle 
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cms-success" 
            aria-hidden="true"
          />
        )}
      </div>
      
      {/* ヘルプテキスト */}
      {helpText && !error && (
        <p id={helpId} className="text-sm text-cms-text-muted">
          {helpText}
        </p>
      )}
      
      {/* エラーメッセージ */}
      {error && (
        <p id={errorId} role="alert" className="text-sm text-cms-error flex items-center gap-1">
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

interface TextAreaProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  placeholder?: string
  helpText?: string
  rows?: number
}

export function TextArea({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  helpText,
  rows = 4,
}: TextAreaProps) {
  const errorId = `${id}-error`
  const helpId = `${id}-help`
  
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="label">
        {label}
        {required && (
          <span className="text-cms-error ml-1" aria-label="必須">
            *
          </span>
        )}
      </label>
      
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={`${helpText ? helpId : ''} ${error ? errorId : ''}`.trim() || undefined}
        className={`
          input resize-y
          ${error ? 'border-cms-error focus:ring-cms-error' : ''}
        `}
      />
      
      {/* ヘルプテキスト */}
      {helpText && !error && (
        <p id={helpId} className="text-sm text-cms-text-muted">
          {helpText}
        </p>
      )}
      
      {/* エラーメッセージ */}
      {error && (
        <p id={errorId} role="alert" className="text-sm text-cms-error flex items-center gap-1">
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

// リアルタイムバリデーションの例
export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const validateEmail = (email: string): string | null => {
    if (!email) return '必須項目です'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return '有効なメールアドレスを入力してください'
    }
    return null
  }
  
  const validateField = (fieldName: string, value: string, validator: (value: string) => string | null) => {
    const error = validator(value)
    
    if (error) {
      setErrors(prev => ({ ...prev, [fieldName]: error }))
      announceToScreenReader(error, 'polite')
    } else {
      setErrors(prev => {
        const { [fieldName]: _, ...rest } = prev
        return rest
      })
    }
    
    return !error
  }
  
  return {
    errors,
    setErrors,
    validateEmail,
    validateField,
  }
} 