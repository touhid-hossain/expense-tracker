import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SettingForm from "./components/SettingForm";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);

  const editAccesOn = () => setIsEditing(true);
  const editAccesOff = () => setIsEditing(false);

  return (
    <Card className="mt-10">
      <CardHeader className="flex md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          <CardTitle className="text-xl sm:text-2xl mb-1">
            Account Information
          </CardTitle>
          <CardDescription>Update Your account information</CardDescription>
        </div>

        <Button
          className="w-full md:w-auto"
          disabled={isEditing}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {/* Setting Form */}
        <SettingForm isEditing={isEditing} editAccesOff={editAccesOff} />
      </CardContent>
    </Card>
  );
};

export default Settings;
