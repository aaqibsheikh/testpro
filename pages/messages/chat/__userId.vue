<template>
  <div class="w-full">
    <Header />
    <bb-chat></bb-chat>
  </div>
</template>

<script>
import Header from '@/components/dashboard/Header'
import BbChat from '../BbChat'

export default {
  layout: 'dashboard',
  components: {
    Header,
    'bb-chat': BbChat
  }
}
</script>
