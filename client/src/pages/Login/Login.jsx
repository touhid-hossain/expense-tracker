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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/provider/authProvider";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password has to be at least 6 characters long." }),
});

const Login = () => {
  const { toast } = useToast();
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/"); // Redirect to home page if already logged in
    }
  }, [token, navigate]);

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(values) {
    try {
      const response = await axios.post("/user/authenticate", {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        toast({
          title: "Successfully Logged In",
          variant: "success",
        });
        const token = response.data.token;
        setToken(response.data.token);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex items-center h-screen">
      <Card className="w-[90%] sm:w-[450px] m-auto">
        <CardHeader>
          <CardTitle className="mb-2 text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)}>
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

              <div className="mt-5 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Remember for 30 days</Label>
                </div>
                <div>
                  <Link to="#" className="text-sm">
                    Forget password?
                  </Link>
                </div>
              </div>

              <Button className="mt-5 w-full" type="submit">
                Log In
              </Button>
              <Button variant="outline" className="mt-5 w-full" type="submit">
                Log In with Google
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-black">
                Sign In
              </Link>{" "}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
