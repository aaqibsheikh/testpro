<template>
  <div>
    <div class="contactus-bg">
      <template v-if="calcWidth <= 1023 && isDomReady">
        <MobileNavbar />
      </template>
      <template v-if="calcWidth > 1023 && isDomReady">
        <Navbar bgClass="bg-transparent" />
      </template>
      <div class="header-margin lg:hidden block"></div>
      <h2 class="text-white text-center text-4xl font-bold py-24">Contact Us</h2>
    </div>
    <div class="container mx-auto">
      <div class="flex flex-wrap md:px-0 px-5">
        <div class="md:w-2/12 hidden md:block"></div>
        <div class="md:w-4/12 w-full lg:mt-6 mt-10 lg:mb-4">
          <h2 class="text-baits-blue text-center font-bold text-2xl lg:mb-4 mb-10">Get in touch</h2>
          <div class="flex items-center mt-4">
            <img src="~/static/images/Email-icon.png" class="w-12 inline-block" />
            <div class="inline-block text-baits-gray-dark text-xl ml-3">christine@baitsbite.com</div>
          </div>
          <div class="flex items-center mt-4">
            <img src="~/static/images/location-icon.png" class="w-12 inline-block" />
            <div class="inline-block text-baits-gray-dark text-xl ml-3">
              9 Temasek Boulevard, #07-01
              <br />Suntec Tower 2 <br />Singapore 038989
              <br />
            </div>
          </div>
          <div class="mt-6">
            <iframe
              class="g-map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7977.596130887199!2d103.8611073!3d1.2957603!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19af0282b065%3A0x1300f7ac70eeb342!2sSingapore%20038989!5e0!3m2!1sen!2ssg!4v1594136030412!5m2!1sen!2ssg"
              frameborder="0"
              style="border: 0"
              allowfullscreen
              aria-hidden="false"
              tabindex="0"
            ></iframe>
          </div>
        </div>
        <div class="md:w-1/12 hidden md:block"></div>
        <div class="md:w-4/12 w-full lg:mt-6 mt-10 lg:mb-4">
          <h2 class="text-center font-bold text-2xl lg:mb-4 mb-10">Send us a message</h2>
          <div class="flex flex-wrap -mx-3 md:mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Full Name</label>
              <input
                v-model="contact.name"
                v-validate="'required'"
                name="name"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-4"
                type="text"
              />
              <div class="validate-error-msg text-red-500 text-sm">
                <span class="caption" v-if="errors.has('name')">{{ errors.first('name') }}</span>
              </div>
            </div>
            <div class="w-full px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</label>
              <input
                v-model="contact.email"
                v-validate="'required|email'"
                name="email"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
              />
              <div class="validate-error-msg text-red-500 text-sm">
                <span class="caption" v-if="errors.has('email')">{{ errors.first('email') }}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 md:mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Message</label>
              <textarea
                v-model="contact.message"
                v-validate="'required'"
                name="message"
                class="appearance-none block w-full h-32 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              ></textarea>
              <div class="validate-error-msg text-red-500 text-sm">
                <span class="caption" v-if="errors.has('message')">{{ errors.first('message') }}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mb-6">
            <button
              @click="sendContactInformation"
              class="focus:outline-none btn py-2 px-12 rounded-md border-2 border-baits-blue bg-baits-blue text-white font-bold text-xl md:m-0 m-auto"
            >
              Send
            </button>
          </div>
        </div>
        <div class="md:w-2/12 hidden md:block"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Navbar from '@/components/common/Navbar';
import MobileNavbar from '@/components/common/MobileNavbar';
import Footer from '@/components/common/Footer';
export default {
  components: {
    Navbar,
    MobileNavbar,
    Footer,
  },
  data() {
    return {
      isDomReady: false,
      contact: {},
      markers: [
        {
          position: {
            lat: 1.2957603,
            lng: 103.8611073,
          },
        },
      ],
    };
  },
  mounted() {
    this.isDomReady = true;
  },
  computed: {
    calcWidth() {
      return this.windowWidth;
    },
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      _saveContactInformation: 'user/saveContactInformation',
    }),
    sendContactInformation() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.setLoader(true);
          const response = await this._saveContactInformation({
            data: this.contact,
          })
            .then((res) => {
              if (res.data.result) {
                this.setLoader(false);
                this.contact = {};
                this.$toast.open({
                  message: 'Message Sent...',
                  type: 'success',
                  duration: 5000,
                  dismissible: true,
                });
              }
            })
            .catch((err) => {
              this.setLoader(false);
              this.contact = {};
              this.$toast.open({
                message: 'Failed',
                type: 'error',
                duration: 5000,
                dismissible: true,
              });
            });
        }
      });
    },
  },
};
</script>
<style>
.g-map {
  border-radius: 35px;
  width: 100%;
  height: 300px;
  display: inline-block;
}
</style>
