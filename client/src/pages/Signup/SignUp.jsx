import React from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const SignUp = () => {
  const form = useForm();
  return (
    <div className="flex items-center h-screen">
      <Card className="w-[90%] sm:w-[450px] m-auto">
        <CardHeader>
          <CardTitle className="mb-2 text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => console.log(data))}>
            <FormField
                control={form.control}
                name="username"
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
                        type="text"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-5 w-full" type="submit">
                Sign In
              </Button>
              <Button variant="outline" className="mt-5 w-full" type="submit">
                Sign In with Google
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-black">
                Log In
              </Link>{" "}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
