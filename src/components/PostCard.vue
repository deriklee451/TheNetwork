<template>
    <div class="col-8">
        <img @click="getPostById" :src="post.creator?.picture" :alt="post.creator?.name"
            class="img-fluid selectable m-1 creator-img rounded-circle elevation-5"
            :title="`Go to ${post.creator?.name}'s Profile Page'`">
        <h3 class="">{{ post.creator?.name }}</h3>

        <p>{{ post.body }}</p>


    </div>
    <div class="col-4">
        <img class="img-fluid" :src="post.imgUrl" alt="">
    </div>
</template>


<script>
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
export default {
    props: { post: { type: Object, required: true } },
    setup(props) {
        const router = useRouter()
        return {
            async getPostById() {
                try {
                    this.goTo()
                } catch (error) {

                }
            },

            goTo() {
                logger.log('pushing')
                router.push({ name: 'Profile', params: { id: props.post.creatorId } })
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