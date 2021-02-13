<template>
  <div>
    <table class="w-full">
      <thead>
        <tr>
          <th class="px-4 py-2 font-thin text-center" v-for="(label, i) in labels" :key="i">{{ label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in paginatedData" :key="i" :class="{ 'bg-gray-100': i % 2 === 1 }">
          <!--
        <div v-for="(value, name) in object">
             {{ name }}: {{ value }}
          </div>-->
          <td class="border px-4 py-2">
            <div class="w-8 h-8 rounded-full m-auto overflow-hidden">
              <img v-if="row.avatar" :src="row.avatar" />
              <img v-else src="~/static/images/default-user.jpg" />
            </div>
          </td>
          <td class="border px-4 py-2 text-center">
            <div class="w-8 h-8 rounded-full m-auto overflow-hidden">
              <img v-if="row.companyAvatar" :src="row.companyAvatar" />
              <img v-else src />
            </div>
          </td>
          <td class="border px-4 py-2 text-center">{{ row.companyName }}</td>
          <td class="border px-4 py-2 text-center">{{ row.firstName }}</td>
          <td class="border px-4 py-2 text-center">{{ row.lastName }}</td>
          <td class="border px-4 py-2 text-center">{{ row.id }}</td>
          <td class="border px-4 py-2 text-center" :class="[+row.status === 1 ? 'bg-green-500' : 'bg-red-600']">{{ row.status }}</td>
          <td class="border px-4 py-2 text-center">
            <span v-for="item in row.roles" :key="item.id">{{ item.role }}</span>
          </td>
          <td class="border px-4 py-2 text-center">
            <slot name="actions" :index="i" :row="row">Actions</slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="controls text-center mt-3">
      <button :disabled="pageNumber == 0" @click="prevPage">
        <font-awesome-icon class="mr-3 w-4 h-4" :class="{ 'text-blue-600': pageNumber != 0, 'text-gray-400': pageNumber === 0 }" icon="chevron-left" />
      </button>
      {{ pageNumber + 1 }} of {{ pageCount }}
      <button :disabled="pageNumber >= pageCount - 1" @click="nextPage">
        <font-awesome-icon
          class="ml-2 w-4 h-4"
          :class="{ 'text-gray-400': pageNumber >= pageCount - 1, 'text-blue-600': pageNumber < pageCount - 1 }"
          icon="chevron-right"
        />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserTable',
  props: {
    labels: Array,
    listData: {
      type: Array,
      required: true,
    },
    size: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  data: () => {
    return {
      pageNumber: 0,
    };
  },
  computed: {
    pageCount() {
      let l = this.listData.length;
      let s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.listData.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },
};
</script>
<style scoped>
@media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
  /* Force table to not be like tables anymore */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
  }

  td {
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 2%;
  }

  td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }
}
</style>
