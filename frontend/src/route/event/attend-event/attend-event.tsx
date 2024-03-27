import React, { useState } from "react";
import { EventDTO } from "shared";
import { AttendEventForm } from "./attend-event-form";
import { useRevokeAttendenceEventMutation } from "../event-api";
import { Button } from "../../../components/button";

export const AttendEvent: React.FC<{
  event?: EventDTO;
  youAreAttending?: boolean;
}> = ({ event, youAreAttending }) => {
  const [showForm, setShowForm] = useState(false);

  const revokeAttendenceMutation = useRevokeAttendenceEventMutation();

  if (!event) {
    return null;
  }

  if (youAreAttending) {
    return (
      <Button
        variant="danger"
        onClick={() => revokeAttendenceMutation.mutate({ eventId: event.id })}
      >
        Revoke attendence
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <Button type="button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Attend ..."}
      </Button>
      {event && showForm && <AttendEventForm eventId={event.id} />}
    </div>
  );
};
