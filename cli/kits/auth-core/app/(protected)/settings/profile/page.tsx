import React from "react";
import ProfileForm from "./profile-form";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Profile Settings</h1>
      <p className="text-muted-foreground mb-4 text-sm">
        Update your name and email. Changes are persisted via the
        /api/users/[id] API.
      </p>
      <ProfileForm />
    </div>
  );
}
