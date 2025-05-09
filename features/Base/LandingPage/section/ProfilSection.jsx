import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProfilSection = () => {
  return (
    <section className="container">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Profil</h2>
        <Button className="cursor-pointer">
          <Link href="/profil">Selengkapnya</Link>
        </Button>
      </div>
      <p className="mt-4 font-light text-md">
        Taekwondo Universitas Muhammadiyah Surakarta (UMS) merupakan Unit
        Kegiatan Mahasiswa (UKM) yang menjadi wadah pengembangan minat dan bakat
        mahasiswa dalam seni bela diri Taekwondo. UKM ini tidak hanya berfokus
        pada peningkatan kemampuan teknik, tetapi juga membentuk karakter
        melalui nilai-nilai kedisiplinan, tanggung jawab, dan sportivitas.
        Dengan dukungan pelatih profesional dan program latihan terstruktur,
        Taekwondo UMS aktif mencetak atlet berprestasi yang tampil di berbagai
        kejuaraan tingkat regional dan nasional. Selain itu, UKM ini turut
        berkontribusi dalam kehidupan kampus melalui pelatihan dasar, seminar,
        serta demonstrasi bela diri, menjadikannya sebagai sarana pembinaan
        mahasiswa yang tangguh secara fisik, mental, dan berjiwa kompetitif.
      </p>
    </section>
  );
};

export default ProfilSection;
