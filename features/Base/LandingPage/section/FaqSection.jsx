"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  return (
    <section className="container py-8">
      <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Siapa saja yang bisa mengikuti kejuaraan ini?
          </AccordionTrigger>
          <AccordionContent>
            Kejuaraan ini terbuka untuk peserta dari seluruh Indonesia, baik
            individu maupun perwakilan klub/instansi.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Bagaimana cara mendaftar?</AccordionTrigger>
          <AccordionContent>
            Pendaftaran dilakukan melalui tombol “Daftar Sekarang” di halaman
            utama atau melalui link formulir online yang disediakan.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Apakah ada biaya pendaftaran?</AccordionTrigger>
          <AccordionContent>
            Ya, biaya pendaftaran berbeda tergantung kategori. Detailnya
            tersedia di halaman pendaftaran.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Di mana lokasi pertandingan?</AccordionTrigger>
          <AccordionContent>
            Pertandingan dilaksanakan di Gedung Edutorium UMS – Universitas
            Muhammadiyah Surakarta.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            Apakah peserta mendapatkan sertifikat?
          </AccordionTrigger>
          <AccordionContent>
            Semua peserta akan mendapatkan e-sertifikat. Juara berhak atas
            sertifikat, trofi, dan hadiah.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>
            Siapa yang bisa dihubungi jika saya punya pertanyaan lain?
          </AccordionTrigger>
          <AccordionContent>
            Hubungi kami melalui halaman Kontak atau WhatsApp resmi panitia:
            08xxxxxxxxxx.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FaqSection;
