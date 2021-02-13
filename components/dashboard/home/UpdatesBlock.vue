<template>
  <div class="flex flex-wrap -mx-2">
    <div class="xl:w-6/12 w-full px-2">
      <div class="rounded-md boxShadow mb-8 bg-white">
        <div class="pt-6 px-5">
          <h5 class="text-sm inline-block">Latest Updates</h5>
          <div class="inline-block float-right">
            <ul class="pl-0 list-none inline-block card-option">
              <li class="inline-block">
                <i style="font-size: 0.8em; cursor: pointer" class="fa fa-wrench text-simple-c-dark"></i>
              </li>
              <li class="inline-block">
                <i style="font-size: 0.8em; cursor: pointer" class="fa fa-window-max text-simple-c-darkimize"></i>
              </li>
              <li class="inline-block">
                <i style="font-size: 0.8em; cursor: pointer" class="fa fa-minus text-simple-c-dark"></i>
              </li>
              <li class="inline-block">
                <i style="font-size: 0.8em; cursor: pointer" class="fa fa-refresh text-simple-c-dark"></i>
              </li>
              <li class="inline-block">
                <i style="font-size: 0.8em; cursor: pointer" class="fa fa-trash text-simple-c-dark"></i>
              </li>
            </ul>
          </div>
          <div class="flex flex-wrap items-center pb-4 px-6 mt-4">
            <div>
              <p class="text-simple-c-dark text-xs mb-0 inline-block">4 hrs ago</p>
              <span>
                <i class="feather fa fa-briefcase bg-simple-c-pink update-icon"></i>
              </span>
            </div>
            <div class="inline-block ml-4">
              <h6 class="text-sm">+ 5 New Products were added!</h6>
              <p class="text-simple-c-dark text-xs mb-0">Congratulations!</p>
            </div>
          </div>
          <div class="flex flex-wrap items-center pb-4 px-6 mt-4">
            <div>
              <p class="text-simple-c-dark text-xs mb-0 inline-block">1 day ago</p>
              <span>
                <i class="feather fa fa-briefcase bg-simple-c-yellow update-icon"></i>
              </span>
            </div>
            <div class="inline-block ml-4">
              <h6 class="text-sm">Database backup completed!</h6>
              <p class="text-simple-c-dark text-xs mb-0">Download the latest backup.</p>
            </div>
          </div>
          <div class="flex flex-wrap items-center pb-4 px-6 mt-4">
            <div>
              <p class="text-simple-c-dark text-xs mb-0 inline-block">2 day ago</p>
              <span>
                <i class="feather fa fa-briefcase bg-simple-c-green update-icon"></i>
              </span>
            </div>
            <div class="inline-block ml-4">
              <h6 class="text-sm">+1 Friend Requests</h6>
              <p class="text-simple-c-dark text-xs mb-0">This is great, keep it up!</p>
            </div>
          </div>
          <div class="flex flex-wrap items-center pb-4 px-6 mt-4">
            <div class="w-1/3"></div>
            <div class="w-2/3">
              <img
                src="https://colorlib.com/polygon/adminty/files/assets/images/avatar-2.jpg"
                alt="user image"
                class="rounded-md w-10 align-top mr-4 inline-block"
              />
              <div class="inline-block">
                <h6>Jeny William</h6>
                <p class="text-simple-c-dark text-xs mb-0">Graphic Designer</p>
              </div>
            </div>
          </div>

          <div class="px-5">
            <div class="text-center py-4">
              <a href="#!" class="text-baits-green text-sm underline">View all Projects</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="xl:w-6/12 w-full px-2">
      <div class="rounded-md boxShadow mb-8 bg-white">
        <div class="flex flex-wrap">
          <div class="w-4/12 bg-c-lite-green rounded-tl-md rounded-bl-md pt-12" style="padding-bottom: 7rem">
            <div class="card-block text-center text-white p-5">
              <div class="mb-6">
                <img src="https://colorlib.com/polygon/adminty/files/assets/images/avatar-4.jpg" class="rounded-md inline-block" alt="User-Profile-Image" />
              </div>
              <h6 class="text-sm font-bold">Jeny William</h6>
              <p class="text-xs">Web Designer</p>
              <i class="feather icon-edit m-t-10 f-16"></i>
              <font-awesome-icon class="cursor-pointer mt-3 text-white w-4 h-4" :icon="['fas', 'edit']" />
            </div>
          </div>
          <div class="w-8/12">
            <div class="p-5">
              <h6 class="pb-1 text-sm">Information</h6>
              <div class="mb-5 border border-gray-200"></div>
              <div class="flex flex-wrap">
                <div class="w-1/2">
                  <p class="mb-3 text-sm">Email</p>
                  <h6 class="text-simple-c-dark text-sm">jeny@gmail.com</h6>
                </div>
                <div class="w-1/2">
                  <p class="mb-3 text-sm">Phone</p>
                  <h6 class="text-simple-c-dark text-sm">0023-333-526136</h6>
                </div>
              </div>
              <h6 class="mt-10 pb-1 text-sm">Projects</h6>
              <div class="mb-5 border border-gray-200"></div>

              <div class="flex flex-wrap">
                <div class="w-1/2">
                  <p class="mb-3 text-sm">Recent</p>
                  <h6 class="text-simple-c-dark text-sm">Guruable Admin</h6>
                </div>
                <div class="w-1/2">
                  <p class="mb-3 text-sm">Most Viewed</p>
                  <h6 class="text-simple-c-dark text-sm">Able Pro Admin</h6>
                </div>
              </div>
              <ul class="social-link list-none mt-20">
                <li class="inline-block">
                  <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook">
                    <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-7 h-7" :icon="['fab', 'facebook']" />
                  </a>
                </li>
                <li class="inline-block">
                  <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter">
                    <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-7 h-7" :icon="['fab', 'twitter']" />
                  </a>
                </li>
                <li class="inline-block">
                  <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram">
                    <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-7 h-7" :icon="['fab', 'instagram']" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
