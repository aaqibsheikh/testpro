<template>
  <div class="relative" style="z-index: 800">
    <div class="fab-wrapper" @mouseover="fab = true" @mouseleave="fab = false">
      <a href="#" class="fab-button">
        <p>
          <i v-if="!fab" class="fas fa-plus"></i>
          <i v-if="fab" class="fas fa-minus"></i>
        </p>
      </a>
      <ul class="fab-item-list">
        <li class="fab-item">
          <img
            @click="$router.push('/dashboard/bites/closed')"
            width="40"
            height="40"
            class="inline-block"
            src="~/static/images/closed.png"
          />
        </li>
        <li class="fab-item">
          <img
            @click="$router.push('/dashboard/bites/open')"
            width="40"
            height="40"
            class="inline-block"
            src="~/static/images/open.png"
          />
        </li>
        <li class="fab-item">
          <img
            @click="$router.push('/dashboard/bites/pending')"
            width="40"
            height="40"
            class="inline-block"
            src="~/static/images/pending.png"
          />
        </li>
        <li class="fab-item">
          <img
            @click="$router.push('/dashboard/bites/pool')"
            width="40"
            height="40"
            class="inline-block"
            src="~/static/images/pool.png"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fab: false,
    };
  },
};
</script>
<style>
/*** FAB Button 
Component Styles***/
/*Fab Variables*/
/*FAB Styles*/
.fab-wrapper {
  position: fixed;
  right: 20px;
  bottom: 15px;
  z-index: 5;
  display: flex;
  flex-direction: center;
  align-items: center;
}

.fab-wrapper:hover .fab-item-list {
  bottom: 70px;
  opacity: 1;
  transition: 0.5s ease-in;
}

.fab-button {
  width: 3rem;
  height: 3rem;
  background-color: #06ebc3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease-in-out;
}

.fab-button p {
  font-size: 20px;
  color: #ffffff;
  text-align: center;
}

.fab-item-list {
  opacity: 0;
  width: 100%;
  position: absolute;
  padding: 0px;
  list-style: none;
  bottom: 0px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  transition: all 0.1s ease-in-out;
}

.fab-item {
  width: 3rem;
  height: 3rem;
  background-color: white;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  color: #ffffff;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: center;
  transition: all 0.1s ease-in-out;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
