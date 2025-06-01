"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";
import { toast } from "sonner";
import Script from "next/script";
import { MIDTRANS_CLIENT_KEY } from "@/constants/config";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const cekPembayaranSchema = z.object({
  user_email: z.string().email("Email tidak valid"),
  user_phone: z.string().min(10, "Nomor HP tidak valid"),
});

const CekPembayaranFeature = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const form = useForm({
    resolver: zodResolver(cekPembayaranSchema),
    defaultValues: {
      user_email: "",
      user_phone: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      const res = await axiosInstance.get("/v1/api/pendaftaran", {
        params: {
          user_email: values.user_email,
          user_phone: values.user_phone,
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (!Array.isArray(data.data) || data.data.length === 0) {
        toast.error("Data tidak ditemukan.");
        return;
      }
      const pendaftaran = data.data.find(
        (d) =>
          d.user_email === form.getValues("user_email") &&
          d.user_phone === form.getValues("user_phone")
      );
      if (!pendaftaran) {
        toast.error("Data tidak ditemukan.");
        return;
      }
      setPaymentStatus(pendaftaran.status);
      if (pendaftaran.status === "PENDING_PAYMENT") {
        if (pendaftaran.snap_token) {
          window.snap.pay(pendaftaran.snap_token, {
            onSuccess: (result) => {
              window.location.href = `/pendaftaran/status?order_id=${result.order_id}`;
            },
            onPending: (result) => {
              window.location.href = `/pendaftaran/status?order_id=${result.order_id}`;
            },
            onError: (error) => {
              toast.error("Terjadi kesalahan saat memproses pembayaran.");
            },
          });
        } else {
          toast.error("Token pembayaran tidak ditemukan.");
        }
      } else if (pendaftaran.status === "PAID") {
        toast.success("Pembayaran sudah diselesaikan.");
      } else {
        toast.info(`Status pembayaran: ${pendaftaran.status}`);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
    },
  });

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={MIDTRANS_CLIENT_KEY}
      />
      <main>
        <section
          className="relative bg-cover bg-center bg-no-repeat pt-20 pb-36 text-white"
          style={{ backgroundImage: "url('/images/bg-pembayaran.jpg')" }}
        >
          <div className="absolute inset-0 bg-[#3EC1D3]/50 z-0" />
          <div className="relative z-10 container">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/pendaftaran"
                    className="text-white hover:text-[#FF165D]"
                  >
                    Pendaftaran
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#FF165D]">
                    Cek Pembayaran
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="pt-14">
              <h1 className="text-3xl md:text-6xl font-bold mb-4 leading-tight">
                Cek Status Pembayaran
              </h1>
              <p className="text-md md:text-lg text-gray-100">
                Cek status pembayaran Anda di sini. Pastikan semua data yang
                dimasukkan sudah benar.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-sm md:max-w-md mx-auto rounded-3xl shadow-xl p-10 my-8">
          <div className="flex flex-col gap-4 mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Status Pembayaran Peserta
            </h2>
            <p className="font-light text-md text-gray-600">
              Masukkan email dan nomer hp yang Anda daftarkan di formulir
              pendaftaran!
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => mutate(values))}
              className="flex flex-col gap-6 py-8"
            >
              <FormField
                control={form.control}
                name="user_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Aktif</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Hp</FormLabel>
                    <FormControl>
                      <Input placeholder="08..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? "Loading..." : "Cek Pembayaran"}
                </Button>
              </div>
            </form>
          </Form>
          {paymentStatus === "PAID" && (
            <div className="text-center">
              <Badge variant="default">Pembayaran Lunas</Badge>
            </div>
          )}
          {paymentStatus === "PENDING_PAYMENT" && (
            <div className="text-center">
              <Badge variant="destructive">Menunggu Pembayaran</Badge>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default CekPembayaranFeature;
