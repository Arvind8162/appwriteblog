import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    const previewUrl = appwriteService.getFilePreview(featuredImage);

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4 hover:shadow-md transition'>
                <div className='w-full flex justify-center items-center mb-4'>
                    {featuredImage ? (
                        <img
                            src={previewUrl.href}
                            alt={title}
                            className='rounded-xl max-h-60 object-cover w-full'
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/no-image.png"; // fallback
                            }}
                        />
                    ) : (
                        <div className="w-full h-60 bg-gray-300 flex items-center justify-center rounded-xl text-gray-600">
                            No Image
                        </div>
                    )}
                </div>
                <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard
