<template>
  <div class="max-w-full py-1 px-1 cursor-pointer msg-container border-gray-400" @click="openMsg">
    <div class="main-msg w-full flex" :class="{ 'font-bold': unread }">
      <div class="person-container content-center flex content-center justify-center">
        <div class="person w-32 h-32 relative rounded-full border-black my-auto" :style="{ 'background-image': 'url(' +  imgUrl + ')' }">
          <span class="shadow-lg w-4 h-4 z-40 rounded-full absolute bottom-0 right-0 mr-2 mb-2  border-gray-400 border-solid border-2" :class="{'bg-green-400': status==='active', 'bg-gray-500': status==='away'}">
          </span>
        </div>
      </div>
      <div class="the-msg bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between flex-auto leading-normal">
        <div class="mb-8">
          <div class="text-gray-900 text-xl mb-2">{{ name }}</div>
          <p class="text-gray-700 text-base"> {{ caseSummary }} </p>
          <div class="text-gray-900 text-xl mb-2">Sender: {{ lastMsg }}</div>
        </div>
      </div>
      <div class="date-container p-4">
        <div> {{ contactDate }} </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MessageCard",
  props: {
    name: {
      type: String,
      required: true
    },
    caseSummary: {
      type: String,
      required: true
    },
    lastMsg: {
      type: String,
      required: true
    },
    // this will change to type: Date when backend is ready
    contactDate: {
      type: String,
      required: false
    },
    imgUrl: {
      type: String,
      required: false
    },
    status: {
      type: String,
      required: false
    },
    unread: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    openMsg() {
      this.$emit('opened')
    }
  }
}

</script>
<style scoped>
.msg-container {
  border: 4px solid #cbd5e0;
}

.msg-container:not(:first-child) {
  border-top: none;
}

.person {
  background-size: contain;
  background-repeat: no-repeat
}

.date-container div {
  white-space: nowrap;
  text-align: right;
}


@media (max-width: 546px) {

  .h-32 {
    height: 4rem
  }

  .w-32 {
    width: 4rem
  }


  .main-msg {
    display: grid;
    grid-template-columns: 45% 1fr 45%;
    grid-template-rows: auto auto
  }

  .person-container {
    justify-content: flex-start;
    padding: 2px 1rem;
  }

  .person {
    grid-column: 1;
    grid-row: 1;
  }

  .the-msg {
    justify-content: flex-start;
    grid-column: 1/4;
    grid-row: 2;
  }

  .date-container {
    grid-column: 3;
    grid-row: 1;
  }

  .h-4 {
    height: 0.75rem
  }

  .w-4 {
    width: 0.75rem
  }

  .mr-2 {
    margin-right: 0
  }

}

</style>
