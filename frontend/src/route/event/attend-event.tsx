import React, { useState } from "react";
import { EventDTO } from "shared";
import { AttendEventForm } from "./attend-event-form";
import { useRevokeAttendenceEventMutation } from "./event-api";

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
      <button
        className="bg-red-400 hover:bg-red-800 text-white py-0.5 px-3 rounded-full "
        type="button"
        onClick={() => revokeAttendenceMutation.mutate({ eventId: event.id })}
      >
        Revoke attendence
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <button
        className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-3 rounded-full "
        type="button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Attend ..."}
      </button>
      {event && showForm && <AttendEventForm eventId={event.id} />}
    </div>
  );
};
