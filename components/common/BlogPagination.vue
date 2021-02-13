<template>
  <ul class="pagination border-2 border-baits-gray-dark py-2 px-6">
    <li class="pagination-item">
      <button type="button" class="focus:outline-none" @click="onClickPreviousPage" :disabled="isInFirstPage" :class="{ active: isInFirstPage }">Prev</button>
    </li>
    <li v-for="(page, key) in pages" :key="key" class="pagination-item">
      <button type="button" class="focus:outline-none" @click="onClickPage(page.name)" :disabled="page.isDisabled" :class="{ active: isPageActive(page.name) }">
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" class="focus:outline-none" @click="onClickNextPage" :disabled="isInLastPage" :class="{ active: isInLastPage }">Next</button>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 2,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        if (this.totalPages - this.maxVisibleButtons === 0) {
          return 1;
        } else {
          return this.totalPages - this.maxVisibleButtons;
        }
      }
      // When in between
      return this.currentPage - 1;
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>
<style>
.pagination {
  font-weight: bold;
  list-style-type: none;
}
.pagination li {
  padding-left: 5px;
  padding-right: 5px;
}
.pagination-item {
  display: inline-block;
}

.active {
  color: #a0a0a0;
}
</style>