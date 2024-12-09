import { Eye, MessageCircle } from 'lucide-react'

const PostActions = ({commentCount, viewedCount}) => (
  <div className='flex items-center flex-wrap'>
    <span className='text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200'>
      <Eye size={18} strokeWidth={1.6} className='mr-1' />{viewedCount}
    </span>
    <span className='text-gray-400 inline-flex items-center leading-none text-sm'>
      <MessageCircle size={15.5} strokeWidth={2.1} className='mr-1' />{commentCount}{' '}
    </span>
  </div>
)

export default PostActions
