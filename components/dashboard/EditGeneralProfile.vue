<template>
  <div class="mt-20 sm:mt-0 text-base pb-4 general-profile">
    <div class="w-full sm:px-10 px-4">
      <!-- Header of Profile Edit Section -->
      <div class="flex justify-between items-center">
        <!-- Breadcrumb -->
        <ul class="breadcrumb text-xl title-color font-semibold flex pb-6">
          <li class="mr-5"><nuxt-link class="hover:text-baits-blue" to="/dashboard">Profile</nuxt-link></li>
          <li class="mr-5 active text-baits-blue">General</li>
        </ul>

        <!-- Save Button -->
        <!-- <button class="btn-save font-semibold flex justify-between items-center focus:outline-none hover:shadow-lg" @click="generalProfileSave">
          Save
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 20px">
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button> -->
      </div>

      <!-- Main Content -->
      <div class="main-section bg-white text-gray-700">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-10">
          <!-- first grid column -->
          <div>
            <h2 class="text-xl font-semibold mb-3 text-baits-blue">Personal Details</h2>
            <div class="sm:p-10 p-4 shadow-md border border-gray-200 rounded sm:p-10 p-5 mb-8">
              <!-- User Avatar -->
              <div class="mb-8">
                <div class="w-max m-auto relative cursor-pointer" style="width: max-content" @click="openAvatarDialog">
                  <form enctype="multipart/form-data">
                    <client-only>
                      <image-uploader
                        :maxWidth="512"
                        :maxHeight="512"
                        style="display: none"
                        id="profile_upload"
                        :preview="false"
                        doNotResize="gif"
                        accept=".jpg, .jpeg, .png, .gif"
                        outputFormat="verbose"
                        @input="fileseleted"
                        :quality="0.9"
                      ></image-uploader>
                    </client-only>
                  </form>
                  <template v-if="userProfile.avatar">
                    <img class="w-32 h-32 rounded-full" :src="userProfile.avatar" />
                  </template>
                  <template v-else>
                    <img class="w-32 h-32 rounded-full" src="~/static/images/default-user.jpg" />
                  </template>

                  <div class="edit-user-avatar absolute rounded-full p-2 bg-white bottom-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#2fcc71" style="width: 24px">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="{2}"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- First Name & Last Name -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="first_name" class="font-semibold mb-3 text-baits-blue">First Name</label>
                  <input
                    v-model="userProfile.firstName"
                    type="text"
                    class="baits-input appearance-none block w-full py-1 px-4"
                    placeholder="First Name"
                    name="first_name"
                    id="first_name"
                    required
                  />
                </div>

                <div class="input-group flex justify-start flex-col">
                  <label for="last_name" class="font-semibold mb-3 text-baits-blue">Last Name</label>
                  <input
                    v-model="userProfile.lastName"
                    type="text"
                    class="baits-input appearance-none block w-full py-1 px-4"
                    placeholder="Last Name"
                    name="last_name"
                    id="last_name"
                    required
                  />
                </div>
              </div>

              <!-- Password -->
              <!-- <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="password" class="font-semibold  mb-3">Password</label>
                  <input type="password" class="py-2 px-4 rounded border border-gray-400 border-solid" placeholder="Password" name="password" id="password" required>
                </div>
              </div> -->

              <!-- Email -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="email" class="font-semibold mb-3 text-baits-blue">Email</label>
                  <input
                    v-model="userProfile.email"
                    type="email"
                    class="baits-input appearance-none block w-full py-1 px-4"
                    placeholder="Email"
                    name="email"
                    id="email"
                    required
                    readonly
                  />
                  <div class="mt-1 text-baits-gray-dark text-xs italic">
                    <span class="caption"
                      >To update email, please go to <nuxt-link class="cursor-pointer text-baits-blue" to="/dashboard/settings">settings</nuxt-link>, change
                      email</span
                    >
                  </div>
                </div>
              </div>

              <!-- Phone -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <!-- <label for="phone" class="font-semibold mb-3 text-baits-blue">Phone</label> -->
                  <!-- <input
                    v-model="userProfile.mobile"
                    type="text"
                    class="baits-input appearance-none block w-full py-1 px-4"
                    placeholder="Phone"
                    name="phone"
                    id="phone"
                    required
                  /> -->
                  <label class="font-semibold mb-3 text-baits-blue">Contact</label>
                  <div>
                    <div class="flex items-center relative">
                      <ContactExtension className="country_prefix_profile" class="absolute l-p-1" :default="userProfile.mobilePrefix" :disabled="true" />
                      <!-- class="baits-input appearance-none block w-full py-1 pl-25 pr-6" -->
                      <input name="mobile" class="baits-input appearance-none block w-full py-1 pl-25 pr-6" type="text" :value="userProfile.mobile" readonly />
                    </div>
                    <div class="mt-1 text-baits-gray-dark text-xs italic">
                      <span class="caption"
                        >To update contact, please go to <nuxt-link class="cursor-pointer text-baits-blue" to="/dashboard/settings">settings</nuxt-link>, change
                        contact / WhatsApp</span
                      >
                    </div>
                  </div>

                  <!-- <div class="flex items-center relative">
                    <ContactExtension
                      class="absolute l-p-1"
                      className="country_prefix_profile"
                      @passExtension="passMobileExtensionHandler"
                      :default="userProfile.mobilePrefix"
                    />
                    <input
                      class="baits-input appearance-none block w-full py-1 pl-25 pr-6"
                      type="tel"
                      name="newMobileNumber"
                      data-vv-as="mobile number"
                      ref="newMobileNumber"
                      v-validate="{
                        required: newWaMobile ? false : true,
                        regex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                      }"
                      v-model="userProfile.mobile"
                      placeholder=""
                    /> 
                  </div>-->
                </div>
              </div>

              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="messagePreference" class="font-semibold mb-3 text-baits-blue">Contact Preference</label>
                  <v-select
                    class="baits-input appearance-none block w-full px-2"
                    :options="['WhatsApp', 'Telegram']"
                    label="messagePreference"
                    v-model="userProfile.messagePreference"
                    v-validate="'required'"
                    data-vv-name="contact preference"
                  >
                    <template #search="{ attributes, events }">
                      <input class="vs__search" v-bind="attributes" v-on="events" />
                    </template>
                  </v-select>
                  <!-- <select
                    v-validate="'required'"
                    v-model="userProfile.messagePreference"
                    name="contact preference"
                    class="baits-input appearance-none block w-full py-1 px-4"
                  >
                    <option>WhatsApp</option>
                    <option>Telegram</option>
                  </select> -->
                </div>
              </div>

              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="email" class="font-semibold mb-3 text-baits-blue">Referral Code</label>
                  <input disabled v-model="userProfile.referralCode" class="baits-input appearance-none block w-full py-1 px-4" type="text" placeholder />
                </div>
              </div>

              <!-- Gender -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="gender" class="font-semibold mb-3 text-baits-blue">Gender</label>
                  <v-select
                    class="baits-input appearance-none block w-full px-2"
                    :options="['Male', 'Female']"
                    label="name"
                    v-model="userProfile.gender"
                    v-validate="'required'"
                    data-vv-name="gender"
                  >
                    <template #search="{ attributes, events }">
                      <input class="vs__search" v-bind="attributes" v-on="events" />
                    </template>
                  </v-select>
                  <!-- <select v-validate="'required'" v-model="userProfile.gender" name="gender" class="baits-input appearance-none block w-full py-1 px-4">
                    <option>Male</option>
                    <option>Female</option>
                  </select> -->
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('gender')">
                      {{ errors.first('gender') }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Date of Birth -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="phone" class="font-semibold mb-3 text-baits-blue">Date of Birth</label>
                  <date-picker
                    class="baits-input appearance-none block w-full px-2"
                    v-model="userProfile.dateOfBirth"
                    value-type="format"
                    format="D-MMM-YYYY"
                    placeholder="Select date"
                  ></date-picker>
                  <input v-validate="'required'" name="dateOfBirth" data-vv-as="date of birth" v-model="userProfile.dateOfBirth" v-show="false" />
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('dateOfBirth')">
                      {{ errors.first('dateOfBirth') }}
                    </span>
                  </div>
                </div>
              </div>
              <!-- Nationality -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="nationality" class="font-semibold mb-3 text-baits-blue">Nationality</label>
                  <div class="relative">
                    <v-select
                      class="baits-input appearance-none block w-full px-2"
                      :options="baitSettings.citizen"
                      label="name"
                      v-model="userProfile.nationality"
                      v-validate="'required'"
                      data-vv-name="nationality"
                    >
                      <template #search="{ attributes, events }">
                        <input class="vs__search" v-bind="attributes" v-on="events" />
                      </template>
                    </v-select>
                  </div>
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('nationality')">
                      {{ errors.first('nationality') }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Residing Country -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="country" class="font-semibold mb-3 text-baits-blue">Residing Country</label>
                  <div class="relative">
                    <v-select
                      class="baits-input appearance-none block w-full px-2"
                      :options="baitSettings.country"
                      label="name"
                      v-model="userProfile.country"
                      v-validate="'required'"
                      data-vv-name="country"
                    >
                      <template #search="{ attributes, events }">
                        <input class="vs__search" v-bind="attributes" v-on="events" />
                      </template>
                    </v-select>
                  </div>
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('country')">
                      {{ errors.first('country') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- second grid column -->
          <div>
            <h2 class="text-xl font-semibold mb-3 text-baits-blue">Employment Status</h2>
            <div class="sm:p-10 p-4 shadow-md border border-gray-200 rounded sm:p-10 p-5 mb-8">
              <!-- Industry -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="phone" class="font-semibold mb-3 text-baits-blue">Industry</label>
                  <div class="relative">
                    <v-select
                      class="baits-input appearance-none block w-full px-2"
                      :options="baitSettings.industry"
                      label="name"
                      v-model="userProfile.industry"
                      v-validate="'required'"
                      data-vv-name="industry"
                    >
                      <template #search="{ attributes, events }">
                        <input class="vs__search" v-bind="attributes" v-on="events" />
                      </template>
                    </v-select>
                  </div>
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('industry')">
                      {{ errors.first('industry') }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Company Name -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="company_name" class="font-semibold mb-3 text-baits-blue">Company Name</label>
                  <input
                    v-validate="'required'"
                    v-model="userProfile.companyName"
                    data-vv-as="company name"
                    name="companyName"
                    class="baits-input appearance-none block w-full py-1 px-4"
                    type="text"
                  />
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('companyName')">
                      {{ errors.first('companyName') }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Designation -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="designation" class="font-semibold mb-3 text-baits-blue">Designation</label>
                  <input
                    v-validate="'required'"
                    v-model="userProfile.designation"
                    name="designation"
                    class="baits-input appearance-none block w-full py-1 px-4"
                    type="text"
                  />
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('designation')">
                      {{ errors.first('designation') }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- I am a -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="employmentStatus" class="font-semibold mb-3 text-baits-blue">I am a</label>
                  <v-select
                    class="baits-input appearance-none block w-full px-2"
                    :options="['Employee', 'Business Owner']"
                    label="employmentStatus"
                    v-model="userProfile.employmentStatus"
                    v-validate="'required'"
                    data-vv-as="employment status"
                  >
                    <template #search="{ attributes, events }">
                      <input class="vs__search" v-bind="attributes" v-on="events" />
                    </template>
                  </v-select>
                  <!--<div class="relative">
                     <select
                      class="baits-input appearance-none block w-full py-1 px-4"
                      v-validate="'required'"
                      v-model="userProfile.employmentStatus"
                      name="employmentStatus"
                      data-vv-as="employment status"
                    >
                      <option>Employee</option>
                      <option>Business Owner</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div> 
                  </div> -->
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('employmentStatus')">
                      {{ errors.first('employmentStatus') }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Date of Establishment -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <div v-if="userProfile.employmentStatus === 'Business Owner'">
                    <label for="designation" class="font-semibold mb-3 text-baits-blue">Date of Establishment (For Business Owner)</label>
                    <date-picker
                      class="baits-input appearance-none block w-full px-2 mt-3"
                      v-model="userProfile.companyDateEstablishment"
                      value-type="format"
                      format="D-MMM-YYYY"
                      placeholder="Select date"
                    ></date-picker>
                    <input
                      v-validate="'required'"
                      data-vv-as="date of establishment"
                      name="companyDateEstablishment"
                      v-model="userProfile.companyDateEstablishment"
                      v-show="false"
                    />
                    <div class="validate-error-msg text-sm">
                      <span class="caption" v-if="errors.has('companyDateEstablishment')">{{ errors.first('companyDateEstablishment') }}</span>
                    </div>
                  </div>

                  <div v-if="userProfile.employmentStatus === 'Employee'">
                    <label class="font-semibold mb-3 text-baits-blue"> Date of Employment (For employee) </label>
                    <date-picker
                      class="baits-input appearance-none block w-full px-2 mt-3"
                      v-model="userProfile.dateOfEmployment"
                      value-type="format"
                      format="D-MMM-YYYY"
                      placeholder="Select date"
                    ></date-picker>
                    <input v-validate="'required'" name="dateOfEmployment" data-vv-as="date of joined" v-model="userProfile.dateOfEmployment" v-show="false" />
                    <div class="validate-error-msg text-sm">
                      <span class="caption" v-if="errors.has('dateOfEmployment')">
                        {{ errors.first('dateOfEmployment') }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Twitter & Linked in-->
              <!-- <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="input-group flex justify-start flex-col">
                <label for="twitter" class="font-semibold text-gray-700 mb-3">Twitter</label>
                <input type="text" class="py-2 px-4 rounded border border-gray-400 border-solid" placeholder="Twitter" name="twitter" id="twitter" required />
              </div>

              <div class="input-group flex justify-start flex-col">
                <label for="linked_in" class="font-semibold text-gray-700 mb-3">Linked in</label>
                <input
                  type="text"
                  class="py-2 px-4 rounded border border-gray-400 border-solid"
                  placeholder="Linked in"
                  name="linked_in"
                  id="linked_in"
                  required
                />
              </div>
            </div> -->

              <!-- Facebook & Google-->
              <!-- <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="input-group flex justify-start flex-col">
                <label for="facebook" class="font-semibold text-gray-700 mb-3">Facebook</label>
                <input
                  type="text"
                  class="py-2 px-4 rounded border border-gray-400 border-solid"
                  placeholder="Facebook"
                  name="facebook"
                  id="facebook"
                  required
                />
              </div>

              <div class="input-group flex justify-start flex-col">
                <label for="google" class="font-semibold text-gray-700 mb-3">Google</label>
                <input type="text" class="py-2 px-4 rounded border border-gray-400 border-solid" placeholder="Google" name="google" id="google" required />
              </div>
            </div> -->
            </div>

            <h2 class="text-xl font-semibold mb-3 text-baits-blue">Social media / links</h2>
            <div class="sm:p-10 p-4 shadow-md border border-gray-200 rounded sm:p-10 p-5 mb-8">
              <!-- <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="linkPersonal" class="font-semibold mb-3 text-baits-blue">Website</label>
                  <input
                    v-model="userProfile.linkPersonal"
                    name="linkPersonal"
                    class="baits-input appearance-none block w-full py-1 px-4"
                    type="text"
                    placeholder="Select date"
                  />
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('linkPersonal')">
                      {{ errors.first('linkPersonal') }}
                    </span>
                  </div>
                </div>
              </div> -->

              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="linkFb" class="font-semibold mb-3 text-baits-blue">Facebook</label>
                  <input
                    v-model="userProfile.linkFb"
                    name="linkFb"
                    class="baits-input appearance-none block w-full py-1 px-4"
                    type="text"
                    placeholder="https://www.facebook.com/baitsbite"
                  />
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('linkFb')">
                      {{ errors.first('linkFb') }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="linkInsta" class="font-semibold mb-3 text-baits-blue">Instagram</label>
                  <input
                    v-model="userProfile.linkInsta"
                    name="linkInsta"
                    class="baits-input appearance-none block w-full py-1 px-4"
                    type="text"
                    placeholder="https://instagram.com/baitsbite"
                  />
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('linkInsta')">
                      {{ errors.first('linkInsta') }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="linkLinkedIn" class="font-semibold mb-3 text-baits-blue">LinkedIn</label>
                  <input
                    v-model="userProfile.linkLinkedIn"
                    name="linkLinkedIn"
                    class="baits-input appearance-none block w-full py-1 px-4"
                    type="text"
                    placeholder="https://www.linkedin.com/company/baitsbite"
                  />
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('linkLinkedIn')">
                      {{ errors.first('linkLinkedIn') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex mb-6">
            <button
              class="focus:outline-none btn py-1 px-12 rounded-full bg-baits-blue text-white font-bold md:m-0 m-auto"
              v-if="userProfile.consumerProfileStatus == 'new'"
              @click="show"
            >
              Setup
            </button>
            <button
              class="focus:outline-none btn py-1 px-12 rounded-full bg-baits-blue text-white font-bold md:m-0 m-auto"
              v-if="userProfile.consumerProfileStatus == 'pending'"
              @click="generalProfileSave"
            >
              Pending
            </button>
            <button
              class="focus:outline-none btn py-1 px-12 rounded-full bg-baits-blue text-white font-bold md:m-0 m-auto"
              v-if="userProfile.consumerProfileStatus == 'verified'"
              @click="generalProfileSave"
            >
              Save
            </button>
            <button
              class="focus:outline-none btn py-1 px-12 rounded-full bg-gray-400 text-white font-bold md:ml-4 m-auto"
              @click="$router.push({ path: '/dashboard' })"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
    <PopupMessageModal>
      <template v-slot:content v-if="userProfile.consumerProfileStatus == 'verified'">
        <div class="text-xl font-bold text-center">
          <div>
            Your
            <span class="text-baits-blue">Profile</span> is setup!
          </div>
          <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full mt-12" @click="hide">Ok</button>
        </div>
      </template>
      <template v-slot:content v-else>
        <div class="text-lg font-bold text-center">
          <div>
            Kindly make sure your information provided is correct before you setup your
            <span class="text-baits-blue">Profile</span> ?
          </div>
          <div class="mt-8">Click “Confirm” to proceed?</div>
          <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full mt-12" @click="generalProfileSave">Confirm</button>
        </div>
      </template>
    </PopupMessageModal>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { convertFromUnixTime, convertToUnixTime } from '@/services/index';
import PopupMessageModal from '@/components/common/PopupMessageModal';
import ContactExtension from '@/components/common/ContactExtension';

const today = new Date();
today.setHours(0, 0, 0, 0);

export default {
  //'biteSettings', 'biteProfile','user', 'userProfile', 'baitSettings',
  props: ['baitSettings', 'userProfile'],
  components: {
    PopupMessageModal,
    ContactExtension,
  },
  data() {
    return {
      avatar: null,
    };
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
      setGeneralProfile: 'profile/setGeneralProfile',
    }),
    ...mapActions({
      updateUserAvatar: 'user/updateUserAvatar',
      saveGeneralProfile: 'profile/saveGeneralProfile',
    }),
    disableDataAfterToday(date) {
      return date > today;
    },
    openAvatarDialog() {
      document.getElementById('profile_upload').click();
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
            this.userProfile.avatar = res.data.data.path;
            this.updateUserAvatar(this.userProfile.avatar);
            this.setLoader(false);
            this.$toast.open({
              message: 'Avatar updated successfully...!',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });
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
    show() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          VoerroModal.show('popup-message-modal');
        }
      });
    },
    hide() {
      VoerroModal.hide('popup-message-modal');
    },
    passMobileExtensionHandler(val) {
      this.selectedMobileOption = val;
      this.selectedMobilePrefix = val.countryPrefix;
    },
    async generalProfileSave() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          let country = '';
          let industry = '';
          let nationality = '';
          // check for industry on edit bait profile
          if (this.userProfile.industry.hasOwnProperty('name')) industry = this.userProfile.industry.name;
          else industry = this.userProfile.industry;

          // check for industry on edit bait profile
          if (this.userProfile.nationality.hasOwnProperty('name')) nationality = this.userProfile.nationality.name;
          else nationality = this.userProfile.nationality;

          // check for country on edit bait profile
          if (this.userProfile.country.hasOwnProperty('name')) country = this.userProfile.country.name;
          else country = this.userProfile.country;

          let generalProfileData = {
            gender: this.userProfile.gender,
            dateOfBirth: convertToUnixTime(this.userProfile.dateOfBirth),
            companyDateEstablishment: this.userProfile.employmentStatus === 'Business Owner' ? convertToUnixTime(this.userProfile.companyDateEstablishment) : 0,
            dateOfEmployment: this.userProfile.employmentStatus === 'Employee' ? convertToUnixTime(this.userProfile.dateOfEmployment) : 0,
            companyName: this.userProfile.companyName,
            employmentStatus: this.userProfile.employmentStatus,
            country: country,
            industry: industry,
            nationality: nationality,
            designation: this.userProfile.designation,
            tagline: '',
            linkPersonal: '',
            linkFb: this.userProfile.linkFb,
            linkInsta: this.userProfile.linkInsta,
            linkLinkedIn: this.userProfile.linkLinkedIn,
          };

          this.setLoader(true);
          const response = await this.saveGeneralProfile({
            data: generalProfileData,
          });
          if (response.status === 201) {
            if (this.userProfile.consumerProfileStatus == 'verified') {
              // show updated message modal only if it is a verified account being updated
              VoerroModal.show('optional-edit-baits-profile-modal');
            }
            var updatedProfile = response.data.data;
            updatedProfile.dateOfBirth = convertFromUnixTime(updatedProfile.dateOfBirth);
            updatedProfile.dateOfEmployment = convertFromUnixTime(updatedProfile.dateOfEmployment);
            updatedProfile.companyDateEstablishment = convertFromUnixTime(updatedProfile.companyDateEstablishment);
            this.setGeneralProfile(updatedProfile);
            this.$toast.open({
              message: 'Profile updated',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });
            this.$router.push({ path: '/dashboard' });
          } else if (response.data.result === false) {
            if (response.data.error === '') {
              this.$toast.open({
                message: 'Opps! Something is broken..',
                type: 'error',
                duration: 5000,
                dismissible: true,
              });
            } else {
              this.$toast.open({
                message: 'Opps! ' + response.data.error,
                type: 'error',
                duration: 5000,
                dismissible: true,
              });
            }
          }
          this.setLoader(false);
          this.hide();
        }
      });
    },
  },
};
</script>

<style>
.title-color {
  color: #536577;
}

.breadcrumb li {
  position: relative;
  color: rgba(83, 101, 119, 0.7);
}

.active {
  color: unset;
  color: rgba(83, 101, 119, 1) !important;
}

.breadcrumb li::after {
  content: ' > ';
  position: absolute;
  top: 0;
  left: 105%;
}

.breadcrumb li:last-child::after {
  content: '';
}

.btn-save {
  background-color: #2fcc71;
  color: white;
  padding: 15px 21px;
  border-radius: 40px;
  line-height: 24px;
  width: 150px;
}

.l-p-1 {
  left: 0.5rem;
}

.pl-25 {
  padding-left: 6.5rem;
}

.user-avatar {
  width: 124px;
}
.general-profile .mx-input {
  border: none !important;
  border-radius: 0px !important;
  box-shadow: none !important;
}

.general-profile .vs__dropdown-toggle {
  border: none !important;
  border-radius: 0px !important;
}

.mx-datepicker {
  @apply w-full;
}
</style>
