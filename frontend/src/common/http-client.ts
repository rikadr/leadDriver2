import ky from "ky";

export const httpClient = ky.extend({
  credentials: "include",
  timeout: 20 * 1000,
  retry: 1,
  throwHttpErrors: false,
  redirect: "follow",
  hooks: {
    afterResponse: [
      (_request, _options, response) => {
        if (response.status === 401) {
          // TODO add inn redirect loop check?
          // TODO(irek): I think that changing our backend responses
          // to 403 solves this issue only partially.  What is some
          // other response that comes not from our backend gives 401
          // response code, hmm...
          try {
            const url = new URL("/login", window.location.href);
            url.searchParams.set(
              "next",
              window.location.pathname + window.location.search
            );
            window.location.href = url.href;
          } catch (e) {
            console.error("Failed redirecting to login", e);
            throw e;
          }
        }
        return response;
      },
    ],
  },
});
