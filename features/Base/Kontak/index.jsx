"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BgKontak from "@/public/images/bg-kontak.jpg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const contactFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  message: z.string().min(1, "Pesan tidak boleh kosong"),
});

const KontakFeature = () => {
  const ref = useRef(null);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const lastScrollY = useRef(0);
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values) => {
    const phoneNumber = "6281215199600";
    const whatsappMessage = `Halo, saya ${values.name}.\n\nEmail: ${values.email}\n\nPesan:\n${values.message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsScrolledDown(true);
      }
      if (
        currentScrollY < lastScrollY.current &&
        currentScrollY < window.innerHeight - 200
      ) {
        setIsScrolledDown(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      <section className="py-48 bg-[#3EC1D3]">
        <h1 className="text-[4rem] font-normal leading-none tracking-[-0.04em] text-white text-center">
          Hubungi Taekwondo UMS Open <br />
          Suarakan Semangat, Raih Prestasi Bersama!
        </h1>
      </section>

      <section className="bg-[#3EC1D3] pb-80">
        <div
          className={`h-screen transition-all duration-500 ease-in-out ${
            isScrolledDown ? "w-full" : "container"
          }`}
        >
          <div
            className={`w-full h-full overflow-hidden relative transition-all duration-500 ease-in-out ${
              isScrolledDown ? "" : "rounded-[80px]"
            }`}
          >
            <Image
              src={BgKontak}
              alt="Kontak img"
              fill
              className="object-cover"
              priority
            />
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: -100 }}
              animate={
                isScrolledDown ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex items-center"
            >
              <div className="container">
                <h2 className="text-black text-[4rem] font-normal leading-none tracking-[-0.04em]">
                  Saran dan kritikan <span className="italic">Anda</span> <br />
                  adalah <span className="italic">motivasi</span> <br />
                  untuk kami <span className="italic">berbenah!</span>
                </h2>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container -mt-48">
        <div className="w-full p-6 bg-white shadow-2xl rounded-[80px] flex flex-col md:flex-row justify-between gap-4 md:gap-8">
          <div className="flex-1 flex flex-col gap-6 p-8">
            <h2 className="text-3xl font-bold">Kontak Kami</h2>
            <p className="font-light text-base leading-relaxed text-gray-500">
              Silahkan hubungi kami melalui informasi di bawah atau isi formulir
              di samping.
            </p>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5" />
              <span>taekwondo@ums.ac.id</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5" />
              <span>+62 812 15199 600</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5" />
              <span>Gedung Edutorium, UMS, Surakarta</span>
            </div>
          </div>
          <div className="flex-1 p-8">
            <h2 className="text-3xl font-bold mb-4">Formulir</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Anda</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama lengkap" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Alamat email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pesan Anda</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Tulis pesan Anda..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="xl"
                  className="bg-[#3EC1D3] hover:bg-[#36a9b9] cursor-pointer"
                >
                  Kirim
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <section className="py-8 container flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Lokasi Pertandingan</h2>
        <div className="w-full h-screen rounded-[80px] overflow-hidden shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4066.457052328288!2d110.7693499715107!3d-7.546644920152816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a159b81c99937%3A0xbc86d3085f357d67!2sGedung%20Edutorium%20KH.%20Ahmad%20Dahlan%20UMS%20%E2%80%94%20Universitas%20Muhammadiyah%20Surakarta!5e0!3m2!1sid!2sid!4v1746014558466!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
};

export default KontakFeature;
