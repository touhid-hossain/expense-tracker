import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import SettingForm from "./components/SettingForm";

const Settings = () => {
  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Update Your account information</CardDescription>
      </CardHeader>

      <CardContent>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>Personal Information</CardTitle>
          <Button>Edit</Button>
        </CardHeader>

        {/* Setting Form */}
        <SettingForm />
      </CardContent>
    </Card>
  );
};

export default Settings;
