//@ts-ignore
import Html from "./index.html";
import App from "./components/App.svelte";

const handler = async function (event) {
  try {
    const request = event.Records[0].cf.request;

    const { uri } = request;
    const match = uri.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);

    if (match && match[1] !== "html") return request;

    //@ts-ignore
    const app = App.render({
      url: uri.replace("index.html", "") || "/",
    });

    return {
      status: "200",
      statusDescription: "OK",
      headers: {
        "cache-control": [
          {
            key: "Cache-Control",
            value: "max-age=30",
          },
        ],
        "content-type": [
          {
            key: "Content-Type",
            value: "text/html",
          },
        ],
      },
      body: Html.replace("<body></body>", `<body>${app.html}</body>`),
    };
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

export { handler };
