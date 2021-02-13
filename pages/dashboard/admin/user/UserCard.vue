<template>
  <div class="max-w-full py-1 px-1">
    <div class="main-info w-full flex justify-center font-bold">
      <div class="person-container content-center flex content-center justify-center">
        <div v-if="imgUrl" class="person w-24 h-24 relative rounded-full border-black my-auto" :style="{ 'background-image': 'url(' + imgUrl + ')' }"></div>
        <div v-else class="person w-24 h-24 relative rounded-full border-black my-auto">
          <img class="rounded-full" src="~/static/images/default-user.jpg" alt="" />
        </div>
        <div
          v-if="companyLogo"
          class="person w-20 h-20 border-gray-400 border-solid border-2 relative rounded-full border-black my-auto"
          :style="{ 'background-image': 'url(' + companyLogo + ')' }"
        ></div>
        <div
          v-else
          class="person w-20 h-20 text-gray-200 text-center border-gray-400 border-solid border-2 relative rounded-full border-black my-auto text-6xl"
        >
          <font-awesome-icon :icon="['fas', 'building']" style="width: 60px; height: 60px; display: inline-block; vertical-align: baseline" />
        </div>
      </div>
      <div class="the-msg bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between flex-auto leading-normal">
        <div class="mb-2 ml-4">
          <div class="text-gray-900 info text-xl mb-2">{{ name }}</div>
          <p class="text-gray-700 company-info text-base">{{ companyName }}</p>
          <div class="mt-3 actions-big">
            <template v-for="role in roles">
              <button :key="role" v-if="role.statusText === 'verified'" class="py-2 px-4 font-bold text-white rounded bg-baits-blue focus:outline-none">
                {{ role.role }}
              </button>
              <button :key="role" v-if="role.statusText === 'new'" class="py-2 px-4 font-bold text-white rounded bg-baits-green focus:outline-none">
                {{ role.role }}
              </button>
              <button :key="role" v-if="role.statusText === 'pending'" class="py-2 px-4 font-bold text-white rounded bg-baits-light-gray focus:outline-none">
                {{ role.role }}
              </button>
            </template>
            <button v-if="!isEditing" @click="edit()" class="lg:ml-20 ml-4 text-3xl">
              <font-awesome-icon class="inline-block w-8 mr-6" :icon="['fas', 'pencil-alt']" />
            </button>
          </div>
          <div class="mt-3 actions-small flex">
            <template v-for="role in roles">
              <button :key="role" v-if="role.statusText === 'verified'" class="mt-1 py-2 px-4 font-bold text-white rounded bg-baits-blue focus:outline-none">
                {{ role.role }}
              </button>
              <button :key="role" v-if="role.statusText === 'new'" class="mt-1 py-2 px-4 font-bold text-white rounded bg-baits-green focus:outline-none">
                {{ role.role }}
              </button>
              <button
                :key="role"
                v-if="role.statusText === 'pending'"
                class="mt-1 py-2 px-4 font-bold text-white rounded bg-baits-light-gray focus:outline-none"
              >
                {{ role.role }}
              </button>
            </template>
            <button v-if="!isEditing" @click="edit()" class="text-3xl">
              <font-awesome-icon class="inline-block w-8 mr-6" :icon="['fas', 'pencil-alt']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: false,
    },
    imgUrl: {
      type: String,
      required: false,
    },
    companyLogo: {
      type: String,
      required: false,
    },
    roles: {
      type: Array,
      required: false,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    openMsg() {
      this.$emit('opened');
    },
    edit() {
      this.$emit('edit');
    },
  },
};
</script>
<style scoped>
.usr-container {
  border: 4px solid #cbd5e0;
}

.usr-container:not(:first-child) {
  border-top: none;
}

.person {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}

.info {
  color: #0070c0;
}

.actions-big {
  flex-wrap: nowrap;
}

.edit-container div {
  white-space: nowrap;
  text-align: right;
}

.edit-container svg {
  font-size: 50px;
}

@media (min-width: 768px) {
  .main-info {
    padding: 0 3rem;
  }

  .actions-small {
    display: none;
  }
}

@media (max-width: 767px) {
  .main-info {
    display: flex;
    flex-direction: column;
  }

  .info,
  .company-info {
    text-align: center;
  }

  .actions-big {
    display: none;
  }

  .actions-small {
    justify-content: space-between;
  }
}

@media (max-width: 546px) {
  .h-32 {
    height: 5rem;
  }

  .w-32 {
    width: 5rem;
  }

  .h-24 {
    height: 4rem;
  }

  .w-24 {
    width: 4rem;
  }

  .actions-small {
    flex-direction: column;
  }

  .actions-small div {
    text-align: center;
  }

  .actions-small > .text-3xl {
    margin-top: 10px;
  }

  .h-4 {
    height: 0.75rem;
  }

  .w-4 {
    width: 0.75rem;
  }

  .mr-2 {
    margin-right: 0;
  }

  .text-6xl {
    font-size: 2rem !important;
  }
}

@media (max-width: 406px) {
  .actions-small > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .actions-small > div:first-child button {
    margin: 5px 0;
  }
}
</style>
