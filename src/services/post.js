import api from '@/config/axios'
import axios from 'axios'
import { toast } from 'react-toastify'

const host = import.meta.env.VITE_API_HOST || 'http://localhost:3000'

export const getPosts = async (page = 1, limit = 6, search = '', tag = []) => {
  try {
    const response = await api.get(`/posts`, {
      params: {
        page,
        limit,
        term: search,
        tag,
      },
    })
    return { data: response.data }
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    throw error
  }
}

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${host}/posts/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erro ao obter o post com id ${id}:`, error)
    throw error
  }
}

export const createPost = async (formData) => {
  try {
    const token = localStorage.getItem('authToken')
    const response = await axios.post(`${host}/posts`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Erro do servidor ao criar o post:', error.response.data)
    } else {
      console.error('Erro inesperado:', error.message)
    }
    throw error
  }
}

export const postViewed = async (post_id) => {
  try {
    const token = localStorage.getItem('authToken')
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const response = await axios.post(`${host}/posts/${post_id}/viewed`, null, {
      headers,
    })
    return response.data
  } catch (error) {
    console.error(
      `Erro ao marcar post com id ${post_id} como visualizado:`,
      error,
    )
    throw error
  }
}

export const updatePost = async (id, postData) => {
  try {
    const token = localStorage.getItem('authToken')
    const response = await axios.put(`${host}/posts/${id}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    toast.success('Postagem editada com sucesso!')
    return response.data
  } catch (error) {
    console.error(`Erro ao atualizar post com id ${id}:`, error)
    throw error
  }
}

export const deletePost = async (id) => {
  try {
    const token = localStorage.getItem('authToken')
    await axios.delete(`${host}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error(`Erro ao excluir post com id ${id}:`, error)
    throw error
  }
}
