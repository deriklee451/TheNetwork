
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

    async getAds() {
        const res = await api.get('api/ads')
        appState.ads = res.data.ads
    }

    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log(res.data)
        AppState.posts.unshift(res.data)
    }

    async like() {
        const res = await api.post(`api/posts/${id}/like`)
        const like = appState.posts.find(l => l.id == id)
        appState.posts = likes.length++
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

    async removePost(id) {

        const res = await api.delete('api/posts/' + id)

        let index = AppState.posts.findIndex(p => p.id == id)
        if (index >= 0) {
            AppState.splice(index, 1)
        }
    }



}


export const postsService = new PostsService()