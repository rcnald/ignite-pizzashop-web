import { api } from '@/lib/axios'

export interface GetProfileResponse {
  name: string
  id: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const profileResponse = await api.get<GetProfileResponse>('/me')

  return profileResponse.data
}
