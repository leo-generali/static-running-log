const wrapper = word => `<span class='text-strava'>${word}</span>`;

module.exports = title => {
  const array = title.split(" ");
  const length = array.length;
  array[length - 2] = wrapper(array[length - 2]);

  return array.join(" ");
};
