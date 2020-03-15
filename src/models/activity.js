const moment = require("moment");

const METERS_PER_MILE = 1609.344;
const MIN_PER_MILE = 26.8224;

class Activity {
  constructor(args) {
    this.id = args.id;
    this.name = args.name;
    this.date = args.start_date_local;
    this.type = args.type.toLowerCase();
    this.moving_time = args.moving_time;
    this._distance = args.distance;
  }

  miles() {
    const miles = this._distance / METERS_PER_MILE;
    return parseFloat((Math.round(miles * 100) / 100).toFixed(2));
  }

  dayOfWeek() {
    return moment(this.date).format("E");
  }

  pace() {
    const [minutes, percent] = (
      MIN_PER_MILE /
      (this._distance / this.moving_time)
    )
      .toString()
      .split(".");

    const seconds = Math.round(`.${percent}` * 60);

    return `${minutes}:${seconds}`;
  }

  static dummy(date) {
    const dummyArgs = {
      id: "",
      name: "",
      date: date,
      type: "",
      moving_time: "",
      distance: ""
    };

    return new Activity(dummyArgs);
  }
}

module.exports = Activity;

// "resource_state": 2,
// "athlete": { "id": 11876587, "resource_state": 1 },
// "name": "Easy 6 miles to finish up the day",
// "distance": 9760.5,
// "moving_time": 3047,
// "elapsed_time": 3141,
// "total_elevation_gain": 75,
// "type": "Run",
// "workout_type": 0,
// "id": 3172767183,
// "external_id": "garmin_push_4642567922",
// "upload_id": 3391238922,
// "start_date": "2020-03-10T23:09:41Z",
// "start_date_local": "2020-03-10T19:09:41Z",
// "timezone": "(GMT-05:00) America/Detroit",
// "utc_offset": -14400,
// "start_latlng": [42.28, -83.75],
// "end_latlng": [42.28, -83.75],
// "location_city": null,
// "location_state": null,
// "location_country": "United States",
// "start_latitude": 42.28,
// "start_longitude": -83.75,
// "achievement_count": 0,
// "kudos_count": 11,
// "comment_count": 0,
// "athlete_count": 1,
// "photo_count": 0,
// "map": {
//   "id": "a3172767183",
//   "summary_polyline": "ix`aGzie~NFK@OAcCD[DAdABdACBABKSuD_@wBO{AQkABMNIzBAf@Et@SdAG^K`@@jALd@Bl@AlCHjF?|@DhB@bECLCDSJyDZaBZ?\\DdAL|@PzCp@dA^z@J`BBr@JpDRBAFi@JCfCH`@OVBj@LVBxAEb@BZALEPKZGvAG^B\\En@SHGP@r@PXFZ?XMDa@AoAAYA_AI_@AUAgBPsBJiCC}@Ds@JaAd@cCNwAb@sAb@sBRiA\\uC\\{A~@wFn@qE^cBXiA?IEAc@|@c@jDMJgBJuA@uADUH]Te@FiBHeAKuAa@S?[HYP[JeCa@c@FQEaACg@JWTS`@ItAMd@OXKvIQd@_@Re@D_@QIYIsAEgBK]Go@Mm@@SE_@BIv@]b@IL?d@RZb@Hn@BzECt@Qt@SP]Dc@GWWMYEcAB}AGq@?a@Gg@J_@Ie@\\_@JCj@@p@d@HRJj@@tGGXGJYV[De@IS_@OuAG}@EyAImABUFcAP_@BOA_@Jk@?KGGSD]?_@Js@G{CDa@BQCOFMV[VW^]Za@j@YVIKCa@ECm@|@aBjBc@p@Up@sAhASTQHIPc@f@q@d@qArAq@LONQF}AQqAAuAWsAEwAPYNa@Ye@I_@@[AAPEJE@oAIqFE]EYIu@PQ?o@HGMCDQDSQMEYQ[?K]GLULg@JQ?a@E{@QqA@]Cg@BeAO]?_@G{ADUE_@?[DO?sCQu@CqAKw@?c@F_@@_@CkAUM?QJGVANL`@z@bBVZb@tAr@|Af@|APVPn@d@bANf@X~@DZRn@Tl@Pj@?tCEzA@\\BHE|@B~@Ab@Dt@JBlAFXAj@Jl@B^?n@HJHDJ?JB@LC|AHtBBdAGd@FjABb@Ab@Er@@XCNRBHC`@Id@PT?PAHC|ACl@Y`BFnCA`@HxBIdB@pAIlD@`CGdB@t@CfC?w@EgABi@Gy@A_BRqFBkC?o@Fq@@i@AcAJCpADz@GBH@lAAx@@N",
//   "resource_state": 2
// },
// "trainer": false,
// "commute": false,
// "manual": false,
// "private": false,
// "visibility": "everyone",
// "flagged": false,
// "gear_id": "g5207468",
// "from_accepted_tag": false,
// "upload_id_str": "3391238922",
// "average_speed": 3.203,
// "max_speed": 7.6,
// "average_cadence": 82.5,
// "average_temp": 18,
// "has_heartrate": true,
// "average_heartrate": 154.8,
// "max_heartrate": 175,
// "heartrate_opt_out": false,
// "display_hide_heartrate_option": true,
// "elev_high": 266.2,
// "elev_low": 228.2,
// "pr_count": 0,
// "total_photo_count": 0,
// "has_kudoed": false,
// "_id": "769ec8c21ed342bbb96e51fb3c261217"
