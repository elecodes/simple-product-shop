import { businessRules } from '@/shared/constants/businessRules'

export const calculateTax = (subtotal: number): number => {
  return subtotal * businessRules.tax.percentage
}