import { Link, useParams } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { NoComment, Comment } from '../../components/Comment'
import useCreateComment from '@/hooks/useCreateComment'
import Button from '../../components/Form/Button'
import usePostDetails from '../../hooks/usePostDetails'
import Load from '@/components/Load'
import useCommentsList from '../../hooks/useCommentsList'
import useDeleteComment from '../../hooks/useDeleteComment'
import Confirm from '@/components/Confirm'
import PostActions from '../../components/PostCard/PostActions'
import { LockKeyhole } from 'lucide-react/dist/cjs/lucide-react'

const PostDetails = () => {
  const { isAuthenticated } = useAuth()
  const { id: postId } = useParams()
  const { postDetails, loading, error } = usePostDetails(postId)
  const [hoveredTag, setHoveredTag] = useState(null)
  const { handleSubmitComment, loadingComment } = useCreateComment()
  const [newComment, setNewComment] = useState('')
  const imageHost = import.meta.env.VITE_API_HOST || 'http://localhost:3000'
  const {
    loadingCommentsList,
    errorCommentsList,
    commentsList,
    setCommentsList,
    handleSearchComments,
  } = useCommentsList(postId)
  const { loadingDelete, handleDeleteComment } = useDeleteComment()

  const handleDelete = (commentId) => {
    Confirm(
      'Confirmação',
      'Tem certeza que deseja excluir esse comentário?',
      () => {
        handleDeleteComment(commentId, handleSearchComments)
      },
    )
  }

  if (loading || loadingCommentsList || loadingComment || loadingDelete) {
    return <Load />
  }

  if (error || errorCommentsList) {
    return <p>{error}</p>
  }

  if (!postDetails) {
    return <div>Post não encontrado</div>
  }

  const post = {
    id: postDetails.id,
    title: postDetails.title,
    teacherName: postDetails.teacher.user.name,
    content: postDetails.content,
    image: postDetails.path_img,
    tags: postDetails.tags,
    viewedCount: postDetails.viewedCount,
    commentCount: postDetails.commentCount,
  }

  const handleMouseEnter = (tag) => {
    setHoveredTag(tag)
    console.log(`Hovered over: ${tag.name}`)
  }

  const handleMouseLeave = () => {
    setHoveredTag(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newCommentData = await handleSubmitComment(
        post.id,
        newComment,
        false,
        handleSearchComments,
      )
      setCommentsList([...commentsList, newCommentData])
      setNewComment('')
    } catch (error) {
      console.error('Erro ao enviar comentário:', error)
    }
  }

  const hasImage = !!post.image

  const image = hasImage ? `${imageHost}/${post.image}` : null

  return (
    <>
      <div className={`flex`}>
        <div
          className='
          bg-white
          border-2 
          border-gray-200 
          border-opacity-60 
          rounded-lg 
          flex  
          h-full 
          w-full
          flex-col
          divide-y-2
          lg:flex-row
          lg:divide-x-2
          lg:divide-y-0
          '
        >
          <div className='h-full lg:w-2/3 p-6 overflow-auto flex flex-col justify-between'>
            <div className='flex flex-row justify-between'>
              <div className='mb-3'>
                <h1 className='title-font text-lg font-medium text-gray-900'>
                  {post.title}
                </h1>
                <h2 className='tracking-widest text-xs text-transform: capitalize title-font font-small text-gray-400 mb-1'>
                  {post.teacherName}
                </h2>
              </div>
              <PostActions
                commentCount={post.commentCount}
                viewedCount={post.viewedCount}
              />
            </div>

            {hasImage ? (
              <>
                <img
                  className='md:h-36 relative w-full object-cover object-center flex-shrink-0 flex-1 rounded-lg rounded-t-lg'
                  src={image}
                  alt={post.title}
                  style={{ maxHeight: '33%' }}
                />
                <p
                  className='leading-relaxed mt-2 pt-6 mb-3 flex-grow break-words overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-gray-50
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-400'
                >
                  {post.content}
                </p>
              </>
            ) : (
              <>
                <p
                  className='leading-relaxed mb-3 flex-grow break-words overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-gray-50
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-400'
                >
                  {post.content}
                </p>
              </>
            )}

            <div>
              <div className='w-full flex flex-wrap gap-2 mb-1'>
                {post.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer ${
                      hoveredTag === tag
                        ? 'bg-blue-100 text-blue-900 ring-blue-900/10'
                        : 'bg-blue-50 text-blue-700 ring-blue-700/10'
                    }`}
                    onMouseEnter={() => handleMouseEnter(tag)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {tag.name.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {isAuthenticated && (
            <div className='flex flex-grow flex-col p-6 lg:w-1/3'>
              <h2 className='ml-2 title-font text-lg font-medium text-gray-900 mb-3'>
                Comentários
              </h2>
              <form className='mb-2 p-4' onSubmit={handleSubmit}>
                <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200'>
                  <label htmlFor='newComment' className='sr-only'>
                    Seu comentário
                  </label>
                  <textarea
                    id='newComment'
                    rows='6'
                    className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none min-h-1/2'
                    placeholder='Deixe seu comentário...'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onSubmit={handleSubmit}
                    required
                  ></textarea>
                </div>
                <div className='flex justify-end'>
                  <Button type='submit'>Comentar</Button>
                </div>
              </form>
              <div
                className='overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-gray-50
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-400'
              >
                {commentsList.length === 0 ? (
                  <NoComment />
                ) : (
                  commentsList.map((comment, index) => (
                    <Comment
                      comment={comment}
                      index={index}
                      key={comment.id}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </div>
            </div>
          )}
          {!isAuthenticated && (
            <div className='flex flex-grow flex-col p-6 lg:w-1/3'>
              <div className='flex justify-center items-center h-full'>
                <div className='flex flex-col items-center'>
                  <p className='text-gray-400'>
                    Faça o{' '}
                    <Link
                      to='/login'
                      className='font-semibold text-indigo-600 hover:text-indigo-500'
                    >
                      login
                    </Link>{' '}
                    para visualizar os comenátios
                  </p>
                  <a href='/login'>
                    <LockKeyhole className='m-6' color='#1F2937' />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PostDetails
