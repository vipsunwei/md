import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  srcDir: "./src",
  outDir: "./dist",
  title: "sunwei",
  description: "sunwei site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "前端", link: "/frontend/", activeMatch: "/frontend/" },
      { text: "后端", link: "/backend/", activeMatch: "/backend/" },
      { text: "简历", link: "/jianli/", activeMatch: "/jianli/" },
    ],

    sidebar: {
      "/frontend/": [
        {
          collapsed: true,
          text: "frontend Examples",
          items: [
            { text: "Index", link: "/frontend/" },
            { text: "a", link: "/frontend/a" },
            { text: "b", link: "/frontend/b" },
          ],
        },
      ],
      "/backend/": [
        {
          collapsed: true,
          text: "backend Examples",
          items: [
            { text: "Index", link: "/backend/" },
            { text: "a", link: "/backend/a" },
            { text: "b", link: "/backend/b" },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/vipsunwei" }],
  },
  markdown: {
    theme: "material-theme-palenight",
    lineNumbers: true,

    // adjust how header anchors are generated,
    // useful for integrating with tools that use different conventions
    anchor: {
      slugify(str) {
        return encodeURIComponent(str);
      },
    },
  },
  vite: { server: { host: true } },
});
