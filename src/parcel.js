const Bundler = require("parcel-bundler");
const Path = require("path");

const cssEntryFile = Path.join(__dirname, "./styles/index.css");

const { BUNDLE } = process.env;

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
