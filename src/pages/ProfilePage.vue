<template>
    <div class="container-fluid">
        <div v-if="profile" class="row cover-img" :style="`background-image: url(${profile.coverImg})`">
            <div class="col-12 d-flex align-items-center justify-content-around">
                <img :src="profile.picture" alt="" class="img-fluid profile-picture rounded-circle elevation-5">
                <div class="opacity-75 rounded card elevation-5 p-5">
                    <h1 class="elevation-1">
                        {{ profile.name }}
                    </h1>
                    <h2>
                        {{ profile.bio }}
                    </h2>
                    <p class="mdi mdi-github fs-5">{{ profile.github }}</p>
                    <p class="mdi mdi-linkedin fs-5">{{ profile.linkedin }}</p>
                    <p class="mdi mdi-page fs-5">Resume:{{ profile.resume }}</p>
                    <p>Class:{{ profile.class }}</p>
                    <p class="">Graduated {{ profile.graduated }}</p>




                </div>

            </div>
        </div>
        <div class="row justify-content-center">
            <div v-for="p in posts" class="col-md-8 col-12 card justify-content-center p-4">
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
import { logger } from '../utils/Logger.js';
export default {

    setup() {

        const route = useRoute();
        async function getProfilePost() {
            try {
                await postsService.getProfilePost(route.params.id);
            } catch (error) {

            }
        }
        async function getProfile() {
            try {
                await postsService.getProfile(route.params.id)
            } catch (error) {
                logger.log(error)
            }
        }
        onMounted(() => {
            // Get Profile by Id 
            getProfilePost();
            getProfile();
        })

        return {
            // NOTE pay attention to where you are drawing posts for the change page 
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