import { defineConfig, loadEnv } from "vitepress";
import minimist from "minimist";
// https://vitepress.dev/reference/site-config
export default ({ mode }) => {
  const { mode: customMode } = minimist(process.argv.slice(3));
  console.log(customMode);
  const env = loadEnv(customMode || mode, process.cwd());
  console.log(env);
  const prefix = env.VITE_PREFIX;
  return defineConfig({
    // cleanUrls: true,
    base: prefix,
    srcDir: "./src",
    outDir: "./md",
    title: "我吃饱了",
    description: "Blogs of SunWei",
    head: [
      [
        "link",
        {
          rel: "icon",
          type: "image/svg",
          href: prefix + "chinese-zodiac/dragon.svg",
        },
      ],
      ["meta", { name: "author", content: "SunWei" }],
      ["meta", { property: "og:title", content: "Blogs" }],
      ["meta", { property: "og:description", content: "Blogs of SunWei" }],
    ],
    lastUpdated: true,
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: "首页", link: "/" },
        {
          text: "前端",
          link: "/frontend/2023/vite+vue3+eslint+prettier",
          activeMatch: "/frontend/",
        },
        {
          text: "后端",
          link: "/backend/docker/docker命令",
          activeMatch: "/backend/",
        },
        { text: "简历", link: "/jianli/", activeMatch: "/jianli/" },
      ],

      sidebar: {
        "/frontend/": [
          {
            collapsed: true,
            text: "2023",
            items: [
              {
                text: "ESLint&Prettier",
                link: "/frontend/2023/vite+vue3+eslint+prettier",
              },
              {
                text: "husky&lint-staged",
                link: "/frontend/2023/husky+lint-staged",
              },
              { text: "commitlint&cz", link: "/frontend/2023/commitlint+cz" },
            ],
          },
          {
            collapsed: true,
            text: "2022",
            items: [
              {
                text: "VSCode主题配置",
                link: "/frontend/2022/0419vscode主题",
              },
              {
                text: "VSCode配置",
                link: "/frontend/2022/0504vscode配置",
              },
              { text: "react笔记", link: "/frontend/2022/react优化" },
              { text: "TS笔记", link: "/frontend/2022/TypeScript学习笔记" },
            ],
          },
          {
            collapsed: true,
            text: "2021",
            items: [
              {
                text: "vue/cli4 项目迁移到 Vite2.0",
                link: "/frontend/2021/041902",
              },
              {
                text: "js 生成随机字符串",
                link: "/frontend/2021/050601",
              },
              {
                text: "js 时间戳和日期字符串相互转换",
                link: "/frontend/2021/050901",
              },
            ],
          },
        ],
        "/backend/": [
          {
            collapsed: true,
            text: "Docker",
            items: [
              { text: "Docker命令", link: "/backend/docker/docker命令" },
              { text: "Api Examples", link: "/backend/api-examples" },
              { text: "Markdown Examples", link: "/backend/markdown-examples" },
            ],
          },
        ],
      },
      socialLinks: [
        { icon: "github", link: "https://github.com/vipsunwei" },
        {
          icon: {
            svg: `<svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20">
        <path d="M874.666667 375.189333V746.666667a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V375.189333l266.090667 225.6a149.333333 149.333333 0 0 0 193.152 0L874.666667 375.189333zM810.666667 213.333333a64.789333 64.789333 0 0 1 22.826666 4.181334 63.616 63.616 0 0 1 26.794667 19.413333 64.32 64.32 0 0 1 9.344 15.466667c2.773333 6.570667 4.48 13.696 4.906667 21.184L874.666667 277.333333v21.333334L553.536 572.586667a64 64 0 0 1-79.893333 2.538666l-3.178667-2.56L149.333333 298.666667v-21.333334a63.786667 63.786667 0 0 1 35.136-57.130666A63.872 63.872 0 0 1 213.333333 213.333333h597.333334z" ></path>
        </svg>`,
          },
          link: "mailto:908241555@qq.com",
        },
      ],
    },
    markdown: {
      // theme: "material-theme-palenight",
      lineNumbers: true,

      // adjust how header anchors are generated,
      // useful for integrating with tools that use different conventions
      // anchor: {
      //   slugify(str) {
      //     return encodeURIComponent(str);
      //   },
      // },
    },
    vite: { server: { host: true, open: true } },
  });
};
