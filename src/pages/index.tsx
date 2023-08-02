import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [posts, setPosts] = useState<any>([])
  const [newPost, setNewPost] = useState({
    title: '',
    description: ''
  })

  async function getPosts() {
    const { data } = await axios.get('http://localhost:5000')
    setPosts(data)
  }

  async function publishPost() {
    const { data } = await axios.post('http://localhost:5000', newPost)
    console.log(data)

    setPosts((prevState: any) => [data, ...prevState])
  }

  useEffect(() => {
    getPosts()
  }, [])

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setNewPost(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const sortedPosts = posts
    .slice()
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

  return (
    <main className="flex align-center justify-center flex-col">
      <div>
        <input
          className="border outline-none"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <input
          className="border outline-none"
          name="description"
          value={newPost.description}
          onChange={handleInputChange}
        />
        <button onClick={publishPost}>Get</button>
      </div>
      <div>
        {sortedPosts.map((item: any) => (
          <div id={item.key}>
            <b>{item.title}</b>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
