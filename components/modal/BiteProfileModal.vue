<template>
  <!-- Confirm Email Modal -->
  <modal id="bite-profile-modal" v-cloak class="bite-profile-modal">
    <div slot="body" class="px-10 py-10">
      <div slot="body">
        <slot name="content"></slot>
      </div>
    </div>
  </modal>
</template>
<style>
.bite-profile-modal > .modal-box {
  max-width: 50%;
}
</style>
