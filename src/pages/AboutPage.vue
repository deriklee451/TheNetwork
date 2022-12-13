<template>
  <div class="row">
    <!-- NOTE ----------------------------- .prevent prevents the default event action from happening -->
    <form action="" class="input-group" @submit.prevent="searchNetwork">
      <!-- <input type="text" class="form-control" v-model="search"> -->
      <input type="text" class="form-control" v-model="search.query">
      <button class="btn btn-info w-25"><i class="mdi mdi-magnify"></i></button>
    </form>

  </div>
</template>

<script>
import { AppState } from '../AppState.js';
import { computed, reactive, onMounted, ref } from '@vue/reactivity';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { useRouter } from 'vue-router';

export default {
  setup() {

    const search = reactive({
      query: ''
    })
    return {
      search,
      async searchMovie() {
        try {
          await moviesService.searchMovies(search)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      }
    }
  }
};
</script>
