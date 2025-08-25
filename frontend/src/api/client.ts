import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export type ProductDTO = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
};

export type CategoryDTO = {
  id: number;
  name: string;
};

export type UserDTO = {
  id: number;
  username: string;
  email: string;
};

export type OrderDTO = {
  id: number;
  userId: number;
  status: string;
  totalAmount: number;
  productIds: number[];
};

export async function fetchProducts(): Promise<ProductDTO[]> {
  const { data } = await api.get<ProductDTO[]>('/products');
  return data;
}

export async function fetchProduct(id: number): Promise<ProductDTO> {
  const { data } = await api.get<ProductDTO>(`/products/${id}`);
  return data;
}

export async function fetchCategories(): Promise<CategoryDTO[]> {
  const { data } = await api.get<CategoryDTO[]>('/categories');
  return data;
}

export async function login(usernameOrEmail: string, password: string): Promise<UserDTO> {
  const { data } = await api.post<UserDTO | string>('/auth/login', { usernameOrEmail, password });
  if (typeof data === 'string') throw new Error(data);
  return data;
}

export async function register(username: string, email: string, password: string): Promise<UserDTO> {
  const { data } = await api.post<UserDTO | string>('/auth/register', { username, email, password });
  if (typeof data === 'string') throw new Error(data);
  return data;
}

export async function createOrder(userId: number, productIds: number[], totalAmount: number): Promise<OrderDTO> {
  const { data } = await api.post<OrderDTO>('/orders', {
    userId,
    productIds,
    status: 'CREATED',
    totalAmount,
  });
  return data;
}


