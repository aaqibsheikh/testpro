<template>
  <div>
    <div class="flex h-screen">
      <Loading
        :width="100"
        :height="100"
        :active.sync="isLoading"
        loader="bars"
        :can-cancel="false"
        :is-full-page="true"
        color="#0070C0"
      ></Loading>
      <Sidebar class="hidden xl:block" v-if="!isPanelOpen" />
      <nuxt class="overflow-auto bg-white" />
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/dashboard/Sidebar';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  middleware: 'auth',
  components: {
    Sidebar,
  },
  computed: {
    ...mapGetters({
      isPanelOpen: 'common/isPanelOpen',
      isBurgerActive: 'common/isBurgerActive',
      isLoading: 'common/isLoading',
    }),
  },
  methods: {
    ...mapMutations({
      setPanel: 'common/setPanel',
      setBurger: 'common/setBurger',
    }),
    closeSidebarPanel() {
      this.setBurger(false);
      this.setPanel(false);
    },
  },
};
</script>
