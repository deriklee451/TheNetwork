import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        logger.log(res.data)
        AppState.posts = res.data.posts
    }

    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log(res.data)
        AppState.posts.unshift(res.data)
    }

}


export const postsService = new PostsService()