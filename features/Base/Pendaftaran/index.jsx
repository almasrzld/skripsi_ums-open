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

const pendaftaranSchema = z.object({
  name: z.string().min(1, "Nama lengkap wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(10, "Nomor HP tidak valid"),
  category: z.string().min(1, "Kategori harus diisi"),
  institution: z.string().min(1, "Asal instansi wajib diisi"),
  message: z.string().optional(),
});

const PendaftaranFeature = () => {
  const form = useForm({
    resolver: zodResolver(pendaftaranSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
      institution: "",
      message: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Form Submitted:", values);
    // Arahkan ke API, WhatsApp, atau backend Anda
  };

  return (
    <main className="">
      {/* Header */}
      <section
        className="relative text-center bg-cover bg-center bg-no-repeat py-32 px-4 text-white"
        style={{ backgroundImage: "url('/images/bg-pendaftaran.jpg')" }}
      >
        {/* Overlay gelap */}
        <div className="absolute inset-0 bg-[#3EC1D3]/50 z-0" />

        {/* Konten header */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Daftar Kejuaraan Taekwondo UMS Open
          </h1>
          <p className="text-lg text-gray-100">
            Bergabunglah dalam ajang kompetisi bergengsi dan tunjukkan kemampuan
            terbaikmu!
          </p>
        </div>
      </section>

      {/* Formulir */}
      <section className="container py-8">
        <h2 className="text-3xl font-semibold mb-6">Formulir Pendaftaran</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Arya Wibowo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="+62..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institution"
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
              name="category"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Kategori Kejuaraan</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Under 55kg Putra" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
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
              >
                Kirim Pendaftaran
              </Button>
            </div>
          </form>
        </Form>
      </section>

      {/* Informasi Tambahan */}
      <section className="container space-y-8">
        <h2 className="text-3xl font-semibold">Informasi Penting</h2>
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

      {/* Timeline Kejuaraan */}
      <section className="container pt-8 space-y-8">
        <h2 className="text-3xl font-semibold">Timeline Kejuaraan</h2>
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

      {/* FAQ */}
      <section className="container space-y-8 py-8">
        <h2 className="text-3xl font-semibold">FAQ (Pertanyaan Umum)</h2>
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
  );
};

export default PendaftaranFeature;
