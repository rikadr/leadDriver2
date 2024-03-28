import React from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../event-api";
import { EditEventForm } from "./edit-event-form";

export const EditEventPage: React.FC = () => {
  const { id } = useParams();
  const eventQuery = useEvent(id);

  if (!id || !eventQuery.data?.data) {
    return <>No event found</>;
  }

  return <EditEventForm event={eventQuery.data.data.event} />;
};
