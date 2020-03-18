const METERS_PER_MILE = 1609.344;

class Distance {
  static metersToMile(meters) {
    const miles = meters / METERS_PER_MILE;
    return parseFloat((Math.round(miles * 100) / 100).toFixed(2));
  }
}

module.exports = Distance;
