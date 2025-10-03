export interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface CreateProductDto {
  name: string
  description: string
  price: number
  imageUrl?: string
}

export interface UpdateProductDto {
  name: string
  description: string
  price: number
  imageUrl?: string
}

export interface ProductResponse {
  data: Product[]
  totalCount: number
  page: number
  pageSize: number
}

export interface ApiResponse<T> {
  data: T
  totalCount?: number
  page?: number
  pageSize?: number
}
