<template>
  <!-- Change Email Confirmation Modal -->
  <modal id="change-email-confirmation-modal" v-cloak ref="change-email-confirmation-modal">
    <div slot="body" class="pb-8">
      <div class="w-full py-10">
        <div class="px-8 pb-4 mb-4">
          <div class="mb-4 flex flex-wrap mt-4">
            <div class="w-full block mb-2 ">
              <p class="text-gray-700 text-xl py-2">
                An email has been sent to the new email.
              </p>
              <p class="text-gray-700 text-xl py-2">Please click on the link in the email to finalise the
                change of email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
