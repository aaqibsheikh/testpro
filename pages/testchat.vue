<template>
  <div>
    <div class="grid grid-cols-2 gap-6">
      <div class="m-auto p-20">
        <h2 class="dark-green text-center text-3xl leading-none mt-10 mb-10">Emit</h2>
        <div class="mb-6">
          <input v-model="emitEventName" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Event Name">
          <button class="bg-baits-blue hover:bg-baits-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="sendMessage">
            Emit
          </button>
        </div>
        <button type="button" @click="addNewItem" class="bg-baits-green text-white font-bold rounded p-2 mb-4">+ Add</button>
        <div class="items-center flex flex-wrap justify-center mb-4" v-for="(item, index) in chat" :key="index">
          <div>
            <input v-model="item.key" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="key">
          </div>
          <div class="ml-5">
            <input v-model="item.value" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="value">
          </div>
          <div>
            <button class="bg-red-600 text-black font-bold rounded px-2 py-1 ml-2 " type="button" v-if="index !== 0" @click="removeItem(index)">X</button>
          </div>
        </div>
      </div>
      <div class="m-auto p-20">
        <h2 class="dark-green text-center text-3xl leading-none mb-10">Listen</h2>
        <div>
          <input v-model="eventName" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Event name">
          <button class="bg-baits-blue hover:bg-baits-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="listenHandler">
            Listen
          </button>
        </div>
        <p>
          <h2 class="text-xl font-bold py-6">Response of Listener</h2>
          <p>
            {{eventResult}}
          </p>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chat: [{
        key: '',
        value: '',
      }],
      eventName: '',
      emitEventName: '',
      eventResult: '',
    }
  },
  // sockets: {
  //   connect() {
  //     console.log('socket connected')
  //   },
  //   chat(data) {
  //     console.log('chat listener', data);
  //   }
  // },
  mounted() {},
  methods: {
    removeItem(i) {
      console.log(i);
      this.chat.splice(i, 1);
    },
    addNewItem() {
      this.chat.push({
        key: '',
        value: '',
      });
    },
    sendMessage() {
      let obj = {};

      for (let i = 0; i < this.chat.length; i++) {
        obj[this.chat[i].key] = this.chat[i].value
      }

      // this.$socket.client.emit(this.emitEventName, obj);
      this.chat = [{
        key: '',
        value: '',
      }];
    },
    listenHandler() {
      // this.$options.sockets.chat = (data) => {
      //   console.log(data)
      // }

    }
  }
}

</script>
