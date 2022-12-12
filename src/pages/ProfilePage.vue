<template>
    <div class="container-fluid">
        <div v-if="profile" class="row cover-img" :style="`background-image: url(${profile.coverImg})`">
            <div class="col-12 d-flex align-items-center justify-content-around">
                <img :src="profile.picture" alt="" class="img-fluid profile-picture rounded-circle elevation-5">
                <div class="bg-transparent rounded elevation-5 p-5">
                    <h1 class="elevation-1">
                        {{ post.name }}
                    </h1>
                    <h2>
                        {{ post.bio }}
                    </h2>
                </div>
            </div>
        </div>
        <div class="row">
            <div v-for="p in posts" class="col-md-8 col-12 card p-4">
                <PostCard :post="p" />
            </div>
        </div>
    </div>
    <section>
        <div class="row justify-content-center">
            <div class="col-md-6 text-end">
                <button :disabled="!previousPage" @click="changePage(previousPage)" class="btn btn-outline-dark w-40">
                    Previous
                </button>
            </div>

            <div class="col-md-6 ">
                <button :disabled="!nextPage" @click="changePage(nextPage)" class="btn btn-outline-dark w-40">
                    Next
                </button>
            </div>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import PostCard from '../components/PostCard.vue';
import { postsService } from '../services/PostsService';
import { useRoute } from 'vue-router';
export default {

    setup() {

        const route = useRoute();
        async function getProfilePost() {
            try {
                await postsService.getProfilePost(route.params.id);
            } catch (error) {

            }
        }
        onMounted(() => {
            getProfilePost();
        })

        return {
            posts: computed(() => AppState.profilePosts),
            profile: computed(() => AppState.activeProfile),
            nextPage: computed(() => AppState.nextPage),
            previousPage: computed(() => AppState.previousPage),

            async changePage(url) {
                try {
                    await postsService.changePage(url)
                } catch (error) {
                    logger.log(error)
                    Pop.error(error)
                }
            }
        };
    },
};
components: { PostCard }


</script>


<style lang="scss" scoped>
.cover-img {
    min-height: 50vh;
    background-size: cover;
    background-position: center;
}

.profile-picture {
    height: 30vh;
    width: 30vh;
}

.bg-transparent {
    background-color: rgba(222, 184, 135, 0.185);
    text-shadow: 1px 1px white;
}
</style>