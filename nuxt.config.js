export default {
  // DISABLE SSR
  ssr: false,

  // .ENV VARIABLES
  // PUBLIC
  publicRuntimeConfig: {
    googleSheetKey: "${GOOGLE_SHEET_KEY}",
    placeholderImage: "${PLACEHOLDER_IMAGE}",
    resourceUrl: "${RESOURCE_URL}"
  },
  // PRIVATE
  privateRuntimeConfig: {
    googlePlacesAPI: "${GOOGLE_PLACES_API}",
    googleSheetID: "${GOOGLE_SHEET_ID}",
  },

  router: {
    // middleware: ['location']
  },

  // SERVER CONFIG
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0',
    // host: process.env.ENVIRONMENT == 'local' ? "localhost" : '0.0.0.0', // default: localhost,
    // host: "localhost", // default: localhost,
    timing: false,
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: "server",
  // target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Munchies: Snack Delivery App",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Craving some snacks? We’ve got your back! The best part? You don’t have to move an inch." },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_API}&libraries=places`,
      },
      {
        src: '/js/tracking.js',
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["swiper/dist/css/swiper.css", "@assets/scss/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // client side only
    { src: "~/plugins/userLogin.client.js" },
    { src: "~/plugins/aos.client" },
    { src: "~/plugins/client.js" },
    { src: "~/plugins/vue-awesome-swiper.js", ssr: false },
    // { src: "~/plugins/test.server" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // '@nuxtjs/google-fonts',
    "~/modules/sitemapRouteGenerator.js",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "nuxt-material-design-icons",
    "bootstrap-vue/nuxt",
    "@nuxtjs/style-resources",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    // [
    //   "nuxt-gmaps",
    //   {
    //     key: `${process.env.GOOGLE_PLACES_API}`,
    //     libraries: ["places"],
    //   },
    // ],
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    // baseURL: "https://munchies-qa.impact.venturedive.com",
    // baseURL: "http://test.munchieshome.com",
  },

  proxy: {
    "/api/": {
      target: "https://test.munchieshome.com",
      pathRewrite: { "^/api/": "" },
    },
    "/qa/": {
      target: "https://munchies-production.impact.venturedive.com",
      pathRewrite: { "^/qa/": "" },
    },
    "/munchies/": {
      target: "https://munchies-qa.munchieshome.com",
      pathRewrite: { "^/munchies/": "" },
    },
    "/test/": {
      target: "https://awais-users.000webhostapp.com/api",
      pathRewrite: { "^/test/": "" },
    },
    "/sheet/": {
      target: `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}`,
      pathRewrite: { "^/sheet/": "" },
    },
    "/mock/": {
      target: `https://615205d94a5f22001701d5d3.mockapi.io/api/v1`,
      pathRewrite: { "^/mock/": "" },
    },
  },

  sitemap: {
    hostname: "https://munchieshome.com",
  },

  robots: {
    UserAgent: "*",
    Disallow: "/",
  },

  // googleFonts: {
  //   families: {
  //     Manrope: [400, 500, 700],
  //   }
  // },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    componentPlugins: ['Collapse', 'Spinner', 'Modal', 'Sidebar', 'Breadcrumb', 'Card', 'Alert', 'Toast', 'Form-Checkbox'], // Here you can specify which components you want to load and use
    directivePlugins: ['Toggle']
  },

  styleResources: {
    scss: "@/assets/scss/_variables.scss",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: true,
  },
};
