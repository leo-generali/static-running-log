const ParcelProxyServer = require("parcel-proxy-server");
const Bundler = require("parcel-bundler");
const Path = require("path");

const cssEntryFile = Path.join(__dirname, "./styles/index.css");
const cmsEntryFile = Path.join(__dirname, "./cms/index.html");

const { BUNDLE } = process.env;

const cmsBundle = async () => {
  console.log("Running the CMS bundler");
  const entryFiles = [cmsEntryFile];

  const options = {
    outDir: "./_site/cms"
  };

  const server = new ParcelProxyServer({
    entryPoint: entryFiles,
    parcelOptions: options,
    proxies: {
      "/.netlify/functions/": {
        target: "http://127.0.0.1:9000/"
      }
    }
  });

  server.bundler.on("buildEnd", () => {
    console.log("Build completed!");
  });

  // start up the server
  server.listen(1234, () => {
    console.log("Parcel proxy server has started");
  });
};

const siteBundle = async () => {
  console.log("Running the running log bundler");
  const entryFiles = [cssEntryFile];

  const options = {
    outDir: "./_site/assets"
  };

  const bundler = new Bundler(entryFiles, options);

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  await bundler.bundle();
};

const allBundle = () => {
  console.log("Bundle all assets for production");

  console.log("Creating static running site bundler");
  const siteOptions = {
    outDir: "./_site/assets",
    cache: false,
    hmr: false
  };
  const siteBundler = new Bundler(cssEntryFile, siteOptions);

  console.log("Creating CMS bundler");
  const cmsOptions = {
    outDir: "./_site/cms",
    cache: false,
    hmr: false,
    publicUrl: "/cms/"
  };
  const cmsBundler = new Bundler(cmsEntryFile, cmsOptions);

  siteBundler.on("bundled", () => {
    cmsBundler.bundle();
  });

  siteBundler.on("buildEnd", () => {
    console.log("Finished bundling site assets");
  });

  cmsBundler.on("bundled", () => {
    console.log("Finished bundling CMS assets");
  });

  siteBundler.bundle();
};

switch (BUNDLE) {
  case "cms":
    cmsBundle();
    break;
  case "site":
    siteBundle();
    break;
  case "all":
    allBundle();
    break;
  default:
    siteBundle();
    break;
}
