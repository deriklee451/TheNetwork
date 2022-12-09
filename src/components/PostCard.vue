<template>
    <div class="col-8 selectable">
        <h3>{{ post.creator.name }}</h3>
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
export default {
    props: { post: { type: Object, required: true } },
    setup(props) {
        const router = useRouter()
        return {

        }
    }
};
</script>


<style lang="scss" scoped>

</style>