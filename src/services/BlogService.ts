import { Post } from '../@types/blog'

class BlogService {
    private readonly STORAGE_KEY = 'blog_posts'

    private getPosts(): Post[] {
        const posts = localStorage.getItem(this.STORAGE_KEY)
        return posts ? JSON.parse(posts) : []
    }

    private savePosts(posts: Post[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts))
    }

    createPost(post: Post): Post {
        const posts = this.getPosts()
        const newPost = {
            ...post,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        posts.push(newPost)
        this.savePosts(posts)
        return newPost
    }

    getAllPosts(): Post[] {
        return this.getPosts()
    }

    getPostById(id: string): Post | null {
        const posts = this.getPosts()
        return posts.find(post => post.id === id) || null
    }

    updatePost(id: string, updatedPost: Partial<Post>): Post | null {
        const posts = this.getPosts()
        const index = posts.findIndex(post => post.id === id)
        if (index === -1) return null

        posts[index] = {
            ...posts[index],
            ...updatedPost,
            updatedAt: new Date().toISOString()
        }
        this.savePosts(posts)
        return posts[index]
    }

    deletePost(id: string): boolean {
        const posts = this.getPosts()
        const filteredPosts = posts.filter(post => post.id !== id)
        if (filteredPosts.length === posts.length) return false
        
        this.savePosts(filteredPosts)
        return true
    }
}

export const blogService = new BlogService()