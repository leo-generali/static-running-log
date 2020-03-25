const md = require("markdown-it")("commonmark");
const valuesThatUseMarkdown = ["description"];

const ActivityCMS = superclass =>
  class extends superclass {
    constructor(args) {
      super(args);

      this.cms = args.cms;
    }

    hasCMSData(key = "") {
      // If there is no key, we check to see if there is
      // even CMS data in general
      if (key === "") return Object.keys(this.cms).length > 0;

      // If there is a key, we check for that specific key
      // and return a value indicating if it exists or not
      return !!this.cms[key];
    }

    cmsData(key) {
      if (valuesThatUseMarkdown.includes(key)) return md.render(this.cms[key]);

      return this.cms[key];
    }
  };

module.exports = ActivityCMS;
