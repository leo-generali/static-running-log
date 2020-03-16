const DateMixin = superclass =>
  class extends superclass {
    static test() {
      console.log("we are testing class mixins. does this work??");
    }
  };

module.exports = DateMixin;
