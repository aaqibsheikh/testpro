<template>
  <!-- providers-modal -->
  <modal id="providers-modal" v-cloak>
    <div slot="body" class="px-10 py-10">
      <slot name="content"> <h1 class="text-center">Hi! Provider</h1> </slot>
    </div>
  </modal>
</template>
<script>
export default {};
</script>
<style>
.modal-box {
  border-radius: 0.8rem;
  max-width: 30%;
}
</style>
