"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, HelpCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { axiosUpload } from "@/libs/axios";
import { toast } from "sonner";
import Script from "next/script";
import { MIDTRANS_CLIENT_KEY } from "@/constants/config";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useGetKategori from "@/features/Dashboard/Kategori/hook/useGetKategori";

const pendaftaranSchema = z.object({
  user_name: z.string().min(1, "Nama lengkap wajib diisi"),
  user_email: z.string().email("Email tidak valid"),
  user_phone: z.string().min(10, "Nomor HP tidak valid"),
  categoryId: z.string().min(1, "Kategori kejuaraan wajib dipilih"),
  user_institution: z.string().min(1, "Asal instansi wajib diisi"),
  photo: z
    .any()
    .refine((file) => file instanceof File, "Foto wajib diupload")
    .refine(
      (file) =>
        file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type),
      "Format foto harus PNG, JPG, atau JPEG"
    )
    .refine(
      (file) => file && file.size <= 2 * 1024 * 1024,
      "Ukuran foto maksimal 2MB"
    ),
  user_message: z.string().optional(),
});

const PendaftaranFeature = () => {
  const { data: kategoriList } = useGetKategori();
  const form = useForm({
    resolver: zodResolver(pendaftaranSchema),
    defaultValues: {
      user_name: "",
      user_email: "",
      user_phone: "",
      categoryId: "",
      user_institution: "",
      photo: undefined,
      user_message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      formData.append("user_name", values.user_name);
      formData.append("user_email", values.user_email);
      formData.append("user_phone", values.user_phone);
      formData.append("categoryId", values.categoryId);
      formData.append("user_institution", values.user_institution);
      formData.append("user_message", values.user_message || "");
      formData.append("photo", values.photo);

      const res = await axiosUpload("/v1/api/pendaftaran", formData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      const token = data.data.snap_token;
      window.snap.pay(token, {
        onSuccess: (result) => {
          window.location.href = `/pendaftaran/status?order_id=${result.order_id}`;
        },
        onPending: (result) => {
          window.location.href = `/pendaftaran/status?order_id=${result.order_id}`;
        },
        onError: (error) => {
          toast.error("Pembayaran gagal, silakan coba lagi.");
        },
      });
      form.reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
      if (Array.isArray(error.response?.data?.errors)) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.message || `${err.path[0]} tidak valid`);
        });
      }
    },
  });

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={MIDTRANS_CLIENT_KEY}
      />
      <main className="">
        <section
          className="relative text-center bg-cover bg-center bg-no-repeat py-32 px-4 text-white"
          style={{ backgroundImage: "url('/images/bg-pendaftaran.jpg')" }}
        >
          <div className="absolute inset-0 bg-[#3EC1D3]/50 z-0" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-6xl font-bold mb-4 leading-tight">
              Daftar Kejuaraan Taekwondo UMS Open
            </h1>
            <p className="text-md md:text-lg text-gray-100">
              Bergabunglah dalam ajang kompetisi bergengsi dan tunjukkan
              kemampuan terbaikmu!
            </p>
          </div>
        </section>

        <section className="container py-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Formulir Pendaftaran
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => {
                console.log("values", values); // ⬅️ Tambahkan di sini untuk debug
                mutate(values);
              })}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <FormField
                control={form.control}
                name="user_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Almas Rizaldi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="user_institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asal Sekolah/Instansi</FormLabel>
                    <FormControl>
                      <Input placeholder="SMAN 1 Surakarta / UMS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori Kejuaraan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {kategoriList?.data.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Foto</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          onChange={(e) => {
                            field.onChange(e.target.files?.[0]);
                          }}
                          className="file:mr-4 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#3EC1D3]/20 file:text-[#3EC1D3] file:cursor-pointer text-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_message"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Pesan Tambahan (opsional)</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Tulis pertanyaan atau informasi tambahan..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-[#3EC1D3] hover:bg-[#36a9b9] w-full"
                  disabled={isPending}
                >
                  {isPending ? "Loading..." : "Daftar dan Lakukan Pembayaran"}
                </Button>
              </div>
            </form>
          </Form>
        </section>

        <section className="container space-y-8">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Informasi Penting
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Calendar className="inline-block w-5 h-5 mr-2" />
              Tanggal: 15-17 Juni 2025
            </li>
            <li>
              <Phone className="inline-block w-5 h-5 mr-2" />
              CP: +62 812 1519 9600 (Admin Kejuaraan)
            </li>
            <li>
              <Mail className="inline-block w-5 h-5 mr-2" />
              Email: taekwondo@ums.ac.id
            </li>
          </ul>
        </section>

        <section className="container pt-8 space-y-8">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Timeline Kejuaraan
          </h2>
          <ol className="border-l-2 border-[#3EC1D3] pl-4 space-y-4">
            <li>
              <strong>1 - 10 Juni:</strong> Pendaftaran Peserta
            </li>
            <li>
              <strong>12 Juni:</strong> Technical Meeting
            </li>
            <li>
              <strong>15 - 17 Juni:</strong> Pelaksanaan Kejuaraan
            </li>
            <li>
              <strong>17 Juni:</strong> Pengumuman & Penyerahan Medali
            </li>
          </ol>
        </section>

        <section className="container space-y-8 py-8">
          <h2 className="text-2xl md:text-3xl font-semibold">
            FAQ (Pertanyaan Umum)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">
                <HelpCircle className="inline w-4 h-4 mr-2" />
                Apakah harus memiliki sertifikat sabuk?
              </p>
              <p className="text-gray-600">
                Tidak wajib, namun disarankan untuk kategori kompetisi tertentu.
              </p>
            </div>
            <div>
              <p className="font-semibold">
                <HelpCircle className="inline w-4 h-4 mr-2" />
                Apakah biaya pendaftaran dikenakan?
              </p>
              <p className="text-gray-600">
                Ya, biaya pendaftaran sebesar Rp100.000 dibayarkan melalui
                rekening resmi panitia.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PendaftaranFeature;
