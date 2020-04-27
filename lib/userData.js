import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

export async function fetchUserData(cookie = "") {
  if (typeof window !== "undefined" && window.__userData) {
    return window.__userData;
  }

  const res = await fetch(
    "/api/userData",
    cookie
      ? {
          headers: {
            cookie,
          },
        }
      : {}
  );

  if (!res.ok) {
    delete window.__userData;
    return null;
  }

  const json = await res.json();
  if (typeof window !== "undefined") {
    window.__userData = json;
  }
  return json;
}

export function useFetchUserData({ required } = {}) {
  const [loading, setLoading] = useState(
    () => !(typeof window !== "undefined" && window.__userData)
  );
  const [userData, setUserData] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.__userData || null;
  });

  useEffect(() => {
    if (!loading && userData) {
      return;
    }
    setLoading(true);
    let isMounted = true;

    fetchUserData().then((userData) => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        // When the user is not logged in but login is required
        if (required && !userData) {
          window.location.href = "/api/login";
          return;
        }
        setUserData(userData);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { userData, loading };
}
