import Image from "next/image";
import DatetimeNow from "@/libs/datetime-utils";

const ProfilFeature = () => {
  return (
    <main>
      <section className="relative h-[75vh] bg-[#3EC1D3] text-white overflow-hidden">
        <div className="absolute inset-0 flex items-center container z-10">
          <div className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-8">
            <div className="flex flex-col gap-4 max-w-xl pt-14 md:pt-0">
              <h2 className="text-[#FF165D] text-sm font-semibold">
                Profil Kita
              </h2>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                MENINGKATKAN SPORTIVITAS DAN PRESTASI ATLET
              </h1>

              <div className="border-2 border-white p-4 rounded-lg w-full max-w-md mt-4">
                <div className="flex justify-between items-center text-sm text-white">
                  <span>Biaya pendaftaran</span>
                  <span className="border-2 border-white text-white px-3 py-1 rounded font-semibold">
                    Rp 50.000
                  </span>
                </div>
              </div>
            </div>

            <div className="relative w-full md:w-full h-80 md:h-full flex justify-center md:justify-end">
              <Image
                src="/images/bg-profil.png"
                alt="Taekwondo Fighter"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 md:-translate-x-[37%] -translate-y-1/2 text-6xl md:text-[250px] font-extrabold text-white/15 whitespace-nowrap blur-xs select-none">
          UMS OPEN
        </div>
        <div className="absolute top-[56%] left-[11%] w-80 h-1 bg-white hidden md:block" />
        <div className="absolute top-[52%] md:top-[54%] left-1/2 md:left-[33%] -translate-x-1/2 md:translate-x-0">
          <p className="text-md text-white">
            <DatetimeNow />
          </p>
        </div>
        <div className="absolute bottom-[25%] md:top-[15%] right-[80%] md:left-[80%] w-12 md:w-14 h-12 md:h-14 border-8 border-[#FF165D] rotate-45" />
        <div className="absolute bottom-[35%] right-[8%] md:right-[4%] w-14 md:w-16 h-14 md:h-16 border-8 border-[#FF165D] rotate-45" />
        <div className="absolute top-[25%] md:top-[35%] left-[80%] md:left-[45%] w-8 md:w-12 h-8 md:h-12 border-8 border-[#FF165D] rounded-full" />
      </section>

      <section className="container py-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Tentang Kejuaraan</h2>
          <p className="font-light text-md">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
            dicta eum saepe voluptas doloribus, labore sapiente iusto architecto
            temporibus, repellendus, iure aliquid necessitatibus illo eveniet.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe cum
            nihil, soluta ullam modi similique eos debitis unde eveniet!
            Doloremque fuga iste dolorum? Nisi fuga explicabo consectetur optio
            maiores voluptatum dolore accusamus ducimus totam necessitatibus ea,
            voluptates sapiente iusto debitis itaque vel possimus perspiciatis
            tempora. Vitae quaerat harum reiciendis modi.
          </p>
        </div>
      </section>
      <section className="container">
        <div className="flex flex-col gap-4 text-white">
          <h2 className="text-3xl font-bold">Visi & Misi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex flex-col bg-[#FF9A00] p-20 text-center gap-2 rounded-2xl shadow-md">
              <h3 className="font-semibold text-xl">Visi</h3>
              <p className="font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                deserunt quis id possimus impedit, pariatur repellendus fugit
                nisi error voluptas numquam dignissimos molestias ab rerum
                suscipit. Ea et quibusdam libero accusantium? Autem nihil quidem
                ducimus, nemo odit numquam assumenda similique nostrum
                cupiditate voluptatibus qui alias necessitatibus animi
                repudiandae tempora ut?
              </p>
            </div>
            <div className="flex flex-col bg-[#FF9A00] p-20 text-center gap-2 rounded-2xl shadow-md">
              <h3 className="font-semibold text-xl">Misi</h3>
              <p className="font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                deserunt quis id possimus impedit, pariatur repellendus fugit
                nisi error voluptas numquam dignissimos molestias ab rerum
                suscipit. Ea et quibusdam libero accusantium? Autem nihil quidem
                ducimus, nemo odit numquam assumenda similique nostrum
                cupiditate voluptatibus qui alias necessitatibus animi
                repudiandae tempora ut?
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilFeature;
