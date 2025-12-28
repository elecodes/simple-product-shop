import { Skeleton } from '@/shared/components/Skeleton'

export function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-4">
      <Skeleton variant="rectangular" height={200} className="mb-4" />
      <Skeleton variant="text" width="80%" className="mb-2" />
      <Skeleton variant="text" width="40%" className="mb-4" />
      <Skeleton variant="rectangular" height={40} />
    </div>
  )
}