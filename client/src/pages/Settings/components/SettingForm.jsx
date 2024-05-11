import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/useUser";

const profileUpdateFormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .max(50, { message: "Max 50 characters." }),
    lastName: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .max(50, { message: "Max 50 characters." }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    image: z.any().optional(),
    password: z
      .string()
      .optional()
      .refine((val) => val?.length >= 6 || !val, {
        message: "Your password is at least 6 characters.",
      }),
    newPassword: z
      .string()
      .optional()
      .refine((val) => val?.length >= 6 || !val, {
        message: "Your password must be at least 6 characters.",
      }),
  })
  .refine((data) => data.newPassword === "" || data.password !== "", {
    message: "Password is required.",
    path: ["password"],
  });

const SettingForm = ({ isEditing, setIsEditing }) => {
  const [imageFile, setImageFile] = useState(null);
  const { user, userMutate } = useUser();

  const form = useForm({
    resolver: zodResolver(profileUpdateFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      image: "",
      password: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("firstName", user.name.split(" ")[0] || "");
      form.setValue("lastName", user.name.split(" ")[1] || "");
      form.setValue("email", user.email || "");
    }
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleProfileUpdate = async (values) => {
    // return
    try {
      const formData = new FormData();
      const fullName = values.firstName + " " + values.lastName;

      formData.append("name", fullName);
      formData.append("email", values.email);

      if (values.newPassword) {
        formData.append("password", values.password);
        formData.append("newPassword", values.newPassword);
      }

      // Handle profile picture if uploaded
      if (values.image && imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.put("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      // re-validate user info
      userMutate();

      toast({
        title: response?.data?.message,
        variant: "success",
      });

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <Avatar className="h-20 w-20">
        <AvatarImage
          className="bg-cover"
          src={
            imageFile
              ? URL.createObjectURL(imageFile)
              : `http://localhost:5000/${user?.image_url}`
          }
        />
        <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
      </Avatar>

      <form
        className="grid grid-cols-2 gap-5 "
        onSubmit={form.handleSubmit(handleProfileUpdate)}
      >
        <FormField
          disabled={!isEditing}
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <Input
                  className="cursor-pointer"
                  id="image"
                  type="file"
                  {...field}
                  onChange={(event) => {
                    handleImageChange(event);
                    field.onChange(event);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={!isEditing}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={!isEditing}
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={!isEditing}
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={!isEditing}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-2 top-[11px] h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-7"
                    type="password"
                    placeholder="Enter your current password"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={!isEditing}
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-2 top-[11px] h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-7"
                    type="password"
                    placeholder="Enter your new password"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isEditing && (
          <div className="flex flex-row gap-2">
            <Button className="w-[140px] col-span-2" type="submit">
              Update
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="ghost"
              className="w-[140px] col-span-2 text-red-600 hover:bg-red-300"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default SettingForm;
