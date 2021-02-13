<template>
  <div class="w-full">
    <Header />
    <div class="container mx-auto flex justify-between p-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-2 px-4 rounded-full" label="Add New" @click="addNew()">
        <font-awesome-icon class="w-4 h-4" icon="plus" />
      </button>
      <div class="search-container">
        <font-awesome-icon class="transform absolute translate-y-3 translate-x-2 text-gray-500 w-5 h-5" icon="search" />
        <input
          class="appearance-none pl-8 block w-48 bg-gray-100 text-gray-700 border-2 border-gray-400 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white text-left"
          id="grid-first-name"
          v-model="searchQuery"
          type="text"
          placeholder="Search Companies"
        />
      </div>
    </div>
    <div class="table-container p-10 mx-auto">
      <bb-table ref="dataTable" :labels="tableTitles" :list-data="companies.length > 0 ? fitleredItems(companies) : []">
        <template v-slot:actions="company">
          <div class="flex actions-container">
            <font-awesome-icon class="text-gray-600 hover:text-blue-500 cursor-pointer mx-6 w-5 h-5" icon="edit" @click="editCompany(company)" />
            <font-awesome-icon class="text-gray-600 hover:text-red-700 cursor-pointer mx-6 w-5 h-5" icon="trash-alt" @click="showDelModal(company)" />
          </div>
        </template>
      </bb-table>
    </div>
    <del-modal ref="delModal" :item-name="companyToDel.name" @toggle="closeModal" @delete="removeCompany()"></del-modal>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Header from '@/components/dashboard/Header';
import BbTable from '@/components/common/BbTable';
import DeleteModal from '@/components/common/DeleteModal';

export default {
  layout: 'dashboard',
  components: {
    Header,
    'bb-table': BbTable,
    'del-modal': DeleteModal,
  },
  data() {
    return {
      tableTitles: ['Logo', 'ID', 'Name', 'Type', 'Remarks', 'Actions'],
      searchQuery: '',
      selected: {},
      isEditing: false,
      companyToDel: {},
    };
  },
  async fetch({ store }) {
    await store.dispatch('company/getCompanies');
  },

  computed: {
    ...mapGetters({
      companies: 'company/isCompanies',
    }),
  },
  methods: {
    ...mapActions({
      // selectCompany: 'company/applySingleCompany',
      deleteCompany: 'company/deleteCompany',
    }),
    editCompany(obj) {
      this.selected = { ...obj.row };
      this.$router.push('/dashboard/admin/company/edit/' + this.selected.id);
    },
    fitleredItems() {
      if (this.companies.length > 0) {
        return this.companies.filter((company) => {
          const regex = new RegExp('(' + this.searchQuery + ')', 'i');
          return company.name.match(regex);
        });
      }
    },
    removeCompany() {
      // this.companies.splice( this.companyToDel.index, 1)
      this.deleteCompany(this.companyToDel);
      this.closeModal();
      this.$refs.dataTable.pageNumber = 0;
    },
    showDelModal(obj) {
      this.companyToDel = { ...obj.row };
      this.$refs.delModal.isShowing = true;
    },
    closeModal() {
      this.$refs.delModal.isShowing = false;
    },
    rowUpdate(val) {
      console.log(val.value);
    },
    addNew() {
      this.$router.push('/dashboard/admin/company/add');
    },
  },
};
</script>
<style>
button:focus {
  outline: none;
}
</style>
