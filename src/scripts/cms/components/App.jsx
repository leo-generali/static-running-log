import React, { Suspense, useState, useEffect } from "react";
import { Router, View } from "react-navi";
import { mount, route } from "navi";

import Activities from "../pages/Activities";
import Activity from "../pages/Activity";

import api from "../api";

const LOADING_STATES = {
  INTIAL: "LOADING-STATE/INITIAL",
  LOADING: "LOADING-STATE/LOADING",
  SUCCESS: "LOADING-STATE/SUCCESS",
  ERROR: "LOADING-STATE/ERROR"
};

const routes = mount({
  "/cms": route({
    getData: () => api.fetchActivities(),
    view: <Activities />
  }),

  "/cms/:id": route(async req => {
    const { id } = req.params;
    const activity = await api.fetchActivity(id);
    console.log({ activity });

    return {
      view: <Activity {...activity} />
    };
  })
});

const scrapeDataFromStrava = () => {
  fetch(`/.netlify/functions/auth`)
    .then(resp => resp.json())
    .then(data => {
      window.location = data.authorizationUri;
    });
};

const LoginWithStrava = ({ loadingState, apiMessage }) => (
  <div className="p-4 mt-8 mb-4 bg-white rounded shadow">
    <div className="flex items-center">
      {loadingState === LOADING_STATES.INTIAL && (
        <React.Fragment>
          <button
            onClick={scrapeDataFromStrava}
            className="py-1 px-2 bg-strava text-white rounded transition duration-100 hover:bg-orange-700 "
          >
            Get Latest Strava Data
          </button>
          <p className="ml-auto">Get latest info from Strava</p>
        </React.Fragment>
      )}
      {loadingState === LOADING_STATES.LOADING && (
        <React.Fragment>
          <p>Updating FaunaDB with latest data from Strava</p>
        </React.Fragment>
      )}
      {loadingState === LOADING_STATES.SUCCESS && (
        <React.Fragment>
          <p>{apiMessage}</p>
        </React.Fragment>
      )}
    </div>
  </div>
);

const App = () => {
  const [loadingState, setLoadingState] = useState(LOADING_STATES.INTIAL);
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const hasQueryString = !!queryString;

    // Exit if no code exists
    if (!hasQueryString) return;
    setLoadingState(LOADING_STATES.LOADING);

    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    fetch(`/.netlify/functions/auth-callback`, {
      method: "post",
      body: JSON.stringify({ code: code })
    })
      .then(res => res.json())
      .then(res => {
        setLoadingState(LOADING_STATES.SUCCESS);
        setApiMessage(res.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Router routes={routes}>
      <LoginWithStrava loadingState={loadingState} apiMessage={apiMessage} />
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Router>
  );
};

export default App;
