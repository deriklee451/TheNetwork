<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-8 card rounded">
        <form class="mb-3" @submit.prevent="createPost()">
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
            <textarea v-model="editable.body" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">image URL</label>
            <input v-model="editable.imgUrl" type="text" class="form-control" id="">
          </div>
          <button class="btn btn-primary" type="submit">Post</button>
        </form>
        <div class="row border mb-2 bg-light elevation-5" v-for="p in posts">

          <PostCard :post="p" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';

export default {
  setup() {
    const editable = ref({})
    onMounted(() => {
      getPosts();
    });
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
      }
    }
    return {
      editable,
      posts: computed(() => AppState.posts),
      async createPost() {
        try {
          await postsService.createPost(editable.value)
          editable.value = {}
        } catch (error) {

        }
      }
    };
  },
  components: { PostCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
