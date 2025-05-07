"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  LockClosedIcon,
  EnvelopeClosedIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

const loginSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

const AuthLoginFeature = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    const validEmail = "admin@gmail.com";
    const validPassword = "password123";

    if (data.email === validEmail && data.password === validPassword) {
      toast.success("Login berhasil!");
      document.cookie = "token=dummytoken; path=/dashboard";
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } else {
      toast.error("Email atau password salah");
    }
  };

  return (
    <main className="">
      <div className="w-full h-screen overflow-hidden shadow-2xl flex bg-white">
        <div className="w-1/2 bg-gradient-to-br from-[#3EC1D3] via-[#3EC1D3]/70 to-[#3EC1D3]/30 flex flex-col items-center justify-center text-white p-10 relative">
          <div className="absolute inset-y-0 right-0 w-10 bg-white rounded-l-full" />
          <div className="relative w-full h-full flex items-center justify-center z-0">
            <Image
              src="/images/bg-login.png"
              alt="bg-login"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="w-1/2 bg-white px-10 py-12 flex flex-col justify-center">
          <h2 className="text-center text-3xl font-bold text-[#3EC1D3] mb-6">
            LOGIN
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <EnvelopeClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="email@example.com"
                          {...field}
                          className="pl-10"
                        />
                      </div>
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
                      <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeClosedIcon className="w-5 h-5" />
                          ) : (
                            <EyeOpenIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="xl"
                variant="secondary"
                className="cursor-pointer"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default AuthLoginFeature;
