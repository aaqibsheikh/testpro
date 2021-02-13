<template>
  <div>
    <v-select :autoscroll="false" :clearable="false" :disabled="disabled" name="extension" title="Select country code" :options="options" v-model="selectedOption" label="title" v-validate="'required'" @input="selectedExtHandler" @search:focus="removeSelectedValueFromPlaceholder" :class="`${className} country_prefix focus:outline-none focus:bg-white`">
      <template slot="selected-option" slot-scope="option">
        <div class="flex items-center justify-center">
          <div class="w-full">
            <img :src="require(`~/static/images/country/${option.path}`)" class="inline-block w-5 h-4" />
            <span class="text-sm">{{ option.countryPrefix }}</span>
          </div>
        </div>
      </template>
      <template slot="option" slot-scope="option">
        <div class="flex items-center justify-between">
          <div>
            <img :src="require(`~/static/images/country/${option.path}`)" class="inline-block w-5 h-4" />
          </div>
          <div class="text-sm">
            {{ option.title }}
          </div>
          <div class="text-sm">
            {{ option.countryPrefix }}
          </div>
        </div>
      </template>
    </v-select>
  </div>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: '',
    },
    default: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedOption: '',
      options: [{
          title: 'Singapore',
          path: 'sg.gif',
          countryPrefix: '+65',
          countryCode2: 'SG',
        },
        {
          title: 'Malaysia',
          path: 'my.gif',
          countryPrefix: '+60',
          countryCode2: 'MY',
        },
      ],
    };
  },
  mounted() {
    this.setOption(this.default);
  },
  watch: {
    default (newValue, oldValue) {
      if (newValue != oldValue) {
        this.setOption(newValue);
      }
    },
  },
  methods: {
    selectedExtHandler() {
      this.$emit('passExtension', this.selectedOption);
    },
    removeSelectedValueFromPlaceholder() {
      //this.selectedExt = '';
    },
    setOption(value) {
      if (value) {
        var setup = this.options.filter((a) => a.countryPrefix == value || a.countryCode2.toLowerCase() == value.toLowerCase());
        if (setup.length > 0) {
          this.selectedOption = setup[0];
        }
      }
      if (this.selectedOption == '') {
        // default to first item in option
        this.selectedOption = this.options[0];
      }
      this.selectedExtHandler();
    },
  },
};

</script>
<style>
.country_prefix .vs__search {
  padding: 0;
  background-color: transparent;
}

.country_prefix .vs__dropdown-option {
  padding: 3px 10px;
}

.country_prefix .vs__selected {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  margin: 0px;
  width: 4rem;
  height: 100%;
}

.country_prefix.vs--single.vs--open .vs__selected {
  position: relative;
}

.country_prefix .vs__dropdown-toggle {
  padding: 0px;
  background: none;
}

.country_prefix_profile .vs__dropdown-toggle {
  height: 46px;
  /*cursor-not-allowed*/
  border: none !important;
  @apply w-full text-gray-700 leading-tight;
}

.country_prefix_signup .vs__dropdown-toggle {
  height: 46px;
  border: 0px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @apply text-gray-700 p-0 m-0 rounded rounded-r-none border-gray-400 bg-white;
}

.country_prefix_questionaire .vs__dropdown-toggle {
  height: 42px;
  @apply text-gray-700 border border-r-0 rounded-l-lg rounded-r-none border-gray-400 bg-white;
}

.country_prefix_questionaire .vs__dropdown-option {
  padding: 3px 10px;
}

.country_prefix_questionaire .vs__dropdown-toggle {
  height: 42px;
  @apply text-gray-700 border border-r-0 rounded-l-lg rounded-r-none border-gray-400 bg-white;
}

</style>
