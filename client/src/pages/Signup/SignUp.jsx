import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/provider/authProvider";

export const MAX_FILE_SIZE_BYTE = 80000; // 80KB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const signUpFormSchema = z.object({
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
  password: z
    .string()
    .min(6, { message: "Password has to be at least 6 characters long." }),
  userImage: z
    .any()
    .refine((file) => file?.length !== 0, "Profile picture is required.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE_BYTE,
      `Max image size is 80KB.`
    ),
});

const SignUp = () => {
  const navigate = useNavigate();
  const { token, signUp, isLoading } = useAuth();

  const buttonText = isLoading ? "Please wait" : "Sign Up";

  useEffect(() => {
    if (token) {
      navigate("/"); // Redirect to home page if already logged in
    }
  }, [token, navigate]);

  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userImage: "",
    },
  });

  return (
    <div className="flex items-center h-screen">
      <Card className="w-[90%] sm:w-[450px] m-auto">
        <CardHeader>
          <CardTitle className="mb-2 text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => {
                // Create formData
                const formData = new FormData();

                formData.append("firstName", values.firstName);
                formData.append("lastName", values.lastName);
                formData.append("email", values.email);
                formData.append("password", values.password);
                formData.append("userImage", values.userImage);

                signUp(formData, () => navigate("/login", { replace: true }));
              })}
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userImage"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        className="cursor-pointer"
                        type="file"
                        {...fieldProps}
                        onChange={(event) => {
                          onChange(event.target.files && event.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-5 w-full" type="submit">
                {buttonText}
              </Button>
            </form>
          </Form>
          <Button variant="outline" className="mt-5 w-full" type="submit">
            Sign Up with Google
          </Button>
          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Already have an account?
              <Link to="/login" className="text-black">
                Log In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
