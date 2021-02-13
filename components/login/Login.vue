<template>
  <modal id="login-modal" class="fixed h-auto w-11/12 md:w-1/2 p-5 bg-gray-200 rounded-md m-auto">
    <div slot="body">
      <LoginForm />
    </div>
  </modal>
</template>
<script>
import LoginForm from '@/components/login/LoginForm';

export default {
  components: {
    LoginForm,
  },
};
</script>
