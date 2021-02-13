<template>
  <div class="my-5">
    <!-- <form>
      <div class="flex flex-wrap">
        <div class="lg:w-1/2 w-full px-3 py-2">
          <input
            v-model="register.firstName"
            type="text"
            class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none"
            placeholder="First Name"
            name="firstName"
            data-vv-as="first name"
            v-validate="'required'"
          />
          <div class="validate-error-msg">
            <span class="caption" v-if="errors.has('firstName')">{{
              errors.first('firstName')
            }}</span>
          </div>
        </div>
        <div class="lg:w-1/2 w-full px-3 py-2">
          <input
            v-model="register.lastName"
            type="text"
            class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none"
            placeholder="Last Name"
            name="lastName"
            data-vv-as="last name"
            v-validate="'required'"
          />
          <div class="validate-error-msg">
            <span class="caption" v-if="errors.has('lastName')">{{
              errors.first('lastName')
            }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="md:w-1/2 w-full px-3 py-2">
          <input
            v-model="register.email"
            type="text"
            class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none"
            placeholder="Personal Email"
            name="email"
            v-validate="'required|email'"
          />
          <div class="validate-error-msg">
            <span class="caption" v-if="errors.has('email')">{{
              errors.first('email')
            }}</span>
          </div>
        </div>
        <div class="md:w-1/2 w-full px-3 py-2">
          <div class="flex items-center">
            <ContactExtension
              @passExtension="passExtensionHandler"
              className="country_prefix_signup"
            />
            <input
              v-model="register.mobile"
              type="tel"
              class="shadow appearance-none border border-l-0 rounded rounded-l-none w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none"
              placeholder="Contact"
              name="contact"
              v-validate="{
                required: true,
                regex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
              }"
            />
          </div>
          <div class="validate-error-msg">
            <span class="caption" v-if="errors.has('contact')">{{
              errors.first('contact')
            }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full px-3 py-2">
          <input
            ref="password"
            v-model="register.password"
            type="password"
            class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none"
            placeholder="Password"
            name="password"
            v-validate="'required|min:8'"
          />
          <div class="validate-error-msg">
            <span class="caption" v-if="errors.has('password')">{{
              errors.first('password')
            }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full px-3 py-2">
          <input
            v-model="register.confirmPassword"
            type="password"
            class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none"
            placeholder="Confirm Password"
            name="confirmPassword"
            data-vv-as="password"
            v-validate="'required|min:8|confirmed:password'"
          />
          <div class="validate-error-msg">
            <span class="caption" v-if="errors.has('confirmPassword')">{{
              errors.first('confirmPassword')
            }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-1/2 px-3 py-3 text-lg text-gray-700">
          I am signing up as
        </div>
        <div class="w-1/2 px-3 py-2">
          <div class="relative">
            <select
              v-model="register.role"
              name="role"
              v-validate="'required'"
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none"
              id="grid-state"
            >
              <option selected class="hidden"></option>
              <option value="baits">Customer</option>
              <option value="bites">Provider</option>
              <option value="both">Both</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
            <div class="validate-error-msg">
              <span class="caption" v-if="errors.has('role')">{{
                errors.first('role')
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap px-3 py-3 text-lg text-gray-700">
        <div class="w-full">
          <input
            id="agree_chk"
            name="agree"
            v-validate="'required'"
            data-vv-as="Terms and Privacy"
            type="checkbox"
            v-model="agree"
            class="hidden"
          />
          <label for="agree_chk" class="cursor-pointer">
            <span
              class="w-5 h-5 inline-block mr-1 border border-white bg-white"
            ></span>
            I have reviewed and agree to the
            <p
              @click="pdfFileHandler('terms')"
              class="inline-block text-baits-blue"
            >
              Platform Terms
            </p>
            <span>and</span>
            <p
              @click="pdfFileHandler('policy')"
              class="inline-block text-baits-blue"
            >
              Privacy Policy
            </p>
            .
          </label>
          <div class="validate-error-msg">
            <span class="caption" v-if="errors.has('agree')">{{
              errors.first('agree')
            }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap py-6 py-8">
        <div class="w-full text-center">
          <button
            class="focus:outline-none md:py-4 py-2 px-24 md:px-16 text-xl font-bold text-white rounded-full bg-baits-green"
            type="button"
            @click="signup"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form> -->
    <modal id="signup-modal" class="fixed h-auto w-11/12 md:w-1/2 p-5 bg-gray-200 rounded-md m-auto">
      <div slot="body">
        <SignupForm />
      </div>
    </modal>
    <SignupSuccessModal v-if="isDomReady" />
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
import SignupForm from '@/components/signup/SignupForm';
import SignupSuccessModal from '@/components/modal/SignupSuccessModal';

export default {
  components: {
    SignupForm,
    SignupSuccessModal,
  },
  data() {
    return {
      isDomReady: false,
    };
  },
  mounted() {
    this.isDomReady = true;
  },
};
</script>