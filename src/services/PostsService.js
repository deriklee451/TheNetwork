
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        logger.log(res.data)
        AppState.posts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log(res.data)
        AppState.posts.unshift(res.data)
    }


    async changePage(url) {
        const res = await api.get(url)
        console.log('change page', res.data);
        AppState.posts = res.data.posts
        AppState.profilePosts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

    async getProfilePost(id) {
        const res = await api.get(`api/profiles/${id}/posts`)
        console.log('profile posts', res.data)
        AppState.profilePosts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer


    }

    async getProfile(profileId) {
        const res = await api.get(`api/profiles/${profileId}`)
        AppState.activeProfile = res.data
    }



}


export const postsService = new PostsService()