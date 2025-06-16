"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  MonitorSmartphone,
  User,
  BookOpenText,
  CreditCard,
  HandCoins,
} from "lucide-react";

const PanduanPenggunaFeature = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Membuka Sistem",
      icon: <MonitorSmartphone className="w-5 h-5" />,
      content: {
        heading: "Membuka Sistem Informasi",
        description:
          "Langkah pertama untuk memulai proses pendaftaran adalah mengakses sistem informasi melalui browser web Anda.",
        points: [
          "Buka browser web seperti Chrome, Firefox, atau Safari",
          "Ketik alamat website sistem informasi pada address bar",
          "Pastikan koneksi internet stabil untuk loading yang optimal",
          "Tunggu hingga halaman utama sistem berhasil dimuat sepenuhnya",
          "Pastikan Anda berada di halaman yang benar dengan memeriksa URL",
        ],
      },
    },
    {
      id: 2,
      title: "Menu Pendaftaran",
      icon: <User className="w-5 h-5" />,
      content: {
        heading: "Klik Menu Pendaftaran",
        description:
          "Setelah sistem terbuka, temukan dan klik menu pendaftaran untuk memulai proses pendaftaran kejuaraan.",
        points: [
          "Cari tombol atau menu 'Pendaftaran' di halaman utama",
          "Menu biasanya terletak di navbar atau bagian atas halaman",
          "Klik tombol 'Pendaftaran'",
          "Tunggu halaman pendaftaran terbuka dengan sempurna",
        ],
      },
    },
    {
      id: 3,
      title: "Mengisi Formulir",
      icon: <BookOpenText className="w-5 h-5" />,
      content: {
        heading: "Mengisi Formulir Pendaftaran",
        description:
          "Lengkapi semua field yang diperlukan dalam formulir pendaftaran dengan data yang akurat dan valid.",
        points: [
          "Isi nama lengkap sesuai dengan identitas resmi",
          "Masukkan alamat email yang aktif dan dapat diakses",
          "Isi kategori kejuaraan yang diinginkan",
          "Isi nomor telepon yang dapat dihubungi",
          "Lengkapi informasi tambahan seperti institusi, foto, atau data lain yang diminta",
          "Periksa kembali semua data sebelum melanjutkan ke tahap berikutnya",
        ],
      },
    },
    {
      id: 4,
      title: "Pilih Pembayaran",
      icon: <CreditCard className="w-5 h-5" />,
      content: {
        heading: "Pilih Metode Pembayaran",
        description:
          "Pilih metode pembayaran yang paling sesuai dan nyaman untuk menyelesaikan proses pendaftaran.",
        points: [
          "Pilih dari opsi metode pembayaran yang tersedia",
          "Metode biasanya meliputi: Transfer Bank, E-wallet, Kartu Kredit/Debit",
          "Perhatikan biaya admin untuk setiap metode pembayaran",
          "Pastikan Anda memiliki akses ke metode pembayaran yang dipilih",
          "Klik 'Lanjutkan' setelah memilih metode yang diinginkan",
        ],
      },
    },
    {
      id: 5,
      title: "Lakukan Pembayaran",
      icon: <HandCoins className="w-5 h-5" />,
      content: {
        heading: "Lakukan Pembayaran Sesuai Metode",
        description:
          "Selesaikan proses pembayaran sesuai dengan metode yang telah dipilih.",
        points: [
          "Ikuti instruksi pembayaran sesuai metode yang dipilih",
          "Untuk transfer bank: salin nomor rekening dan nominal yang tepat",
          "Untuk e-wallet: scan QR code atau masukkan nomor yang diberikan",
          "Untuk kartu kredit/debit: masukkan data kartu dengan benar",
          "Simpan bukti pembayaran untuk referensi",
          "Tunggu konfirmasi pembayaran dari sistem (biasanya 1x24 jam)",
          "Cek email untuk notifikasi aktivasi akun",
        ],
      },
    },
  ];

  const totalSteps = steps.length;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  const currentStepData = steps.find((step) => step.id === currentStep);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <section className="bg-[#3EC1D3] shadow-sm border-b">
        <div className="container py-16 md:py-32">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl md:text-6xl font-bold text-white">
                Panduan Penggunaan
              </h1>
              <p className="text-white mt-1 text-sm md:text-md">
                Ikuti langkah-langkah berikut untuk melakukan pendaftaran pada
                Kejuaraan Taekwondo UMS Open.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-white">
              <span>
                Langkah {currentStep} dari {totalSteps}
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#FF165D] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <h3 className="font-semibold mb-4">Daftar Langkah</h3>
              <nav className="space-y-2">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => goToStep(step.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                      currentStep === step.id
                        ? "bg-blue-50 border-blue-200 border text-[#3EC1D3]"
                        : currentStep > step.id
                        ? "bg-green-50 border-green-200 border text-green-700 hover:bg-green-100"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 ${
                        currentStep === step.id
                          ? "text-[#3EC1D3]"
                          : currentStep > step.id
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step.title}</div>
                      <div className="text-xs opacity-75">
                        Langkah {step.id}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {/* Step Header */}
              <div className="bg-gradient-to-r from-[#3EC1D3] to-[#0aa4b8] text-white p-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    {currentStepData?.icon}
                  </div>
                  <div>
                    <div className="text-sm opacity-90">
                      Langkah {currentStep}
                    </div>
                    <h2 className="text-2xl font-bold">
                      {currentStepData?.content.heading}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="p-8">
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {currentStepData?.content.description}
                </p>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Langkah-langkah Detail:
                  </h3>
                  {currentStepData?.content.points.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#3EC1D3]"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-[#3EC1D3] text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>

                {/* Tips Section */}
                <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">!</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-800">
                        Tips Penting
                      </h4>
                      <p className="text-yellow-700 mt-1">
                        Pastikan untuk mengikuti setiap langkah secara berurutan
                        untuk hasil yang optimal. Jika mengalami kesulitan,
                        jangan ragu untuk menghubungi tim support kami.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="px-6 md:px-8 py-4 md:py-6 bg-gray-50 border-t flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-4 md:px-6 py-1.5 md:py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-200 bg-white border border-gray-300"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden md:inline">Sebelumnya</span>
                </button>

                <div className="flex space-x-2">
                  {steps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => goToStep(step.id)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        currentStep === step.id
                          ? "bg-[#3EC1D3]"
                          : currentStep > step.id
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextStep}
                  disabled={currentStep === totalSteps}
                  className={`flex items-center space-x-2 px-4 md:px-6 py-1.5 md:py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === totalSteps
                      ? "bg-green-600 text-white cursor-default"
                      : "bg-[#3EC1D3] hover:bg-[#3EC1D3]/80 text-white"
                  }`}
                >
                  <span className="hidden md:inline">
                    {currentStep === totalSteps ? "Selesai" : "Selanjutnya"}
                  </span>
                  {currentStep !== totalSteps && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  {currentStep === totalSteps && <Check className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PanduanPenggunaFeature;
