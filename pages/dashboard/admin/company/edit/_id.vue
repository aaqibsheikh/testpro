<template>
  <div class="w-full">
    <Header />
    <div class="edit-info flex flex-wrap">
      <div class="col1 sm:w-1/2 w-full p-16 sm:px-2 flex justify-center">
        <div class="info max-w-sm rounded overflow-hidden shadow-lg">
          <div class="w-24 h-24 rounded-full m-auto overflow-hidden">
            <img :src="companyAvatar" class="w-24 h-24" />
          </div>
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-4 text-center">{{ company.name }}</div>
            <div class="font-bold p-2 text-l mb-2 flex justify-between">
              <span class="font-medium">Type:</span>
              {{ company.type }}
            </div>
            <div class="font-bold p-2 text-l mb-2 flex justify-between bg-gray-300">
              <span class="font-medium">Remarks:</span>
              <span v-if="company.remarks">{{ company.remarks }}</span>
              <span v-else>N/A</span>
            </div>
          </div>
          <!-- <div class="px-6 py-4">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold  text-gray-700 mr-2">#photography</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
          </div>-->
          <div class="confirm w-full p-16 flex justify-center">
            <div class="w-1/2 sm:w-1/4 flex justify-between">
              <button class="bg-green-500 p-2 rounded text-gray-100" @click="updateCompany" title="Save">
                <font-awesome-icon class="w-5 h-5" icon="check" />
              </button>
              <button @click="refresh" class="bg-gray-800 p-2 rounded text-gray-100" title="Refresh">
                <font-awesome-icon class="w-5 h-5" icon="undo" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <form class="col1 sm:w-1/2 w-full px-5 sm:pr-16 py-16">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">Company Name</label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              v-model="company.name"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Type</label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              v-model="company.type"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Remarks</label>
            <textarea
              v-model="company.remarks"
              name="remarks"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-24"
            ></textarea>
          </div>
        </div>
        <!-- <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              Address
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"="">
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            City
            </label>
            <div class="relative">
              <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option>New York</option>
                <option>London</option>
                <option>Singapore</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
              Zip
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text"="">
          </div>
        </div>-->
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Avatar</label>
            <form enctype="multipart/form-data">
              <client-only>
                <image-uploader
                  :maxWidth="512"
                  :maxHeight="512"
                  style="display: none"
                  id="company_avatar_upload"
                  :preview="false"
                  doNotResize="gif"
                  accept=".jpg, .jpeg, .png"
                  outputFormat="verbose"
                  @input="onFileSelection"
                ></image-uploader>
              </client-only>
            </form>
            <div
              class="inline-block bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-2 px-4 rounded-full"
              label="Add New"
              @click="openAvatarDialog"
            >
              <font-awesome-icon class="w-5 h-5" icon="plus" />
            </div>
            <span class="text-gray-700">Upload image</span>
          </div>
          <div class="w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Status</label>
            <toggle-button @change="onChangeCompanyStatus" v-model="companyStatus" :sync="true" color="#0070C0" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Header from '@/components/dashboard/Header';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  layout: 'dashboard',
  components: {
    Header,
  },
  data() {
    return {
      companyStatus: '',
      companyName: 'Company Name',
      industryName: 'Industry Name',
      subCategory: 'Sub-category Name',
      registeredName: 'Resigster Name',
      company: {},
      selectedFile: null,
      companyAvatar: null,
    };
  },
  async fetch({ params, store }) {
    await store.dispatch('company/getSelectedCompany', params.id);
  },
  computed: {
    ...mapGetters({
      selected: 'company/getSingleCompany',
    }),
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      newCompanyData: 'company/updateCompany',
    }),
    onChangeCompanyStatus(status) {
      this.companyStatus = status.value;
    },
    openAvatarDialog() {
      document.getElementById('company_avatar_upload').click();
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    onFileSelection(avatarImage) {
      this.setLoader(true);

      var newFile = this.dataURLtoFile(avatarImage.dataUrl, avatarImage.info.name);
      // If file size is greater than 1MB
      if (newFile.size > 1000000) {
        alert('File is too big!');
        this.setLoader(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', newFile);

      var api = `/company/${this.$route.params.id}/avatar`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const response = this.$axios
        .post(api, formData, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get('baitsToken')}`,
          },
        })
        .then((res) => {
          if (res.data.result) {
            this.companyAvatar = res.data.data.path;
            this.setLoader(false);
            this.$toast.open({
              message: 'Company avatar updated successfully...!',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });
          } else {
            this.setLoader(false);
            this.$toast.open({
              message: 'Failed to update company avatar.',
              type: 'error',
              duration: 5000,
              dismissible: true,
            });
          }
        })
        .catch((error) => {
          this.setLoader(false);
          console.log(error);
          this.$toast.open({
            message: 'Failed to update company avatar.',
            type: 'error',
            duration: 5000,
            dismissible: true,
          });
        });
    },
    updateCompany() {
      this.setLoader(true);
      let updateCompanyData = {
        id: this.company.id,
        name: this.company.name,
        type: this.company.type,
        remarks: this.company.remarks,
        status: this.companyStatus === true ? 1 : 0,
      };

      this.newCompanyData(updateCompanyData)
        .then((response) => {
          this.setLoader(false);
          this.$toast.open({
            message: 'Company updated',
            type: 'success',
            duration: 5000,
            dismissible: true,
          });
        })
        .catch((error) => {
          this.setLoader(false);
          this.$toast.open({
            message: 'Failed...!',
            type: 'error',
            duration: 5000,
            dismissible: true,
          });
        });
    },
    refresh() {
      location.reload();
    },
  },
  mounted() {
    this.company = this.selected;
    this.companyAvatar = this.company.avatar;
    this.companyStatus = this.company.status === 1 ? true : false;
  },
  watch: {
    selected(x, y) {
      this.company = this.selected;
    },
  },
};
</script>
<style scoped>
button:focus {
  outline: none;
}

.info {
  min-width: 100%;
}

input[type='file'] {
  width: 4%;
  visibility: hidden;
}

@media (max-width: 960px) {
  .edit-info {
    flex-direction: column;
  }

  .edit-info > .col1 {
    width: 100%;
  }
}

@media (max-width: 620px) {
  .p-16 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
