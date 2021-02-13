<template>
  <div class="w-full">
    <Header />
    <div class="container mx-auto max-w-screen-lg flex justify-between py-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-2 px-4 rounded-full add-new" label="Add New" @click="addNew()">
        <font-awesome-icon class="w-5 h-" :icon="['fas', 'user-plus']" />
      </button>
      <div class="search-container">
        <font-awesome-icon
          class="transform translate-y-3 translate-x-2 text-gray-500 w-5 h-5"
          :icon="['fas', 'search']"
          style="position: relative; top: 1rem"
        />
        <input
          class="appearance-none pl-8 block w-48 bg-gray-100 text-gray-700 border-2 border-gray-400 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white text-left"
          id="grid-first-name"
          v-model="searchQuery"
          type="text"
          placeholder="Search users"
        />
      </div>
    </div>
    <div class="container mx-auto mx-auto max-w-screen-lg flex justify-end py-4">
      <div>
        <ul>
          <li class="pb-1">
            <span class="w-4 h-4 bg-baits-green" style="padding: 2px 10px"></span>
            <span class="pl-2">New</span>
          </li>
          <li class="pb-1">
            <span class="w-4 h-4 bg-baits-gray" style="padding: 2px 10px"></span>
            <span class="pl-2">Pending</span>
          </li>
          <li>
            <span class="w-4 h-4 bg-baits-blue" style="padding: 2px 10px"></span>
            <span class="pl-2">Verified</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="grid grid-rows-1 grid-flow-col mx-auto max-w-screen-lg" v-if="users.data.length">
      <div>
        <vue-ads-pagination
          :total-items="users.total"
          :items-per-page="Number.parseInt(users.page.pageSize)"
          :page="page"
          :loading="loading"
          @page-change="pageChange"
        >
          <template slot-scope="props">
            <div class="vue-ads-pr-2 vue-ads-leading-loose">
              {{ Number.parseInt(props.start) }} to {{ Number.parseInt(props.end) }} of {{ Number.parseInt(props.total) }} Users
            </div>
          </template>
          <template slot="buttons" slot-scope="props">
            <select v-model="selectItems" @change="getSelectedItemsByPaging(selectItems)">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <vue-ads-page-button v-for="(button, key) in props.buttons" :key="key" v-bind="button" @page-change="pageChange(button.page)" />
          </template>
        </vue-ads-pagination>
      </div>
    </div>
    <div v-if="users.data.length > 0" class="table-container max-w-screen-lg py-10 mx-auto">
      <user-card
        class="border-2 border-gray-300"
        v-for="user in users.data"
        :key="user.id"
        :img-url="user.avatar"
        :name="fullName(user.firstName, user.lastName)"
        :company-name="user.companyName"
        :company-logo="user.companyAvatar"
        :roles="user.roles"
        @edit="editUser(user)"
      />
    </div>
    <div class="grid grid-rows-1 grid-flow-col mb-10 mx-auto max-w-screen-lg" v-if="users.data.length">
      <div>
        <vue-ads-pagination
          :total-items="users.total"
          :items-per-page="Number.parseInt(users.page.pageSize)"
          :page="page"
          :loading="loading"
          @page-change="pageChange"
        >
          <template slot-scope="props">
            <div class="vue-ads-pr-2 vue-ads-leading-loose">
              {{ Number.parseInt(props.start) }} to {{ Number.parseInt(props.end) }} of {{ Number.parseInt(props.total) }} Users
            </div>
          </template>
          <template slot="buttons" slot-scope="props">
            <select v-model="selectItems" @change="getSelectedItemsByPaging(selectItems)">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <vue-ads-page-button v-for="(button, key) in props.buttons" :key="key" v-bind="button" @page-change="pageChange(button.page)" />
          </template>
        </vue-ads-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/dashboard/Header';
import UserCard from './UserCard';

export default {
  layout: 'dashboard',
  components: {
    Header,
    'user-card': UserCard,
  },
  data() {
    return {
      searchQuery: '',
      loading: false,
      page: 0,
      selectItems: 10,
    };
  },
  async fetch({ store }) {
    await store.dispatch('users/getUsers', { pageNum: '', pageSize: '' });
  },
  computed: {
    ...mapGetters({
      users: 'users/getAllUsers',
    }),
  },
  mounted() {
    this.page = Number.parseInt(this.users.page.pageNum) - 1;
  },
  methods: {
    ...mapActions({
      getUsers: 'users/getUsers',
    }),
    editUser(obj) {
      this.$router.push(`/dashboard/admin/user/edit/${obj.id}`);
    },
    addNew() {
      this.$router.push('/dashboard/admin/user/add');
    },
    fullName(first, last) {
      return `${first} ${last}`;
    },
    getSelectedItemsByPaging(pageSize) {
      this.getUsers({ pageNum: '', pageSize: pageSize });
    },
    pageChange(page) {
      this.page = page;
      this.getUsers({ pageNum: this.page, pageSize: this.users.page.pageSize });
    },
  },
};
</script>
<style>
.vue-ads-bg-teal-500 {
  background-color: #0070c0 !important;
}

.add-new {
  height: 55px;
}

button:focus {
  outline: none;
}

.per-page {
  display: inherit;
}

.per-page:before {
  content: 'Per page';
  margin-right: 10px;
}

@media (max-width: 374px) {
  .per-page {
    width: 120px;
  }
}
</style>
