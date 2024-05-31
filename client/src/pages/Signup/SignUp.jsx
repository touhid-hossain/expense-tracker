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

const signUpFormSchema = z.object({
  name: z.string().min("1", { message: "This field has to be filled." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password has to be at least 6 characters long." }),
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
      name: "",
      email: "",
      password: "",
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
              onSubmit={form.handleSubmit((values) =>
                signUp(values, () => navigate("/login", { replace: true }))
              )}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
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
                      <Input placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
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
