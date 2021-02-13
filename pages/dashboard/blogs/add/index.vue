<template>
  <div class="w-full">
    <Header />
    <div class="md:px-12 px-4 m-auto md:mt-16 sm:mt-8 mt-32">
      <div class="flex flex-wrap">
        <button @click="$router.go(-1)" class="bg-baits-blue px-2 py-1 text-sm text-white rounded-md focus:outline-none">Back</button>
      </div>
      <form>
        <div class="flex flex-wrap -mx-3 bg-white p-4 mt-2 rounded-sm">
          <div class="lg:w-1/2 md:w-4/6 sm:w-4/5 w-full px-3">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  v-validate="'required'"
                  name="title"
                  v-model="title"
                />
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('title')">{{ errors.first('title') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full mb-4 px-2">
                <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Categories</label>
                <div class="relative">
                  <v-select
                    :multiple="true"
                    :clearable="false"
                    :options="categories"
                    v-model="category"
                    v-validate="'required'"
                    name="category"
                    label="name"
                    :reduce="(status) => status.name"
                  >
                    <template #search="{ attributes, events }">
                      <input class="vs__search" v-bind="attributes" v-on="events" />
                    </template>
                  </v-select>
                </div>
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('category')">{{ errors.first('category') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full mb-4 px-2">
                <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Meta Tags</label>
                <div class="relative">
                  <v-select taggable :multiple="true" :clearable="false" v-model="metaTags" v-validate="'required'" name="tag">
                    <template #search="{ attributes, events }">
                      <input class="vs__search" v-bind="attributes" v-on="events" />
                    </template>
                  </v-select>
                </div>
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('tag')">{{ errors.first('tag') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Description</label>
                <client-only>
                  <editor
                    v-validate="'required'"
                    apiKey="r2138w0thepsrkuuaqrf3dz7nm4dctbt1r277rwp43dxdfnj"
                    v-model="description"
                    name="description"
                    :init="{
                      height: 500,
                      menubar: false,
                      apply_source_formatting: true,
                      entity_encoding: 'named',
                      entities:
                        '160,nbsp,38,amp,34,quot,162,cent,8364,euro,163,pound,165,yen,169,copy,174,reg,8482,trade,8240,permil,60,lt,62,gt,8804,le,8805,ge,176,deg,8722,minus',
                      automatic_uploads: true,
                      images_upload_handler: tinymce_image_upload_handler,
                      images_upload_credentials: true,
                      plugins: [
                        'advlist autolink lists link image charmap',
                        'searchreplace visualblocks code fullscreen',
                        'print preview anchor insertdatetime media',
                        'paste code help wordcount table',
                      ],
                      toolbar: 'image code | undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent',
                    }"
                  >
                  </editor>
                </client-only>
                <p class="text-right text-xs">{{ textRemaining }}</p>
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('description')">{{ errors.first('description') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap justify-around">
              <button @click="createBlog" type="button" class="my-2 py-1 px-8 focus:outline-none rounded-full bg-baits-blue text-white font-bold text-lg">
                Create
              </button>
              <button @click="previewBlog" type="button" class="my-2 py-1 px-8 focus:outline-none rounded-full bg-baits-green text-white font-bold text-lg">
                Preview
              </button>
            </div>
          </div>
          <div class="lg:w-1/2 md:w-4/6 sm:w-4/5 w-full px-3">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label class="block tracking-wide text-gray-700 text-sm font-bold">Image Gallery</label>
                <client-only>
                  <image-uploader
                    :maxWidth="500"
                    :maxHeight="400"
                    style="display: none"
                    id="gallery_picture"
                    accept="image/*"
                    :preview="false"
                    doNotResize="gif"
                    outputFormat="verbose"
                    @input="uploadGalleryImage"
                  ></image-uploader>
                </client-only>
                <!-- Disable file input field if status is verfied otherwise enable it -->
                <div
                  class="cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <div class="overflow-scroll" style="height: 380px; padding-top: 5px">
                    <div v-for="(image, key) in galleryImages" :key="`gallery${key}`" class="inline-block h-32 relative">
                      <img :src="image.path" class="inline-block mr-2 w-32 h-32 pb-2" @click="showGalleryImage(image)" />
                    </div>
                  </div>
                  <p v-if="galleryImages.length === 0" class="py-4 text-center">There are no gallery images.</p>
                  <div class="flex flex-wrap items-center justify-center">
                    <button type="button" class="focus:outline-none py-2 px-16 text-white bg-baits-blue rounded" @click="openFileSelectionBoxForGalleryImage">
                      Upload New Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label class="block tracking-wide text-gray-700 text-sm font-bold">Banner Images (Up to 5 images)</label>
                <label class="text-gray-700 text-xs mb-2">Recommended image size: 400px x 300px</label>
                <client-only>
                  <image-uploader
                    :maxWidth="500"
                    :maxHeight="400"
                    style="display: none"
                    id="banner_picture"
                    accept="image/*"
                    :preview="false"
                    doNotResize="gif"
                    outputFormat="verbose"
                    @input="selectBannerFile"
                  ></image-uploader>
                </client-only>
                <!-- Disable file input field if status is verfied otherwise enable it -->
                <div
                  @click="openFileSelectionBoxForBanner"
                  class="cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <div v-for="(image, key) in bannerImages" :key="`banner${key}`" class="inline-block h-32 relative">
                    <span @click.stop.prevent="removeSelectedImageForBannerImage(image.name, key, 'uploaded')" class="remove-btn"></span>
                    <img :ref="'bannerImage'" class="inline-block mr-2 h-32 pb-2" />
                  </div>
                  <div v-for="(image, key) in bannerImagesFromGallery" :key="`gbanner${key}`" class="inline-block h-32 relative">
                    <span @click.stop.prevent="removeSelectedImageForBannerImage(image.name, key, 'selected')" class="remove-btn"></span>
                    <img :src="image" class="inline-block mr-2 h-32 pb-2" />
                  </div>
                  <p v-if="bannerImages.length === 0" class="py-4">Click to upload image</p>
                </div>
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="bannerImageError">The image field is required</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label class="block tracking-wide text-gray-700 text-sm font-bold">Thumbnail Images (Up to 5 images)</label>
                <label class="text-gray-700 text-xs mb-2">Recommended image size: 400px x 300px</label>
                <client-only>
                  <image-uploader
                    :maxWidth="500"
                    :maxHeight="400"
                    style="display: none"
                    id="thumbnail_picture"
                    accept="image/*"
                    :preview="false"
                    doNotResize="gif"
                    outputFormat="verbose"
                    @input="selectThumbnailFile"
                  ></image-uploader>
                </client-only>
                <!-- Disable file input field if status is verfied otherwise enable it -->
                <div
                  @click="openFileSelectionBoxForThumbnail"
                  class="cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <div v-for="(image, key) in thumbnailImages" :key="`thumbnail${key}`" class="inline-block h-32 relative">
                    <span @click.stop.prevent="removeSelectedImageForThumbnailImage(image.name, key, 'uploaded')" class="remove-btn"></span>
                    <img :ref="'thumbnailImage'" class="inline-block mr-2 h-32 pb-2" />
                  </div>
                  <div v-for="(image, key) in thumbnailImagesFromGallery" :key="`gthumbnail${key}`" class="inline-block h-32 relative">
                    <span @click.stop.prevent="removeSelectedImageForThumbnailImage(image.name, key, 'selected')" class="remove-btn"></span>
                    <img :src="image" class="inline-block mr-2 h-32 pb-2" />
                  </div>
                  <p v-if="thumbnailImages.length === 0" class="py-4">Click to upload image</p>
                </div>
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="thumbnailImageError">The image field is required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <BlogDetailModal v-if="isDomReady" :detail="previewBlogObj" />
    <GalleryImagesModal
      v-if="isDomReady"
      :galleryImages="galleryImages"
      :image="selectedGalleryImage"
      @selectImage="seletedImageFromGallery"
      @nextImage="nextImage"
      @previousImage="previousImage"
    />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import moment from 'moment';
import Header from '@/components/dashboard/Header';
import BlogDetailModal from '@/components/modal/BlogDetailModal';
import GalleryImagesModal from '@/components/modal/GalleryImagesModal';
import Editor from '@tinymce/tinymce-vue';

export default {
  layout: 'dashboard',
  components: {
    Header,
    BlogDetailModal,
    editor: Editor,
    GalleryImagesModal,
  },
  data() {
    return {
      isDomReady: false,
      title: '',
      description: '',
      category: '',
      metaTags: [],
      previewBlogObj: {},
      textLimit: 300,
      textRemaining: 300,
      bannerImages: [],
      bannerImagesFromGallery: [],
      thumbnailImages: [],
      thumbnailImagesFromGallery: [],
      bannerImageError: false,
      thumbnailImageError: false,
      selectedGalleryImage: null,
    };
  },
  async fetch({ store }) {
    await store.dispatch('blog/getBlogCategoriesForWriter');
    await store.dispatch('gallery/getGalleryImages');
  },
  computed: {
    ...mapGetters({
      categories: 'blog/isWriterBlogCategories',
      galleryImages: 'gallery/isGImages',
    }),
  },
  mounted() {
    this.checkTextLimit();
  },

  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      getGalleryImages: 'gallery/getGalleryImages',
    }),
    tinymce_image_upload_handler(blobInfo, success, failure, progress) {
      let vm = this;
      var xhr, formData;

      xhr = new XMLHttpRequest();
      // xhr.withCredentials = true;
      var api = '/blog/image/upload';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }

      xhr.open('POST', api);
      xhr.setRequestHeader('Authorization', `Bearer ${this.$cookies.get('baitsToken')}`);

      xhr.upload.onprogress = function (e) {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = function () {
        var json;

        if (xhr.status === 403) {
          failure('HTTP Error: ' + xhr.status, { remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }

        json = JSON.parse(xhr.responseText);

        vm.getGalleryImages();

        success(json.data.path);
      };

      xhr.onerror = function () {
        failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      };

      formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    },
    checkTextLimit() {
      // if (this.blog.hasOwnProperty('description')) {
      //   if (this.blog.segments.length >= this.textLimit) {
      //     this.blog.segments = this.blog.segments.substring(
      //       0,
      //       this.textLimit,
      //     );
      //   }
      //   this.textRemaining = this.textLimit - this.blog.segments.length;
      // }
    },
    previewBlog() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.previewBlogObj.title = this.title;
          this.previewBlogObj.description = this.description;
          this.previewBlogObj.category = this.category;
          this.isDomReady = true;
          this.$nextTick(() => {
            VoerroModal.show('blog-detail-modal');
          });
        }
      });
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
    selectBannerFile(file) {
      if (file.type === 'application/pdf') {
        this.$toast.open({
          message: 'File type not supported',
          type: 'error',
          duration: 3000,
          dismissible: true,
        });
        return;

        // var newFile = file;
      } else {
        if (!file.hasOwnProperty('info')) {
          this.$toast.open({
            message: 'File type not supported',
            type: 'error',
            duration: 3000,
            dismissible: true,
          });
          return;
        }
        var newFile = this.dataURLtoFile(file.dataUrl, file.info.name);
      }
      if (newFile.size > 1000000) {
        this.$toast.open({
          message: 'File is too big!',
          type: 'error',
          duration: 3000,
          dismissible: true,
        });
        return;
      }

      if (this.bannerImages.length < 5) {
        this.bannerImages.push(newFile);
        this.bannerImageError = false;
      } else {
        this.$toast.open({
          message: 'You cannot select more than 5 files',
          type: 'error',
          duration: 3000,
          dismissible: true,
        });
        return;
      }
      // preview selected images
      for (let i = 0; i < this.bannerImages.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.bannerImage[i].src = reader.result;
        };
        reader.readAsDataURL(this.bannerImages[i]);
      }
    },
    selectThumbnailFile(file) {
      if (file.type === 'application/pdf') {
        this.$toast.open({
          message: 'File type not supported',
          type: 'error',
          duration: 3000,
          dismissible: true,
        });
        return;

        // var newFile = file;
      } else {
        if (!file.hasOwnProperty('info')) {
          this.$toast.open({
            message: 'File type not supported',
            type: 'error',
            duration: 3000,
            dismissible: true,
          });
          return;
        }
        var newFile = this.dataURLtoFile(file.dataUrl, file.info.name);
      }
      if (newFile.size > 1000000) {
        this.$toast.open({
          message: 'File is too big!',
          type: 'error',
          duration: 3000,
          dismissible: true,
        });
        return;
      }
      if (this.thumbnailImages.length < 5) {
        this.thumbnailImages.push(newFile);
        this.thumbnailImageError = false;
      } else {
        this.$toast.open({
          message: 'You cannot select more than 5 files',
          type: 'error',
          duration: 3000,
          dismissible: true,
        });
        return;
      }
      // preview selected images
      for (let i = 0; i < this.thumbnailImages.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.thumbnailImage[i].src = reader.result;
        };
        reader.readAsDataURL(this.thumbnailImages[i]);
      }
    },
    removeSelectedImageForThumbnailImage(name, index, type) {
      // 'uploaded' -> means image uploaded from local system
      if (type === 'uploaded') {
        this.thumbnailImages = this.thumbnailImages.filter((image) => {
          if (image.name !== name) {
            return image;
          }
        });

        for (let i = 0; i < this.thumbnailImages.length; i++) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.$refs.thumbnailImage[i].src = reader.result;
          };
          reader.readAsDataURL(this.thumbnailImages[i]);
        }
      }
      // 'selected' -> means image selected from gallery images
      if (type === 'selected') {
        this.thumbnailImagesFromGallery.splice(index, 1);
      }
    },
    removeSelectedImageForBannerImage(name, index, type) {
      // 'uploaded' -> means image uploaded from local system
      if (type === 'uploaded') {
        this.bannerImages = this.bannerImages.filter((image) => {
          if (image.name !== name) {
            return image;
          }
        });

        for (let i = 0; i < this.bannerImages.length; i++) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.$refs.bannerImage[i].src = reader.result;
          };
          reader.readAsDataURL(this.bannerImages[i]);
        }
      }
      // 'selected' -> means image selected from gallery images
      if (type === 'selected') {
        this.bannerImagesFromGallery.splice(index, 1);
      }
    },
    openFileSelectionBoxForBanner() {
      document.getElementById('banner_picture').click();
    },
    openFileSelectionBoxForThumbnail() {
      document.getElementById('thumbnail_picture').click();
    },
    async createBlog() {
      this.thumbnailImageError = this.thumbnailImages.length === 0 && this.thumbnailImagesFromGallery.length === 0 ? true : false;
      this.bannerImageError = this.bannerImages.length === 0 && this.bannerImagesFromGallery.length === 0 ? true : false;
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.thumbnailImageError) {
            return;
          }

          if (this.bannerImageError) {
            return;
          }
          this.setLoader(true);

          // save thumbnail images
          let promises = [];
          var thumbnailPath = [];
          if (this.thumbnailImages.length > 0 && this.thumbnailImages.length <= 5) {
            for (let i = 0; i < this.thumbnailImages.length; i++) {
              const formData = new FormData();
              formData.append('file', this.thumbnailImages[i]);
              var api = '/blog/image/upload';
              if (process.env.API_PROXY === '1' && process.client) {
                api = '/api' + api;
              }
              promises.push(
                this.$axios
                  .post(api, formData, {
                    headers: {
                      Authorization: `Bearer ${this.$cookies.get('baitsToken')}`,
                    },
                  })
                  .then(async (res) => {
                    if (res.data.result) {
                      thumbnailPath.push(res.data.data.path);
                    }
                  }),
              );
            }
          }

          // save banner images
          var bannerPath = [];
          if (this.bannerImages.length > 0 && this.bannerImages.length <= 5) {
            for (let i = 0; i < this.bannerImages.length; i++) {
              const formData = new FormData();
              formData.append('file', this.bannerImages[i]);
              var api = '/blog/image/upload';
              if (process.env.API_PROXY === '1' && process.client) {
                api = '/api' + api;
              }
              promises.push(
                this.$axios
                  .post(api, formData, {
                    headers: {
                      Authorization: `Bearer ${this.$cookies.get('baitsToken')}`,
                    },
                  })
                  .then(async (res) => {
                    if (res.data.result) {
                      bannerPath.push(res.data.data.path);
                    }
                  }),
              );
            }
          }

          Promise.all(promises).then(async () => {
            // Combine selected and uploaded thumbnail images path
            let tempThumbnailArray = [];
            this.thumbnailImagesFromGallery.forEach((path) => {
              tempThumbnailArray.push(path);
            });
            let thumbnailArrayCombine = thumbnailPath.concat(tempThumbnailArray);
            let thumbnailImagesPath = thumbnailArrayCombine.filter((item, pos) => thumbnailArrayCombine.indexOf(item) === pos);

            // Combine selected and uploaded banner images path
            let tempBannerArray = [];
            this.bannerImagesFromGallery.forEach((path) => {
              tempBannerArray.push(path);
            });

            let bannerArrayCombine = bannerPath.concat(tempBannerArray);
            let bannerImagesPath = bannerArrayCombine.filter((item, pos) => bannerArrayCombine.indexOf(item) === pos);

            var api = '/blog';
            if (process.env.API_PROXY === '1' && process.client) {
              api = '/api' + api;
            }

            // paragraph - convert into chunks
            var paragraphs = this.description.split('</p>');
            let segments = [];
            for (let i = 0; i < paragraphs.length; i++) {
              if (paragraphs[i]) {
                paragraphs[i] += '</p>';
                segments.push({ content: encodeURI(paragraphs[i]) });
              }
            }

            // Get summary from tinymce description
            let summaryText = new DOMParser().parseFromString(this.description, 'text/html').querySelector('p').textContent.substring(0, 100);

            ///////////////////////////////////////
            const postData = {
              title: this.title,
              segments: segments,
              categories: this.category,
              metaTags: this.metaTags,
              thumbnails: thumbnailImagesPath,
              banner: bannerImagesPath,
              summary: summaryText,
            };

            this.$axios
              .post(api, postData)
              .then((response) => {
                if (response.data.result) {
                  this.setLoader(false);
                  this.$toast.open({
                    message: 'Blog created successfully',
                    type: 'success',
                    duration: 5000,
                    dismissible: true,
                  });

                  // reinitialized vars
                  this.resetBlog();
                  bannerPath = [];
                  thumbnailPath = [];
                } else {
                  this.setLoader(false);
                  this.$toast.open({
                    message: 'Failed to create blog.',
                    type: 'error',
                    duration: 5000,
                    dismissible: true,
                  });
                }
              })
              .catch((error) => {
                this.setLoader(false);
                console.log(error);
              });
          });
        }
      });
    },
    /////////////////////////////////////
    uploadGalleryImage(file) {
      if (file.type === 'application/pdf') {
        this.$toast.open({
          message: 'File type not supported',
          type: 'error',
          duration: 3000,
          dismissible: true,
        });
        return;

        // var newFile = file;
      } else {
        if (!file.hasOwnProperty('info')) {
          this.$toast.open({
            message: 'File type not supported',
            type: 'error',
            duration: 3000,
            dismissible: true,
          });
          return;
        }
        var newFile = this.dataURLtoFile(file.dataUrl, file.info.name);
      }
      if (newFile.size > 1000000) {
        this.$toast.open({
          message: 'File is too big!',
          type: 'error',
          duration: 3000,
          dismissible: true,
        });
        return;
      }

      // uplaod new image in gallery
      const formData = new FormData();
      formData.append('file', newFile);
      var api = '/blog/image/upload';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios
        .post(api, formData, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get('baitsToken')}`,
          },
        })
        .then(async (res) => {
          if (res.data.result) {
            this.getGalleryImages();
          }
        });
    },
    showGalleryImage(image) {
      this.selectedGalleryImage = image;
      this.isDomReady = true;
      this.$nextTick(() => {
        VoerroModal.show('gallery-image-modal');
      });
    },
    openFileSelectionBoxForGalleryImage() {
      document.getElementById('gallery_picture').click();
    },
    seletedImageFromGallery(obj) {
      if (obj.type === 'thumbnail') {
        this.thumbnailImagesFromGallery.push(obj.image.path);
      }
      if (obj.type === 'banner') {
        this.bannerImagesFromGallery.push(obj.image.path);
      }
    },
    nextImage() {
      const matchedIndex = this.galleryImages.map((obj) => obj.id).indexOf(this.selectedGalleryImage.id);
      if (matchedIndex + 1 < this.galleryImages.length) {
        this.selectedGalleryImage = this.galleryImages[matchedIndex + 1];
      } else {
        this.selectedGalleryImage = this.galleryImages[0];
      }
    },
    previousImage() {
      const matchedIndex = this.galleryImages.map((obj) => obj.id).indexOf(this.selectedGalleryImage.id);
      if (matchedIndex - 1 < this.galleryImages.length && matchedIndex - 1 >= 0) {
        this.selectedGalleryImage = this.galleryImages[matchedIndex - 1];
      } else {
        this.selectedGalleryImage = this.galleryImages[this.galleryImages.length - 1];
      }
    },
    resetBlog() {
      this.title = '';
      this.category = '';
      this.metaTags = [];
      this.description = '';
      this.isDomReady = false;
      this.$validator.reset();
      this.bannerImages = [];
      this.thumbnailImages = [];
      this.bannerImageError = false;
      this.thumbnailImageError = false;
      this.bannerImagesFromGallery = [];
      this.selectedGalleryImage = null;
      this.thumbnailImagesFromGallery = [];
    },
  },
};
</script>
<style scoped>
.remove-btn {
  cursor: pointer;
  color: white;
  border: 1px solid #aeaeae;
  border-radius: 30px;
  background: #605f61;
  font-size: 15px;
  font-weight: bold;
  display: inline-block;
  line-height: 0px;
  padding: 8px 3px;
  position: absolute;
  right: 5px;
  top: -6px;
}

.remove-btn:before {
  content: '×';
}
</style>