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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE_BYTE,
} from "@/pages/Signup/SignUp";

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
    image: z
      .any()

      .refine(
        (file) => file?.size <= MAX_FILE_SIZE_BYTE,
        `Max image size is 80KB.`
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),

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

const SettingForm = ({ isEditing, editAccesOff }) => {
  const { user, userUpdate, isUserLoading, isUpdating } = useUser();

  const form = useForm({
    resolver: zodResolver(profileUpdateFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      newPassword: "",
    },
  });

  const imageRef = form.register("image", { required: false });
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        // password: "",
        // newPassword: "",
        // image: null,
      });
    }
  }, [user, isEditing]);

  const handleProfileUpdate = async (values) => {
    console.log(values);
    // return
    try {
      const formData = new FormData();

      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);

      if (values.newPassword) {
        formData.append("password", values.password);
        formData.append("newPassword", values.newPassword);
      }
      formData.append("image", values.image);

      // await userUpdate({ userId: user?._id, formData });

      toast({
        title: "Successfully Updated",
        variant: "success",
      });

      editAccesOff();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <Avatar className="h-12 w-12 md:h-14 md:w-14">
        {isUserLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <AvatarImage className="bg-cover" src={user?.image_url} />
        )}
      </Avatar>

      <form
        className="grid grid-cols-1 gap-5 md:grid md:grid-cols-2"
        onSubmit={form.handleSubmit(handleProfileUpdate)}
      >
        {/* <FormField
          disabled={!isEditing}
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <Input
                  className="cursor-pointer"
                  type="file"
                  // {...fieldProps}
                  {...form.register("image")}
                  onChange={(event) => {
                    onChange(event.target.files && event.target.files[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

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
          <div className="flex flex-row gap-2 mt-5 md:mt-0">
            <Button className="w-[140px] col-span-2" type="submit">
              {isUpdating ? "Updating" : "Update"}
            </Button>
            <Button
              onClick={editAccesOff}
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
