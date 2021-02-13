<template>
  <!-- Confirm Email Modal -->
  <modal id="popup-message-modal" v-cloak>
    <div slot="body" class="px-10 py-10">
      <slot name="content"></slot>
    </div>
  </modal>
</template>
<script>
export default {
  props: ['dismissible']
}

</script>
<style>
.modal-box {
  border-radius: .8rem;
  max-width: 30%;
}

</style>
