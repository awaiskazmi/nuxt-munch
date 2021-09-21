export default {
  privateRuntimeConfig: {
    googlePlacesAPI: "${GOOGLE_PLACES_API}"
  },
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0", // default: localhost,
    timing: false
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: "server",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Munchies App",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_API}&libraries=places`
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@assets/scss/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/client.js" },
    { src: "~/plugins/aos.client" }
    // { src: "~/plugins/test.server" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "nuxt-material-design-icons",
    "bootstrap-vue/nuxt",
    "@nuxtjs/style-resources",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/proxy"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
    // baseURL: "https://munchies-qa.impact.venturedive.com",
    // baseURL: "http://test.munchieshome.com",
  },

  proxy: {
    "/api/": {
      target: "https://test.munchieshome.com",
      pathRewrite: { "^/api/": "" }
    },
    "/qa/": {
      target: "https://munchies-qa.impact.venturedive.com",
      pathRewrite: { "^/qa/": "" }
    },
    "/test/": {
      target: "https://awais-users.000webhostapp.com/api",
      pathRewrite: { "^/test/": "" }
    }
  },

  // googleFonts: {
  //   families: {
  //     Manrope: [400, 500, 700],
  //   }
  // },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  styleResources: {
    scss: "@/assets/scss/_variables.scss"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
