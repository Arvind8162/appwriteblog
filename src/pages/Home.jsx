import React, { useEffect, useState } from "react"
import appwriteService from "../appwrite/config"
import PostCard from "../components/PostCard"
import { useSelector } from "react-redux"

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        appwriteService.getPosts().then((postData) => {
            if (postData && postData.documents) {
                setPosts(postData.documents)
            }
            setLoading(false)
        })
    }, [])

    return (
        <div className="w-full py-8">
            <div className="flex flex-wrap gap-4 justify-center px-4">
                {loading ? (
                    <p>Loading posts...</p>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard
                            key={post.$id}
                            $id={post.$id}
                            title={post.title}
                            featuredImage={post.featuredImage}
                        />
                    ))
                ) : (
                    <div className="text-center text-lg font-semibold text-gray-600">
                        {authStatus ? "No posts found." : "Login to read posts"}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
