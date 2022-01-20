const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  pwa: {
    disable:
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "preview" ||
      process.env.NODE_ENV === "production",
      // delete two lines above to enable PWA in production deployment
      // add your own icons to public/manifest.json 
      // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
    dest: "public",
    register: true,
  },
  env: { 
    HOST: process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000/" : "https://api.immersionkit.com",
    MEDIA_HOST: 'https://immersion-kit.sfo3.digitaloceanspaces.com/media',
    ANKI_HOST: 'http://127.0.0.1:5006'
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/creators',
        permanent: true,
      },
      {
        source: '/dictionary/:slug',
        destination: '/search?keyword=:slug',
        permanent: true,
      },
      {
        source: '/dictionary',
        destination: '/search',
        permanent: true,
      },
      {
        source: '/search/:slug',
        destination: '/search?keyword=:slug',
        permanent: false,
      }
    ]
  },
});
