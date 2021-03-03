import App from "./components/App.svelte";

export default new App({
  target: document.body,
  hydrate: true,
  props: { url: window.location.pathname || "/" },
});
