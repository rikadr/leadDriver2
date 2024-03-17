import React from "react";
import { useYou } from "./my-profile-api";

export const MyProfile: React.FC = () => {
  const youQuery = useYou();
  return (
    <div>
      <h1>My profile</h1>
      <pre>{JSON.stringify(youQuery.data?.data, null, 2)}</pre>
      <pre>{JSON.stringify(youQuery.data?.data, null, 2)}</pre>
      <pre>{JSON.stringify(youQuery.data?.data, null, 2)}</pre>
      <pre>{JSON.stringify(youQuery.data?.data, null, 2)}</pre>
      <pre>{JSON.stringify(youQuery.data?.data, null, 2)}</pre>
      <pre>{JSON.stringify(youQuery.data?.data, null, 2)}</pre>
      <pre>{JSON.stringify(youQuery.data?.data, null, 2)}</pre>
      <pre>{JSON.stringify(youQuery.data?.data, null, 2)}</pre>
      <pre>{JSON.stringify(youQuery.data?.data, null, 2)}</pre>
    </div>
  );
};
