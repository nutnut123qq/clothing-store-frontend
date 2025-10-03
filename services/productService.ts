import axios from 'axios'
import { Product, CreateProductDto, UpdateProductDto, ApiResponse, ProductResponse } from '@/types/Product'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const productService = {
  async getProducts(page: number = 1, pageSize: number = 10, search?: string): Promise<ProductResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    })
    
    if (search) {
      params.append('search', search)
    }

    const response = await api.get(`/products?${params}`)
    
    return {
      data: response.data,
      totalCount: parseInt(response.headers['x-total-count'] || '0'),
      page: parseInt(response.headers['x-page'] || '1'),
      pageSize: parseInt(response.headers['x-page-size'] || '10'),
    }
  },

  async getProduct(id: number): Promise<ApiResponse<Product>> {
    const response = await api.get(`/products/${id}`)
    return { data: response.data }
  },

  async createProduct(product: CreateProductDto): Promise<ApiResponse<Product>> {
    const response = await api.post('/products', product)
    return { data: response.data }
  },

  async updateProduct(id: number, product: UpdateProductDto): Promise<void> {
    await api.put(`/products/${id}`, product)
  },

  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`)
  },
}
