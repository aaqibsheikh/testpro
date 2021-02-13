<template>
  <!-- Confirm Email Modal -->
  <modal
    id="mandatory-fields-enable-modal"
    v-cloak
    class="mandatory-fields-enable-modal"
  >
    <div slot="body" class="text-center px-10 py-10">
      <div class="font-bold text-xl text-gray-700">
        Are you sure you want to edit the mandatory fields in this section?
      </div>
      <br />
      <div class="text-xl text-gray-700">
        Kindly be reminded to upload the
        <span class="text-baits-blue underline"
          >front and back of your new name card</span
        >
        for verification. <br /><br />
        While verification is pending, you will temporary be unable to take
        bites on any baits.
        <br /><br />
      </div>
      <div class="font-bold text-xl text-gray-700">
        Click "Confirm" to proceed?
      </div>
      <div class="text-center mt-8">
        <button
          class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full"
          @click="passMandatoryFieldsValue"
        >
          Confirm
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
    passMandatoryFieldsValue() {
      this.$emit('handleMandatoryFieldsValue');
    },
  },
};
</script>
<style>
.mandatory-fields-enable-modal > .modal-box {
  max-width: 50%;
}
</style>