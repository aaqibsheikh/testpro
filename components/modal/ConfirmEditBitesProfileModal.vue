<template>
  <!-- Confirm Email Modal -->
  <modal
    id="confirm-edit-bites-profile-modal"
    v-cloak
    class="confirm-edit-bites-profile-modal"
  >
    <div slot="body" class="text-center px-10 py-10">
      <div class="font-bold text-xl text-baits-blue">
        Request to change mandatory Bites info!
        <br /><br />
      </div>
      <br />
      <div class="font-bold text-xl text-gray-700">
        Your Bites profile will be updated once your request is approved
        <br /><br />
      </div>
      <div class="text-center mt-8">
        <button
          class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full"
          @click="confirmMandatoryFieldsValueChanges"
        >
          Submit
        </button>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    confirmMandatoryFieldsValueChanges() {
      this.$emit('handleEditMandatoryFieldsValue');
    },
  },
};
</script>
<style>
.confirm-edit-bites-profile-modal > .modal-box {
  max-width: 50%;
}
</style>