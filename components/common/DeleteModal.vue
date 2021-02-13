<template>
  <div class="h-auto">
    <vue-tailwind-modal ref="vueModal" id="vueModal" class="pl-16" :showing="isShowing" @close="hideMe">
      <div class="bg-red-100 text-center text-red-700 font-bold border-red-400 rounded-t px-4 py-2">
        Alert
      </div>
      <div class="border-0 border-red-400 text-center rounded-b px-4 py-3 text-700">
        <p>Do you want to remove <span class="font-bold">{{ itemName }} </span> ?</p>
         <div class="confirm w-full p-4 border-red-700 flex justify-center">
            <div class="w-1/2 sm:w-1/4 flex justify-between">
              <button
                @click="deleteItem"
                class="bg-red-500 px-2 py-1 rounded text-gray-100 text-sm"
              >
                YES
              </button>
              <button
                @click="$emit('toggle')"
                class="bg-gray-800 px-2 rounded text-gray-100 text-sm"
              >
                NO
              </button>
            </div>
          </div>
      </div>
      <!-- <slot name="submit" :newValue="newValue">hello</slot> -->
      <!-- <p >{{ row }}</p> -->
    </vue-tailwind-modal>
  </div>
</template>

<script>
import VueTailwindModal from 'vue-tailwind-modal'

export default {
  name: 'DeleteModal',
  components: {
    VueTailwindModal
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default:() => {}
    },
    itemName: {
      type: String
    }
  },
  data() {
    return {
      isShowing: false,
      newValue: {}
    }
  },
  methods: {
    hideMe() {
      this.$emit('toggle')
    },
    updateValue(val) {
      // this.$emit('update')
      console.log(val)
    },
    deleteItem() {
      this.$emit('delete')
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .row {
    display: flex;
  }

  .row > span {
    margin: 2% 0;
  }

  .col1 {
    width: 30%;
  }

  .col2 {
    flex: 1 1 auto;
  }

  .col3 {
    width: 5%;
  }
</style>
