// import fetch from "node-fetch";

export default function () {
  const { nuxt } = this

  console.log('...Hi Im a module...', nuxt.options.axios)
}