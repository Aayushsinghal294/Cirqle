import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = { fullName: name, bio };

    if (selectedImg) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = async () => {
        await updateProfile({ ...profileData, profilePic: reader.result });
        navigate('/');
      };
    } else {
      await updateProfile(profileData);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-5 flex-1">
          <h3 className="text-lg">Profile Details</h3>

          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
            <input
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) => setSelectedImg(e.target.files[0])}
            />
            <img
              src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon}
              alt="avatar"
              className={`w-12 h-12 ${selectedImg ? 'rounded-full' : ''}`}
            />
            Upload Profile Image
          </label>

          <input
            type="text"
            required
            placeholder="Your Name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            required
            placeholder="Write Profile Bio"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>
        </form>

        <img
          src={authUser?.profilePic || assets.logocq}
          alt="logo"
          className={`max-w-44 aspect-square mx-10 max-sm:mt-10 ${selectedImg ? 'rounded-full' : ''}`}
        />
      </div>
    </div>
  );
};

export default Profile;
