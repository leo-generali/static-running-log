export default {
  fetchActivities: () =>
    fetch(`/.netlify/functions/get-activities`)
      .then(res => res.json())
      .then(activities => activities),

  fetchActivity: id =>
    fetch(`/.netlify/functions/get-activity?id=${id}`)
      .then(res => res.json())
      .then(activity => activity)
};
