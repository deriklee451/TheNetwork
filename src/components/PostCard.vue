<template>
    <div class="col-8">
        <img @click="getPostById" :src="post.creator?.picture" :alt="post.creator?.name"
            class="img-fluid selectable m-1 creator-img rounded-circle elevation-5"
            :title="`Go to ${post.creator?.name}'s Profile Page'`">
        <h3 class="">{{ post.creator?.name }}</h3>

        <p>{{ post.body }}</p>
        <!-- Look at inspire for date formats -->
        <p>{{ new Date(post.createdAt).toLocaleDateString() }}</p>
        <!-- Add in like count, reference Art Terminal -->
        <p class="mdi mdi-thumb-up selectable fs-3" @click="like()">{{ post.likes.length }}</p>
        <button v-if="(post.creatorId == account.id)" @click="removePost(post.id)"
            class="btn btn-danger delete-btn rounded-pill"><i class="  px-2 mdi mdi-delete-forever"></i></button>


    </div>
    <div class="col-4">
        <img class="img-fluid" :src="post.imgUrl" alt="">
    </div>
</template>


<script>
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
export default {
    props: { post: { type: Object, required: true } },
    setup(props) {
        const router = useRouter()
        return {
            posts: computed(() => AppState.posts),
            account: computed(() => AppState.account),
            async removePost() {

                try {
                    await postsService.removePost(props.post.id)
                } catch (error) {
                    Pop.error(error)
                    logger.error(error)
                }
            },
            async getPostById() {
                try {
                    this.goTo()
                } catch (error) {

                }
            },

            goTo() {
                logger.log('pushing')
                router.push({ name: 'Profile', params: { id: props.post.creatorId } })
            },

            async like() {

                try {
                    await postsService.like(id)
                } catch (error) {
                    logger.log(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.creator-img {
    height: 10vh;
    width: 10vh;
}
</style>