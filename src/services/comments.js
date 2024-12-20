import axios from 'axios'

const host = import.meta.env.API_HOST || 'http://localhost:3000'
// console.log(token)

export const getPostComments = async (id) => {
  try {
    const token = localStorage.getItem('authToken')
    const response = await axios.get(`${host}/posts/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Erro ao buscar comentários do post com id ${id}:`, error)
    throw error
  }
}

export const createComment = async (postId, content) => {
  try {
    const token = localStorage.getItem('authToken')
    const response = await axios.post(
      `${host}/comments/${postId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return { data: response.data }
  } catch (error) {
    console.error(`Erro ao criar comentário no post com id ${postId}:`, error)
    throw error
  }
}

export const deleteComment = async (id) => {
  try {
    const token = localStorage.getItem('authToken')
    await axios.delete(`${host}/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error(`Erro ao deletar comentário com id ${id}:`, error)
    throw error
  }
}
