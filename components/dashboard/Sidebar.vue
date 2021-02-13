<template>
  <div :class="[isPanelOpen ? 'w-full h-full' : 'sidebar-w']" class="bg-baits-blue relative">
    <div>
      <div class="mx-4 pt-5 cursor-pointer" @click="$router.push('/')">
        <img src="~/static/images/logo.png" class="w-48" />
      </div>
      <div class="mx-4 mt-8 flex flex-wrap items-center">
        <div class="w-12 h-12 rounded-full overflow-hidden inline-block cursor-pointer" @click="openAvatarDialog">
          <form enctype="multipart/form-data">
            <client-only>
              <image-uploader
                :maxWidth="512"
                :maxHeight="512"
                style="display: none"
                id="file_upload"
                :preview="false"
                doNotResize="gif"
                accept=".jpg, .jpeg, .png, .gif"
                outputFormat="verbose"
                @input="fileseleted"
                :quality="0.9"
              ></image-uploader>
            </client-only>
          </form>
          <template v-if="user.avatar">
            <img class="w-12 h-12" :src="user.avatar" />
          </template>
          <template v-else>
            <img class="w-12 h-12" src="~/static/images/default-user.jpg" />
          </template>
        </div>
        <div class="w-12 h-12 rounded-full overflow-hidden inline-block" v-if="user.companyAvatar">
          <template>
            <img class="w-12 h-12" :src="user.companyAvatar" />
          </template>
        </div>
        <div class="inline-block text-white px-3">
          <span class="text-xs">Welcome,</span>
          <h2 class="text-sm cursor-pointer" @click="openUserProfile">
            {{ user.firstName + ' ' + user.lastName }}
          </h2>
        </div>
      </div>
      <div
        @click="goToPath('/dashboard/plans')"
        v-if="user.hasOwnProperty('roles') && user.roles.includes('admin')"
        class="flex flex-wrap items-center justify-center cursor-pointer text-white text-center border border-gray-500 py-2 px-6 mt-6 mx-10 rounded-md"
      >
        <span>
          <font-awesome-icon class="w-6 h-6" :icon="['fas', 'award']" />
        </span>
        <span class="text-sm ml-2 text-baits-green">Go Premium</span>
      </div>
      <div class="py-10 text-white">
        <div>
          <div
            @click="toggleSidebarMenuItem(!adminMenu, 'admin')"
            v-if="user.hasOwnProperty('roles') && user.roles.includes('admin')"
            class="flex flex-wrap py-3 px-4 items-center justify-start cursor-pointer text-sm"
            :class="[$route.path === '/admin' ? 'link-active custom-br-green' : '']"
          >
            <div class="w-1/6">
              <img src="~/static/images/admin.svg" class="inline-block w-6 h-6" />
            </div>
            <div class="w-4/6 pl-2">
              <span>Admin</span>
            </div>
            <div class="w-1/6">
              <span>
                <font-awesome-icon class="w-4 h-4" :icon="['fas', 'chevron-down']" />
              </span>
            </div>
          </div>
          <slide-up-down :active="adminMenu" :duration="500">
            <div>
              <div
                @click="goToPath('/dashboard/admin')"
                v-if="user.hasOwnProperty('roles') && user.roles.includes('admin')"
                :class="[$route.path === '/dashboard/admin' ? 'link-active custom-br-green' : '']"
                class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer text-sm"
              >
                <div class="w-1/6">
                  <font-awesome-icon class="w-6 h-6" :icon="['fas', 'tachometer-alt']" />
                </div>
                <div class="w-4/6 pl-2">
                  <span>Dashboard</span>
                </div>
                <div class="w-1/6"></div>
              </div>
              <div
                @click="goToPath('/dashboard/admin/company')"
                v-if="user.hasOwnProperty('roles') && user.roles.includes('admin')"
                :class="[$route.path.startsWith('/dashboard/admin/company') ? 'link-active custom-br-green' : '']"
                class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer text-sm"
              >
                <div class="w-1/6">
                  <img src="~/static/images/companies-white.svg" class="inline-block w-6 h-6" />
                </div>
                <div class="w-4/6 pl-2">
                  <span>Companies</span>
                </div>
                <div class="w-1/6"></div>
              </div>
              <div
                @click="goToPath('/dashboard/admin/user')"
                v-if="user.hasOwnProperty('roles') && user.roles.includes('admin')"
                :class="[$route.path.startsWith('/dashboard/admin/user') ? 'link-active custom-br-green' : '']"
                class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer text-sm"
              >
                <div class="w-1/6">
                  <img src="~/static/images/users-white.svg" class="inline-block w-6 h-6" />
                </div>
                <div class="w-4/6 pl-2">
                  <span>Users</span>
                </div>
                <div class="w-1/6"></div>
              </div>
              <div
                @click="goToPath('/dashboard/admin/bait')"
                v-if="user.hasOwnProperty('roles') && user.roles.includes('admin')"
                :class="[$route.path.startsWith('/dashboard/admin/bait') ? 'link-active custom-br-green' : '']"
                class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer text-sm"
              >
                <div class="w-1/6">
                  <img src="~/static/images/bait-white.svg" class="inline-block w-6 h-6" />
                </div>
                <div class="w-4/6 pl-2">
                  <span>Baits</span>
                </div>
                <div class="w-1/6"></div>
              </div>
              <div
                @click="goToPath('/dashboard/admin/promotion')"
                v-if="user.hasOwnProperty('roles') && user.roles.includes('admin')"
                :class="[$route.path.startsWith('/dashboard/admin/promotion') ? 'link-active custom-br-green' : '']"
                class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer text-sm"
              >
                <div class="w-1/6">
                  <img src="~/static/images/my-promotion.svg" class="inline-block w-6 h-6" />
                </div>
                <div class="w-4/6 pl-2">
                  <span>Promotion</span>
                </div>
                <div class="w-1/6"></div>
              </div>
              <div
                @click="goToPath('/dashboard/admin/blog')"
                v-if="user.hasOwnProperty('roles') && user.roles.includes('admin')"
                :class="[$route.path.startsWith('/dashboard/admin/blog') ? 'link-active custom-br-green' : '']"
                class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer text-sm"
              >
                <div class="w-1/6">
                  <img src="~/static/images/blog.svg" class="inline-block w-5 h-5" />
                </div>
                <div class="w-4/6 pl-2">
                  <span>Blogs</span>
                </div>
                <div class="w-1/6"></div>
              </div>
            </div>
          </slide-up-down>
        </div>
        <!-- :class="[
            $route.path.split('/').includes('baits')
              ? 'link-active custom-br-green'
              : '',
        ]"-->
        <div
          @click="
            goToPath('/dashboard/');
            toggleSidebarMenuItem(false, '');
          "
          v-if="user.hasOwnProperty('roles') && user.roles.includes('consumer')"
          :class="[$route.path == '/dashboard' ? 'link-active custom-br-green' : '']"
          class="flex flex-wrap py-3 px-4 items-center justify-start cursor-pointer text-sm"
        >
          <div class="w-1/6">
            <svg class="inline-block h-6 w-6" height="511pt" viewBox="0 1 511 511.999" width="511pt" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#fff"
                d="m498.699219 222.695312c-.015625-.011718-.027344-.027343-.039063-.039062l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.808594-33.328126-13.808594-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.144532.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.441406 13.234375 31.273437 13.746093.484375.046876.96875.070313 1.457031.070313h8.320313v153.695313c0 30.417968 24.75 55.164062 55.167969 55.164062h81.710937c8.285157 0 15-6.71875 15-15v-120.5c0-13.878906 11.292969-25.167969 25.171875-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.28125 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.164062v-153.695313h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.8125 18.359375-18.367187 18.367187-48.253906.027344-66.632813zm-21.242188 45.421876c-3.238281 3.238281-7.542969 5.023437-12.117187 5.023437h-22.71875c-8.285156 0-15 6.714844-15 15v168.695313c0 13.875-11.289063 25.164062-25.167969 25.164062h-66.710937v-105.5c0-30.417969-24.746094-55.167969-55.167969-55.167969h-48.195313c-30.421875 0-55.171875 24.75-55.171875 55.167969v105.5h-66.710937c-13.875 0-25.167969-11.289062-25.167969-25.164062v-168.695313c0-8.285156-6.714844-15-15-15h-22.328125c-.234375-.015625-.464844-.027344-.703125-.03125-4.46875-.078125-8.660156-1.851563-11.800781-4.996094-6.679688-6.679687-6.679688-17.550781 0-24.234375.003906 0 .003906-.003906.007812-.007812l.011719-.011719 208.847656-208.839844c3.234375-3.238281 7.535157-5.019531 12.113281-5.019531 4.574219 0 8.875 1.78125 12.113282 5.019531l208.800781 208.796875c.03125.03125.066406.0625.097656.09375 6.644531 6.691406 6.632813 17.539063-.03125 24.207032zm0 0"
              />
            </svg>
          </div>
          <div class="w-4/6 pl-2">
            <span>Home</span>
          </div>
          <div class="w-1/6"></div>
        </div>

        <div
          @click="
            goToPath('/dashboard/');
            toggleSidebarMenuItem(false, '');
          "
          v-if="user.hasOwnProperty('roles') && user.roles.includes('admin')"
          :class="[$route.path == '/dashboard' ? 'link-active custom-br-green' : '']"
          class="flex flex-wrap py-3 px-4 items-center justify-start cursor-pointer text-sm"
        >
          <div class="w-1/6">
            <!-- <svg
              class="inline-block h-6 w-6"
              enable-background="new 0 0 512 512"
              height="512"
              viewBox="0 0 512 512"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#fff"
                d="m452 48h-392c-33.084 0-60 26.916-60 60v49.495l220.191 163.781c10.709 7.965 23.259 11.948 35.809 11.948s25.1-3.982 35.809-11.948l220.191-163.781v-49.495c0-33.084-26.916-60-60-60zm20 89.396-204.063 151.784c-7.14 5.311-16.734 5.311-23.873 0l-204.064-151.784v-29.396c0-11.028 8.972-20 20-20h392c11.028 0 20 8.972 20 20zm0 99.703 40-29.752v196.653c0 33.084-26.916 60-60 60h-392c-33.084 0-60-26.916-60-60v-196.653l40 29.752v166.901c0 11.028 8.972 20 20 20h392c11.028 0 20-8.972 20-20z"
              />
            </svg> -->
            <svg
              class="inline-block h-6 w-6 svg-white"
              enable-background="new 0 0 24 24"
              height="512"
              viewBox="0 0 24 24"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m9.5 24c-.064 0-.129-.012-.191-.038-.187-.077-.309-.26-.309-.462v-2.5h-1.5c-1.378 0-2.5-1.122-2.5-2.5v-4c0-.276.224-.5.5-.5s.5.224.5.5v4c0 .827.673 1.5 1.5 1.5h2c.276 0 .5.224.5.5v1.793l2.146-2.146c.094-.094.221-.147.354-.147h9c.827 0 1.5-.673 1.5-1.5v-8c0-.827-.673-1.5-1.5-1.5h-1c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h1c1.378 0 2.5 1.122 2.5 2.5v8c0 1.378-1.122 2.5-2.5 2.5h-8.793l-2.854 2.854c-.095.095-.223.146-.353.146z"
              />
              <path
                d="m17.079 13h-15.158c-1.059 0-1.921-.897-1.921-2v-9c0-1.103.862-2 1.921-2h15.158c1.059 0 1.921.897 1.921 2v9c0 1.103-.862 2-1.921 2zm-15.158-12c-.508 0-.921.449-.921 1v9c0 .551.413 1 .921 1h15.158c.508 0 .921-.449.921-1v-9c0-.551-.413-1-.921-1z"
              />
              <path
                d="m9.5 7.995c-.33 0-.659-.08-.959-.24l-8.276-4.414c-.244-.13-.336-.433-.206-.677.13-.243.433-.335.677-.206l8.276 4.414c.306.163.672.163.978 0l8.276-4.414c.244-.128.546-.037.677.206.13.244.038.546-.206.677l-8.276 4.414c-.302.16-.631.24-.961.24z"
              />
            </svg>
          </div>
          <div class="w-4/6 pl-2 text-baits-green">
            <span>Messages</span>
          </div>
          <div class="w-1/6"></div>
        </div>

        <div>
          <div
            @click="toggleSidebarMenuItem(!blogMenu, 'blogs')"
            v-if="user.hasOwnProperty('roles') && user.roles.includes('admin')"
            class="flex flex-wrap py-3 px-4 items-center justify-start cursor-pointer text-sm"
          >
            <div class="w-1/6">
              <img src="~/static/images/promotion.svg" class="inline-block w-6 h-6" />
            </div>
            <div class="w-4/6 pl-2 text-baits-green">
              <span>Blogs</span>
            </div>
            <div class="w-1/6">
              <span>
                <font-awesome-icon class="w-4 h-4" :icon="['fas', 'chevron-down']" />
              </span>
            </div>
          </div>
          <slide-up-down :active="blogMenu" :duration="500">
            <div>
              <div
                @click="goToPath('/dashboard/blogs/listing')"
                :class="[$route.path.startsWith('/dashboard/blogs/listing') ? 'link-active custom-br-green' : '']"
                class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer text-sm"
              >
                <div class="w-1/6">
                  <img src="~/static/images/list.svg" class="inline-block w-5 h-5" />
                </div>
                <div class="w-4/6 pl-2">
                  <span>My Blogs</span>
                </div>
                <div class="w-1/6"></div>
              </div>
            </div>
          </slide-up-down>
        </div>
        <div
          @click="
            goToPath('/dashboard/baits');
            toggleSidebarMenuItem(false, '');
          "
          v-if="user.hasOwnProperty('roles') && user.roles.includes('consumer')"
          :class="[$route.path.startsWith('/dashboard/baits') ? 'link-active custom-br-green' : '']"
          class="flex flex-wrap py-3 px-4 items-center justify-start cursor-pointer text-sm"
        >
          <div class="w-1/6">
            <img src="~/static/images/bait-white.svg" class="inline-block w-6 h-6" />
          </div>
          <div class="w-4/6 pl-2">
            <span>Customer Dashboard</span>
          </div>
          <div class="w-1/6"></div>
        </div>
        <div
          @click="
            goToPath('/dashboard/bites');
            toggleSidebarMenuItem(false, '');
          "
          v-if="user.hasOwnProperty('roles') && user.roles.includes('provider')"
          :class="[$route.path.startsWith('/dashboard/bites') ? 'link-active custom-br-green' : '']"
          class="flex flex-wrap py-3 px-4 items-center justify-start cursor-pointer text-sm"
        >
          <div class="w-1/6">
            <img src="~/static/images/bite-white-icon.svg" class="inline-block w-6 h-6" />
          </div>
          <div class="w-4/6 pl-2">
            <span>Professional Dashboard</span>
          </div>
          <div class="w-1/6"></div>
        </div>

        <div
          @click="
            goToPath('/dashboard/providers');
            toggleSidebarMenuItem(false, '');
          "
          v-if="user.hasOwnProperty('roles') && user.roles.includes('provider')"
          :class="[$route.path.startsWith('/dashboard/providers') ? 'link-active custom-br-green' : '']"
          class="flex flex-wrap py-3 px-4 items-center justify-start cursor-pointer text-sm"
        >
          <div class="w-1/6">
            <!-- <img src="~/static/images/bite-white-icon.svg" class="inline-block w-6 h-6" /> -->
            <svg class="inline-block h-6 w-6 svg-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512">
              <g id="Outline">
                <polygon points="10 13.586 8.707 12.293 7.293 13.707 10 16.414 14.707 11.707 13.293 10.293 10 13.586" />
                <rect x="18" y="10" width="15" height="2" />
                <rect x="18" y="14" width="15" height="2" />
                <rect x="18" y="34" width="18" height="2" />
                <rect x="18" y="38" width="18" height="2" />
                <polygon
                  points="13.293 33.293 11 35.586 8.707 33.293 7.293 34.707 9.586 37 7.293 39.293 8.707 40.707 11 38.414 13.293 40.707 14.707 39.293 12.414 37 14.707 34.707 13.293 33.293"
                />
                <rect x="18" y="46" width="17" height="2" />
                <rect x="18" y="50" width="17" height="2" />
                <polygon
                  points="13.293 45.293 11 47.586 8.707 45.293 7.293 46.707 9.586 49 7.293 51.293 8.707 52.707 11 50.414 13.293 52.707 14.707 51.293 12.414 49 14.707 46.707 13.293 45.293"
                />
                <polygon points="10 25.586 8.707 24.293 7.293 25.707 10 28.414 14.707 23.707 13.293 22.293 10 25.586" />
                <rect x="18" y="22" width="22" height="2" />
                <rect x="18" y="26" width="22" height="2" />
                <path
                  d="M53,36H48v-1.3A7,7,0,1,0,50,21H48V12.586L37.414,2H2V60H38v2H62V45A9.01,9.01,0,0,0,53,36Zm-3,4.764L48.618,38h2.764Zm1.935,12.887L50,55.586l-1.935-1.935L50,41.077ZM50,33a5.006,5.006,0,0,1-5-5V27h3a9.048,9.048,0,0,1,6.617,2.911A5.006,5.006,0,0,1,50,33Zm4.948-5.516A11.051,11.051,0,0,0,48,25H45V23h5A4.989,4.989,0,0,1,54.948,27.484ZM38,5.414,44.586,12H38ZM4,58V4H36V14H46v7H43v7a6.992,6.992,0,0,0,3,5.736v2.323A9.01,9.01,0,0,0,38,45V58Zm56,2H40V45a7.006,7.006,0,0,1,6.4-6.969l1.566,3.132L45.935,54.349,50,58.414l4.065-4.065L52.037,41.163,53.6,38.031A7.006,7.006,0,0,1,60,45Z"
                />
              </g>
            </svg>
          </div>
          <div class="w-4/6 pl-2">
            <span>Professional Listing</span>
          </div>
          <div class="w-1/6"></div>
        </div>

        <div>
          <div
            @click="toggleSidebarMenuItem(!promotionMenu, 'promotion')"
            v-if="user.hasOwnProperty('roles') && user.roles.includes('admin')"
            class="flex flex-wrap py-3 px-4 items-center justify-start cursor-pointer text-sm"
          >
            <div class="w-1/6">
              <img src="~/static/images/promotion.svg" class="inline-block w-6 h-6" />
            </div>
            <div class="w-4/6 pl-2 text-baits-green">
              <span>Promotions</span>
            </div>
            <div class="w-1/6">
              <span>
                <font-awesome-icon class="w-4 h-4" :icon="['fas', 'chevron-down']" />
              </span>
            </div>
          </div>
          <slide-up-down :active="promotionMenu" :duration="500">
            <div>
              <div
                @click="goToPath('/dashboard/promotions/listing')"
                :class="[$route.path.startsWith('/dashboard/promotions/listing') ? 'link-active custom-br-green' : '']"
                class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer text-sm"
              >
                <div class="w-1/6">
                  <img src="~/static/images/list.svg" class="inline-block w-5 h-5" />
                </div>
                <div class="w-4/6 pl-2">
                  <span>Listing</span>
                </div>
                <div class="w-1/6"></div>
              </div>
              <div
                v-if="user.hasOwnProperty('roles') && user.roles.includes('provider')"
                @click="goToPath('/dashboard/promotions/my')"
                :class="[$route.path.startsWith('/dashboard/promotions/my') ? 'link-active custom-br-green' : '']"
                class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer text-sm"
              >
                <div class="w-1/6">
                  <img src="~/static/images/my-promotion.svg" class="inline-block w-6 h-6" />
                </div>
                <div class="w-4/6 pl-2">
                  <span>My Promotions</span>
                </div>
                <div class="w-1/6"></div>
              </div>
            </div>
          </slide-up-down>
        </div>

        <div
          v-show="false"
          @click="
            goToPath('/messages');
            toggleSidebarMenuItem(false, '');
          "
          :class="[$route.path === '/messages' ? 'link-active custom-br-green' : '']"
          class="flex flex-wrap py-3 px-4 items-center justify-start cursor-pointer text-sm"
        >
          <div class="w-1/6">
            <img src="~/static/images/messages-white.svg" class="inline-block w-6 h-6" />
          </div>
          <div class="w-4/6 pl-2">
            <span>Messages</span>
          </div>
          <div class="w-1/6"></div>
        </div>
        <div
          @click="
            goToPath('/dashboard/settings');
            toggleSidebarMenuItem(false, '');
          "
          :class="[$route.path.startsWith('/dashboard/settings') ? 'link-active custom-br-green' : '']"
          class="flex flex-wrap py-3 px-4 items-center justify-start cursor-pointer text-sm"
        >
          <div class="w-1/6">
            <svg
              class="inline-block h-6 w-6 svg-white"
              enable-background="new 0 0 512 512"
              height="512"
              viewBox="0 0 512 512"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m272.066 512h-32.133c-25.989 0-47.134-21.144-47.134-47.133v-10.871c-11.049-3.53-21.784-7.986-32.097-13.323l-7.704 7.704c-18.659 18.682-48.548 18.134-66.665-.007l-22.711-22.71c-18.149-18.129-18.671-48.008.006-66.665l7.698-7.698c-5.337-10.313-9.792-21.046-13.323-32.097h-10.87c-25.988 0-47.133-21.144-47.133-47.133v-32.134c0-25.989 21.145-47.133 47.134-47.133h10.87c3.531-11.05 7.986-21.784 13.323-32.097l-7.704-7.703c-18.666-18.646-18.151-48.528.006-66.665l22.713-22.712c18.159-18.184 48.041-18.638 66.664.006l7.697 7.697c10.313-5.336 21.048-9.792 32.097-13.323v-10.87c0-25.989 21.144-47.133 47.134-47.133h32.133c25.989 0 47.133 21.144 47.133 47.133v10.871c11.049 3.53 21.784 7.986 32.097 13.323l7.704-7.704c18.659-18.682 48.548-18.134 66.665.007l22.711 22.71c18.149 18.129 18.671 48.008-.006 66.665l-7.698 7.698c5.337 10.313 9.792 21.046 13.323 32.097h10.87c25.989 0 47.134 21.144 47.134 47.133v32.134c0 25.989-21.145 47.133-47.134 47.133h-10.87c-3.531 11.05-7.986 21.784-13.323 32.097l7.704 7.704c18.666 18.646 18.151 48.528-.006 66.665l-22.713 22.712c-18.159 18.184-48.041 18.638-66.664-.006l-7.697-7.697c-10.313 5.336-21.048 9.792-32.097 13.323v10.871c0 25.987-21.144 47.131-47.134 47.131zm-106.349-102.83c14.327 8.473 29.747 14.874 45.831 19.025 6.624 1.709 11.252 7.683 11.252 14.524v22.148c0 9.447 7.687 17.133 17.134 17.133h32.133c9.447 0 17.134-7.686 17.134-17.133v-22.148c0-6.841 4.628-12.815 11.252-14.524 16.084-4.151 31.504-10.552 45.831-19.025 5.895-3.486 13.4-2.538 18.243 2.305l15.688 15.689c6.764 6.772 17.626 6.615 24.224.007l22.727-22.726c6.582-6.574 6.802-17.438.006-24.225l-15.695-15.695c-4.842-4.842-5.79-12.348-2.305-18.242 8.473-14.326 14.873-29.746 19.024-45.831 1.71-6.624 7.684-11.251 14.524-11.251h22.147c9.447 0 17.134-7.686 17.134-17.133v-32.134c0-9.447-7.687-17.133-17.134-17.133h-22.147c-6.841 0-12.814-4.628-14.524-11.251-4.151-16.085-10.552-31.505-19.024-45.831-3.485-5.894-2.537-13.4 2.305-18.242l15.689-15.689c6.782-6.774 6.605-17.634.006-24.225l-22.725-22.725c-6.587-6.596-17.451-6.789-24.225-.006l-15.694 15.695c-4.842 4.843-12.35 5.791-18.243 2.305-14.327-8.473-29.747-14.874-45.831-19.025-6.624-1.709-11.252-7.683-11.252-14.524v-22.15c0-9.447-7.687-17.133-17.134-17.133h-32.133c-9.447 0-17.134 7.686-17.134 17.133v22.148c0 6.841-4.628 12.815-11.252 14.524-16.084 4.151-31.504 10.552-45.831 19.025-5.896 3.485-13.401 2.537-18.243-2.305l-15.688-15.689c-6.764-6.772-17.627-6.615-24.224-.007l-22.727 22.726c-6.582 6.574-6.802 17.437-.006 24.225l15.695 15.695c4.842 4.842 5.79 12.348 2.305 18.242-8.473 14.326-14.873 29.746-19.024 45.831-1.71 6.624-7.684 11.251-14.524 11.251h-22.148c-9.447.001-17.134 7.687-17.134 17.134v32.134c0 9.447 7.687 17.133 17.134 17.133h22.147c6.841 0 12.814 4.628 14.524 11.251 4.151 16.085 10.552 31.505 19.024 45.831 3.485 5.894 2.537 13.4-2.305 18.242l-15.689 15.689c-6.782 6.774-6.605 17.634-.006 24.225l22.725 22.725c6.587 6.596 17.451 6.789 24.225.006l15.694-15.695c3.568-3.567 10.991-6.594 18.244-2.304z"
              />
              <path
                d="m256 367.4c-61.427 0-111.4-49.974-111.4-111.4s49.973-111.4 111.4-111.4 111.4 49.974 111.4 111.4-49.973 111.4-111.4 111.4zm0-192.8c-44.885 0-81.4 36.516-81.4 81.4s36.516 81.4 81.4 81.4 81.4-36.516 81.4-81.4-36.515-81.4-81.4-81.4z"
              />
            </svg>
          </div>
          <div class="w-4/6 pl-2">
            <span>Settings</span>
          </div>
          <div class="w-1/6"></div>
        </div>
        <div
          @click="
            goToPath('/dashboard/logout');
            toggleSidebarMenuItem(false, '');
          "
          :class="[$route.path.split('/').includes('logout') ? 'link-active custom-br-green' : '']"
          class="flex flex-wrap py-3 px-4 items-center justify-start cursor-pointer text-sm"
        >
          <div class="w-1/6">
            <!-- <img src="~/static/images/sign-out-alt-white.svg" class="inline-block w-6 h-6" /> -->
            <svg class="inline-block h-6 w-6 svg-white" height="512pt" viewBox="0 0 511 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m361.5 392v40c0 44.113281-35.886719 80-80 80h-201c-44.113281 0-80-35.886719-80-80v-352c0-44.113281 35.886719-80 80-80h201c44.113281 0 80 35.886719 80 80v40c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-40c0-22.054688-17.945312-40-40-40h-201c-22.054688 0-40 17.945312-40 40v352c0 22.054688 17.945312 40 40 40h201c22.054688 0 40-17.945312 40-40v-40c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm136.355469-170.355469-44.785157-44.785156c-7.8125-7.8125-20.476562-7.8125-28.285156 0-7.8125 7.808594-7.8125 20.472656 0 28.28125l31.855469 31.859375h-240.140625c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h240.140625l-31.855469 31.859375c-7.8125 7.808594-7.8125 20.472656 0 28.28125 3.90625 3.90625 9.023438 5.859375 14.140625 5.859375 5.121094 0 10.238281-1.953125 14.144531-5.859375l44.785157-44.785156c19.496093-19.496094 19.496093-51.214844 0-70.710938zm0 0"
              />
            </svg>
          </div>
          <div class="w-4/6 pl-2">
            <span>Logout</span>
          </div>
          <div class="w-1/6"></div>
        </div>
      </div>
    </div>

    <!-- temporary disable for now -->
    <!-- <div class="absolute inset-x-0 bottom-0 h-10 pb-2">
      <div class="flex flex-wrap justify-around">
        <div
          class="cursor-pointer"
          title="Profile"
          @click="
            goToPath('/profile');
            toggleSidebarMenuItem(false, '');
          "
        >
          <font-awesome-icon class="w-6 h-6" :icon="['fas', 'user']" />
        </div>
        <div
          class="cursor-pointer"
          title="Settings"
          @click="
            goToPath('/settings');
            toggleSidebarMenuItem(false, '');
          "
        >
          <font-awesome-icon class="w-6 h-6" :icon="['fas', 'cog']" />
        </div>
        <div
          class="cursor-pointer"
          title="Logout"
          @click="
            goToPath('/logout');
            toggleSidebarMenuItem(false, '');
          "
        >
          <img src="~/static/images/sign-out-alt-white.svg" class="inline-block w-6 h-6" />
        </div>
      </div>
    </div>-->
  </div>
</template>
<script>
import ChewingIconSmall from '@/components/icons/ChewingIconSmall';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  components: {
    ChewingIconSmall,
  },
  data() {
    return {
      avatar: null,
      adminMenu: false,
      promotionMenu: false,
      blogMenu: false,
    };
  },
  computed: {
    ...mapGetters({
      isPanelOpen: 'common/isPanelOpen',
      user: 'user/getUser',
    }),
    isOnCopany() {
      return 'company'.indexOf(this.$route.fullPath) !== -1;
    },
    isOnUser() {
      return 'user'.indexOf(this.$route.fullPath) !== -1;
    },
  },
  mounted() {
    this.adminMenu = this.$route.path.startsWith('/dashboard/admin');
    this.promotionMenu = this.$route.path.startsWith('/dashboard/promotions');
    this.blogMenu = this.$route.path.startsWith('/dashboard/blogs');
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
      setPanel: 'common/setPanel',
    }),
    ...mapActions({
      fetchUser: 'user/fetchUser',
      userLogout: 'user/userLogout',
    }),
    toggleSidebarMenuItem(val, type) {
      if (type === 'admin') this.adminMenu = val;
      if (type === 'promotion') this.promotionMenu = val;
      if (type === 'blogs') this.blogMenu = val;
      if (type === '') this.adminMenu = this.promotionMenu = val;
    },

    openAvatarDialog() {
      document.getElementById('file_upload').click();
    },
    openUserProfile() {
      this.$router.push('/dashboard');
    },
    logout() {
      this.$router.push('/dashboard/logout');
      this.setPanel(false);
    },
    goToPath(path) {
      this.$router.push(path);
      this.setPanel(false);
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
    fileseleted(avatarImage) {
      this.setLoader(true);
      var newFile = this.dataURLtoFile(avatarImage.dataUrl, avatarImage.info.name);

      // If file size is greater than 1MB
      if (newFile.size > 1000000) {
        alert('File is too big!');
        this.setLoader(false);
        return;
      }

      //this.avatar = avatarImage;
      this.avatar = newFile;
      const formData = new FormData();
      formData.append('file', this.avatar);

      var api = '/user/avatar';
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
            this.fetchUser(this.$cookies.get('baitsToken'))
              .then((userData) => {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Avatar updated successfully...!',
                  type: 'success',
                  duration: 5000,
                  dismissible: true,
                });
              })
              .catch((error) => {
                console.log(error);
                this.$toast.open({
                  message: 'Failed to fetch user.',
                  type: 'error',
                  duration: 5000,
                  dismissible: true,
                });
                this.setLoader(false);
              });

            this.setLoader(false);
          } else {
            this.setLoader(false);
            this.$toast.open({
              message: 'Failed to update avatar.',
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
            message: 'Failed to update avatar.',
            type: 'error',
            duration: 5000,
            dismissible: true,
          });
        });
    },
  },
};
</script>
<style scoped>
a svg {
  font-size: 30px;
  color: #fff;
}

.nuxt-link-active,
.nuxt-link-exact-active {
  font-weight: bold;
  color: #0070c0;
}

.nuxt-link-active svg,
.nuxt-link-exact-active svg {
  color: #0070c0;
}

/* Sidebar background gradient */
.bg-sidebar {
  background: white;
}

.link-active {
  text-shadow: rgba(0, 0, 0, 0.25) 0 -1px 0;
  box-shadow: rgba(0, 0, 0, 0.25) 0 1px 0, inset rgba(255, 255, 255, 0.16) 0 1px 0;
}

.custom-br-green {
  border-right: 5px solid #06ebc3;
}
.sidebar-w {
  min-width: 18.75rem;
  max-width: 18.75rem;
}
</style>
