// API パラメータの検証ユーティリティ

import { CharacterOwner, ContentType } from '@/types/database'

/**
 * 期間パラメータの検証
 */
export function validatePeriod(period: string | null): 'monthly' | 'weekly' {
  if (!period || !['monthly', 'weekly'].includes(period)) {
    return 'monthly' // デフォルト値
  }
  return period as 'monthly' | 'weekly'
}

/**
 * 月数パラメータの検証
 */
export function validateMonths(monthsStr: string | null): number {
  if (!monthsStr) return 6 // デフォルト値
  
  const months = parseInt(monthsStr, 10)
  if (isNaN(months) || months < 1 || months > 24) {
    return 6 // デフォルト値
  }
  return months
}

/**
 * キャラクターパラメータの検証
 */
export function validateCharacter(character: string | null): CharacterOwner | null {
  if (!character) return null
  
  if (!['YUYA', 'AOBA'].includes(character)) {
    return null
  }
  return character as CharacterOwner
}

/**
 * コンテンツタイプパラメータの検証
 */
export function validateContentType(contentType: string | null): ContentType | null {
  if (!contentType) return null
  
  const validTypes = ['ARTICLE', 'TOOL', 'MUSIC', 'VIDEO', 'OTHER']
  if (!validTypes.includes(contentType)) {
    return null
  }
  return contentType as ContentType
}

/**
 * 日付パラメータの検証
 */
export function validateDateRange(startStr: string | null, endStr: string | null): {
  startDate: Date | null
  endDate: Date | null
} {
  const now = new Date()
  let startDate: Date | null = null
  let endDate: Date | null = null

  if (startStr) {
    const start = new Date(startStr)
    if (!isNaN(start.getTime()) && start <= now) {
      startDate = start
    }
  }

  if (endStr) {
    const end = new Date(endStr)
    if (!isNaN(end.getTime()) && end <= now) {
      endDate = end
    }
  }

  // 開始日が終了日より後の場合は無効
  if (startDate && endDate && startDate > endDate) {
    return { startDate: null, endDate: null }
  }

  return { startDate, endDate }
}

/**
 * 数値IDの検証
 */
export function validateNumericId(idStr: string | null): number | null {
  if (!idStr) return null
  
  const id = parseInt(idStr, 10)
  if (isNaN(id) || id < 1) {
    return null
  }
  return id
}

/**
 * ページ番号の検証
 */
export function validatePage(pageStr: string | null): number {
  if (!pageStr) return 1
  
  const page = parseInt(pageStr, 10)
  if (isNaN(page) || page < 1) {
    return 1
  }
  return page
}

/**
 * 1ページあたりの件数の検証
 */
export function validateLimit(limitStr: string | null): number {
  if (!limitStr) return 10
  
  const limit = parseInt(limitStr, 10)
  if (isNaN(limit) || limit < 1 || limit > 100) {
    return 10
  }
  return limit
} 