<template>
  <div class="w-full">
    <Header />
    <div class="w-full flex flex-col p-5 justify-center" v-if="commingSoon === 1">
      <div class="container mx-auto mt-6 max-w-2xl flex justify-between">
        <h2 class="font-bold text-2xl text-gray-700">Messages</h2>
        <div class="search-container">
          <font-awesome-icon class="transform absolute translate-y-3 translate-x-2 text-gray-700 w- h-5" icon="search" />
          <input
            class="appearance-none pl-8 block w-48 bg-gray-100 text-gray-700 border-2 border-gray-400 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white text-left"
            id="grid-first-name"
            type="text"
            placeholder="Search Messages"
          />
        </div>
      </div>
      <div class="container mx-auto mt-6 max-w-2xl">
        <msg-card
          v-for="(message, i) in messages"
          :key="i"
          :name="message.name"
          :case-summary="message.userCase"
          :last-msg="message.msg"
          :contact-date="message.lastContact"
          :img-url="message.img"
          :status="message.status"
          :unread="message.unread"
          @opened="msgOpened(i)"
        />
      </div>
    </div>
    <div v-else class="text-center py-40">
      <img src="~/static/images/coming-soon-banner.jpg" class="inline-block" />
    </div>
  </div>
</template>
<script>
import Header from '@/components/dashboard/Header';
import MsgCard from './MsgCard';

export default {
  layout: 'dashboard',
  components: {
    Header,
    'msg-card': MsgCard,
  },
  data() {
    return {
      commingSoon: process.env.COMING_SOON,
      messages: [
        {
          name: 'Joe Doe',
          userCase: 'Short Term Loan of $50,000',
          msg: 'My message is ...',
          lastContact: '10:10 PM',
          img: 'https://randomuser.me/api/portraits/men/18.jpg',
          status: 'active',
          unread: true,
        },
        {
          name: 'Matt Josh',
          userCase: 'Mortgage Loan of $300,000',
          msg: 'My message is ...',
          lastContact: '10:10 PM',
          img: 'https://randomuser.me/api/portraits/men/17.jpg',
          status: 'away',
          unread: true,
        },
      ],
    };
  },
  // sockets: {
  //   connect() {
  //     console.log('socket connected')
  //   },
  // },
  mounted() {
    // if (this.commingSoon === 1) {
    //   this.$socket.client.emit('chat', { "roomId": "helo", "userId": "001", "message": "test message" });
    // }
  },
  methods: {
    msgOpened(i) {
      this.messages[i].unread = !this.messages[i].unread;
      this.$router.push('/messages/chat/' + i);
    },
  },
};
</script>
