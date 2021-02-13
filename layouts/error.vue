<template>
  <div>
    <div id="notfound">
      <div class="notfound" v-if="error.statusCode === 404">
        <div class="notfound-404">
          <h1>4<span></span>4</h1>
        </div>
        <h2>Oops! Page Not Be Found</h2>
        <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
        <nuxt-link to="/">Back to homepage</nuxt-link>
      </div>
      <div class="notfound" v-else>
        <div class="notfound-404">
          <h1>5<span></span>2</h1>
        </div>
        <div id="article">
          <h1>Our site is getting a little tune up and some love.</h1>
          <div>
            <p>We apologize for the inconvenience, but we're performing some maintenance. We'll be back up soon!</p>
          </div>
          <nuxt-link to="/">Back to homepage</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['error']
}

</script>
