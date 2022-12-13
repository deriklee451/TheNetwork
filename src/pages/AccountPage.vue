<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-8">
        <form @submit.prevent="editAccount()">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input v-model="editable.name" type="text" required class="form-control" id="name">
          </div>
          <div class="mb-3">
            <label for="coverImg" class="form-label">coverImg</label>
            <input v-model="editable.coverImg" type="text" required class="form-control" id="coverImg">
          </div>
          <div class="mb-3">
            <label for="picture" class="form-label">picture</label>
            <input v-model="editable.picture" type="text" required class="form-control" id="picture">
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea v-model="editable.bio" required class="form-control" id="bio" rows="3"></textarea>
          </div>

          <div class="mb-3">
            <label for="gitHub" class="form-label">gitHub</label>
            <input v-model="editable.github" type="text" class="form-control" id="github">
          </div>

          <div class="mb-3">
            <label for="linedin" class="form-label">Linkedin</label>
            <input v-model="editable.linkedin" type="text" class="form-control" id="linkedin">
          </div>

          <div class="mb-3">
            <label for="resume" class="form-label">Resume Link</label>
            <input v-model="editable.resume" type="text" class="form-control" id="resume">
          </div>

          <div class="mb-3">
            <label for="class" class="form-label">Class</label>
            <input v-model="editable.class" type="text" class="form-control" id="class">
          </div>

          <div class="form-check mb-4">
            <input class="form-check-input" type="checkbox" value="graduated" id="graduated">
            <label class="form-check-label" for="defaultCheck1">
              Graduated?
            </label>
          </div>


          <button class="btn btn-success" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
    })
    return {
      editable,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          await accountService.editAccount(editable.value)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
