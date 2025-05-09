import Image from "next/image";

const ProfilFeature = () => {
  return (
    <main>
      <section className="relative max-h-[100vh] h-[100vh] bg-[#3EC1D3]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
            <Image
              src="/images/hero-image.png"
              alt="hero img"
              width={500}
              height={500}
              className="md:w-[500px] md:h-[500px] w-[300px] h-[300px]"
            />
            <div className="flex flex-col gap-2 md:gap-6 text-center">
              <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold text-white max-w-[550px] mx-auto">
                Profil Kejuaraan Taekwondo UMS Open
              </h1>
              <p className="font-light text-white text-lg sm:text-xl md:text-2xl md:max-w-[343px] max-w-3xs mx-auto">
                Meningkatkan sportivitas dan prestasi atlet
              </p>
            </div>
          </div>
        </div>
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
        <div className="flex flex-col gap-4">
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
