import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate()

  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white transition-all duration-300 ${selectedUser ? 'max-md:hidden' : ''}`}>
      <div className='pb-6'>
        <div className='flex justify-between items-center'>
          <img src={assets.l1} alt="logo" className='w-24' />
          <div className='relative py-2 group'>
            <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer' />
            <div className='absolute top-full right-0 z-20 w-32 p-4 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
              <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm hover:underline'>Edit Profile</p>
              <hr className='my-2 border-t border-gray-500' />
              <p className='cursor-pointer text-sm hover:underline'>Logout</p>
            </div>
          </div>
        </div>

        <div className='bg-[#282142] rounded-full flex items-center gap-3 py-2 px-4 mt-6'>
          <img src={assets.search_icon} alt="Search" className='w-4' />
          <input
            type="text"
            className='bg-transparent border-none outline-none text-white text-sm placeholder-[#c8c8c8] flex-1'
            placeholder='Search user...'
          />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {userDummyData.map((user, index) => (
          <div
            onClick={() => setSelectedUser(user)}
            key={index}
            className={`relative flex items-center gap-3 p-3 pl-4 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-[#282142]/30 ${
              selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''
            }`}
          >
            <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-9 aspect-square rounded-full object-cover' />
            <div className='flex flex-col leading-5 '>
              <p className='text-sm font-medium'>{user.fullName}</p>
              {
                index < 3
                  ? <span className='text-green-400 text-xs'>Online</span>
                  : <span className='text-neutral-400 text-xs'>Offline</span>
              }
            </div>
            {index > 2 && (
              <p className='absolute top-1/2 -translate-y-1/2 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/60'>
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
