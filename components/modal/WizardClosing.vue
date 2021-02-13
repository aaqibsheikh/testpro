<template>
  <div>
    <!-- Questionaire Modal -->
    <modal
      id="wizard-closing"
      :dismissible="false"
      v-cloak
      class="wizard-closing"
    >
      <div slot="body">
        <div
          class="absolute w-full text-center left-0 px-6"
          style="top: -30px"
          v-if="hideHeader"
        >
          <div
            class="py-6 px-20 lg:px-24 lg:text-2xl text-white rounded-md bg-baits-blue shadow-lg"
          >
            Oops, we are half way through!
          </div>
        </div>
        <slot name="content"></slot>
      </div>
    </modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hideHeader: false,
    };
  },
  mounted() {
    this.hideHeader = true;
  },
  methods: {},
};
</script>
<style>
.wizard-closing > .modal-box > .modal-body {
  position: initial;
}

.wizard-closing > .modal-box > .close-modal {
  display: none;
}
</style>