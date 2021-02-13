<template>
  <div class="flex flex-wrap -mx-2">
    <div class="xl:w-8/12 px-2 w-full">
      <div class="rounded-md boxShadow mb-8 bg-white">
        <div class="flex flex-wrap items-center justify-between pt-6 px-5">
          <div class="text-sm">Application Sales</div>
          <div class="">
            <div class="flex flex-wrap items-center-right">
              <div>
                <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-5 h-5" :icon="['fas', 'compress-arrows-alt']" />
              </div>
              <div>
                <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-5 h-5" :icon="['fas', 'window-minimize']" />
              </div>
              <div>
                <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-5 h-5" :icon="['fas', 'trash-alt']" />
              </div>
            </div>
          </div>
        </div>
        <div class="pt-6 px-5">
          <table class="table-auto">
            <tbody>
              <tr>
                <td class="xl:px-10 px-4 py-4 font-bold text-sm">
                  <div class="chk-option inline-block mr-2">
                    <div class="checkbox-fade fade-in-primary">
                      <label class="check-task">
                        <input type="checkbox" value="" />
                        <span class="cr">
                          <i class="cr-icon feather icon-check txt-default"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                  Application
                </td>
                <td class="xl:px-10 px-4 py-4 font-bold text-sm">Sales</td>
                <td class="xl:px-10 px-4 py-4 font-bold text-sm">Change</td>

                <td class="xl:px-10 px-4 py-4 font-bold text-sm">Avg Price</td>
                <td class="xl:px-10 px-4 py-4 font-bold text-sm">Total</td>
              </tr>
              <tr>
                <td class="xl:px-10 px-4 py-4 text-sm">
                  <div class="chk-option inline-block mr-2">
                    <div class="checkbox-fade fade-in-primary">
                      <label class="check-task">
                        <input type="checkbox" value="" />
                        <span class="cr">
                          <i class="cr-icon feather icon-check txt-default"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="inline-block align-middle">
                    <h6 class="text-sm">Able Pro</h6>
                    <p class="text-xs mb-0 text-simple-c-dark">Powerful Admin Theme</p>
                  </div>
                </td>
                <td class="xl:px-10 px-4 py-4 text-sm">16,300</td>
                <td class="px-10 py-4">
                  <sale-change-chart
                    :styles="{
                      height: '46px',
                      width: '100px',
                      position: 'relative',
                    }"
                  ></sale-change-chart>
                </td>

                <td class="xl:px-10 px-4 py-4 text-sm">$53</td>
                <td class="px-10 py-4 text-baits-blue">$15,652</td>
              </tr>
              <tr>
                <td class="xl:px-10 px-4 py-4 text-sm">
                  <div class="chk-option inline-block mr-2">
                    <div class="checkbox-fade fade-in-primary">
                      <label class="check-task">
                        <input type="checkbox" value="" />
                        <span class="cr">
                          <i class="cr-icon feather icon-check txt-default"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="inline-block align-middle">
                    <h6 class="text-sm">Photoshop</h6>
                    <p class="text-simple-c-dark text-xs mb-0 text-simple-c-dark">Design Software</p>
                  </div>
                </td>
                <td class="xl:px-10 px-4 py-4 text-sm">26,421</td>
                <td class="px-10 py-4">
                  <sale-change-chart
                    :styles="{
                      height: '46px',
                      width: '100px',
                      position: 'relative',
                    }"
                  ></sale-change-chart>
                </td>
                <td class="xl:px-10 px-4 py-4 text-sm">$35</td>
                <td class="px-10 py-4 text-baits-blue">$18,785</td>
              </tr>
              <tr>
                <td class="xl:px-10 px-4 py-4 text-sm">
                  <div class="chk-option inline-block mr-2">
                    <div class="checkbox-fade fade-in-primary">
                      <label class="check-task">
                        <input type="checkbox" value="" />
                        <span class="cr">
                          <i class="cr-icon feather icon-check txt-default"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="inline-block align-middle">
                    <h6 class="text-sm">Guruable</h6>
                    <p class="text-simple-c-dark text-xs mb-0">Best Admin Template</p>
                  </div>
                </td>
                <td class="xl:px-10 px-4 py-4 text-sm">8,265</td>
                <td class="px-10 py-4">
                  <sale-change-chart
                    :styles="{
                      height: '46px',
                      width: '100px',
                      position: 'relative',
                    }"
                  ></sale-change-chart>
                </td>
                <td class="xl:px-10 px-4 py-4 text-sm">$98</td>
                <td class="px-10 py-4 text-baits-blue">$9,652</td>
              </tr>
              <tr>
                <td class="xl:px-10 px-4 py-4 text-sm">
                  <div class="chk-option inline-block mr-2">
                    <div class="checkbox-fade fade-in-primary">
                      <label class="check-task">
                        <input type="checkbox" value="" />
                        <span class="cr">
                          <i class="cr-icon feather icon-check txt-default"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="inline-block align-middle">
                    <h6 class="text-sm">Flatable</h6>
                    <p class="text-simple-c-dark text-xs mb-0">Admin App</p>
                  </div>
                </td>
                <td class="xl:px-10 px-4 py-4 text-sm">10,652</td>
                <td class="px-10 py-4">
                  <sale-change-chart
                    :styles="{
                      height: '46px',
                      width: '100px',
                      position: 'relative',
                    }"
                  ></sale-change-chart>
                </td>
                <td class="xl:px-10 px-4 py-4 text-sm">$20</td>
                <td class="px-10 py-4 text-baits-blue">$7,856</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center py-6">
          <a href="#!" class="text-baits-green text-sm underline">View all Projects</a>
        </div>
      </div>
    </div>
    <div class="xl:w-4/12 px-2 w-full">
      <div class="rounded-md boxShadow mb-8 bg-white user-activity-card">
        <div class="pt-6 px-5">
          <h5 class="text-sm">User Activity</h5>
        </div>
        <div class="p-5">
          <div class="flex flex-wrap mb-6">
            <div class="inline-block pr-0">
              <div class="relative">
                <img src="https://colorlib.com/polygon/adminty/files/assets/images/breadcrumb-bg.jpg" alt="user image" class="w-10 h-10 rounded-md" />
                <img
                  src="https://colorlib.com/polygon/adminty/files/assets/images/avatar-2.jpg"
                  alt="user image"
                  class="rounded-md w-5 h-5 absolute"
                  style="bottom: -5px; right: -5px"
                />
              </div>
            </div>
            <div class="inline-block px-4">
              <h6 class="mb-1 text-sm">John Deo</h6>
              <p class="text-simple-c-dark text-xs mb-0">Lorem Ipsum is simply dummy text.</p>
              <div class="flex flex-wrap items-center text-xs mb-0 text-simple-c-dark">
                <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-6 h-6" :icon="['fas', 'clock']" />
                <span>2 min ago</span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mb-6">
            <div class="inline-block pr-0">
              <div class="relative">
                <img src="https://colorlib.com/polygon/adminty/files/assets/images/breadcrumb-bg.jpg" alt="user image" class="w-10 h-10 rounded-md" />
                <img
                  src="https://colorlib.com/polygon/adminty/files/assets/images/avatar-2.jpg"
                  alt="user image"
                  class="rounded-md w-5 h-5 absolute"
                  style="bottom: -5px; right: -5px"
                />
              </div>
            </div>
            <div class="inline-block px-4">
              <h6 class="mb-1 text-sm">John Deo</h6>
              <p class="text-simple-c-dark text-xs mb-0">Lorem Ipsum is simply dummy text.</p>
              <div class="text-simple-c-dark flex flex-wrap items-center text-xs mb-0">
                <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-6 h-6" :icon="['fas', 'clock']" />
                <span>2 min ago</span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mb-6">
            <div class="inline-block pr-0">
              <div class="relative">
                <img src="https://colorlib.com/polygon/adminty/files/assets/images/breadcrumb-bg.jpg" alt="user image" class="w-10 h-10 rounded-md" />
                <img
                  src="https://colorlib.com/polygon/adminty/files/assets/images/avatar-2.jpg"
                  alt="user image"
                  class="rounded-md w-5 h-5 absolute"
                  style="bottom: -5px; right: -5px"
                />
              </div>
            </div>
            <div class="inline-block px-4">
              <h6 class="mb-1 text-sm">John Deo</h6>
              <p class="text-simple-c-dark text-xs mb-0">Lorem Ipsum is simply dummy text.</p>
              <div class="text-simple-c-dark flex flex-wrap items-center text-xs mb-0">
                <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-6 h-6" :icon="['fas', 'clock']" />
                <span>2 min ago</span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mb-6">
            <div class="inline-block pr-0">
              <div class="relative">
                <img src="https://colorlib.com/polygon/adminty/files/assets/images/breadcrumb-bg.jpg" alt="user image" class="w-10 h-10 rounded-md" />
                <img
                  src="https://colorlib.com/polygon/adminty/files/assets/images/avatar-2.jpg"
                  alt="user image"
                  class="rounded-md w-5 h-5 absolute"
                  style="bottom: -5px; right: -5px"
                />
              </div>
            </div>
            <div class="inline-block px-4">
              <h6 class="mb-1 text-sm">John Deo</h6>
              <p class="text-simple-c-dark text-xs mb-0">Lorem Ipsum is simply dummy text.</p>
              <div class="text-simple-c-dark flex flex-wrap items-center text-xs mb-0">
                <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-6 h-6" :icon="['fas', 'clock']" />
                <span>2 min ago</span>
              </div>
            </div>
          </div>

          <div class="text-center py-4">
            <a href="#!" class="text-baits-green text-sm underline">View all Projects</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SaleChangeChart from '@/components/charts/SaleChangeChart';

export default {
  components: {
    SaleChangeChart,
  },
};
</script>
