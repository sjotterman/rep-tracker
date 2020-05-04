import React from "react";

import Layout from "../components/layout";
import { useFetchUser } from "../lib/user";
import RepTracker from "../components/repTracker";
import { getExercises } from "../redux/actions/exerciseActions";

function Home() {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading}>
      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in{" "}
            <i>Profile</i> and <i>Logout</i>
          </p>
        </>
      )}

      {user && <RepTracker user={user}></RepTracker>}
    </Layout>
  );
}

Home.getInitialProps = async ({ store }) => {
  await store.dispatch(getExercises());
};

export default Home;
