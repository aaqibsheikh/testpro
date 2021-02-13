<template>
  <div>
    <!-- Questionaire Modal -->
    <modal id="confirm-email" :dismissible="false" v-cloak>
      <div slot="body">
        <div class="absolute w-full text-center left-0" style="top: -30px;">
          <div type="button" class="py-6 px-20 lg:px-24 lg:text-2xl text-white rounded-md bg-baits-blue shadow-lg inline-block">Email Verification</div>
        </div>
        <slot name="content"></slot>
      </div>
    </modal>
  </div>
</template>
<script>
export default {
  methods: {

  }
}

</script>
<style>
.modal-body {
  position: initial;
}

.close-modal {
  display: none;
}

</style>
