import { Menu, MenuButton } from '@headlessui/react'
import { Trash2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'

const Comment = ({ comment, index, onDelete }) => {
  
  const { isTeacher, loggedInUserId } = useAuth()
  const [isSameUser, setIsSameUser] = useState(false)

  useEffect(() => {
    if (comment.user_id === loggedInUserId) {
      setIsSameUser(true)
    } else {
      setIsSameUser(false)
    }
  }, [comment.user_id, loggedInUserId])

  const formattedDate = (commentCreatedAt) => {
    const date = new Date(commentCreatedAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    return date
  }

  if (!comment || !comment.user_id) {
    return null // Retorne null se os dados do comentário estiverem ausentes
  }
  return (
    <>
      <div
        className='rounded-lg rounded-t-lg border border-gray-200 m-4'
        key={index}
      >
        <article className='p-4 text-base rounded-lg'>
          <div className='flex items-center justify-between w-full'>
            <p className='inline-flex text-gray-400 items-center text-xs flex-4/5'>
              {comment.user.name}
            </p>
            <p className='text-gray-400 flex-1/5 text-xs px-2'>
              <time
                dateTime={formattedDate(comment.created_at)}
                title={formattedDate(comment.created_at)}
              >
                {formattedDate(comment.created_at)}
              </time>
            </p>
          </div>
          <div className='flex text-gray-600 items-center my-3 space-x-4 p-5 bg-gray-100 rounded-lg text-xs'>
            <p>{comment.content}</p>
          </div>
          <div className='flex w-full justify-end'>
             {(isTeacher || isSameUser) && ( 
              <Menu as='div'>
                <MenuButton
                  className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  onClick={() => onDelete(comment.id)}
                >
                  <Trash2 size={16} strokeWidth={0.75} />
                </MenuButton>
              </Menu>
            )}
          </div>
        </article>
      </div>
    </>
  )
}

export default Comment
