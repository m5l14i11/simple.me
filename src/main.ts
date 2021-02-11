import App from "./components/App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "EveryOne",
    intro: "I am Siarhei Melnik, Software Engineer",
    socials: [
      {
        name: "email",
        link: "mailto:siarhei.m.a@gmail.com",
      },
      {
        name: "twitter",
        link: "https://twitter.com/m_siarhei",
      },
      {
        name: "github",
        link: "https://github.com/m5l14i11",
      },
      {
        name: "telegram",
        link: "https://t.me/msiarhei",
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/in/siarheim",
      },
    ].sort((a, b) => b.name.length - a.name.length),
    outro: "Wm05c2JHOTNJSFJvWlNCM2FHbDBaU0J5WVdKaWFYUWc4SitRaHc9PQ==",
  },
});

export default app;
