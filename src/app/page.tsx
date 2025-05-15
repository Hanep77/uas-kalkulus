import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return <div>
    <header className="bg-[#043873] text-white">
      <nav className="max-w-screen-lg px-4 xl:px-0 h-16 m-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={"/logo.png"} alt="logo" width={500} height={500} className="w-8" />
          <h2 className="text-xl font-medium">FBP</h2>
        </div>
        <div className="flex items-center gap-2">
          <Link href={"/login"} className="bg-[#FFE492] hover:bg-[#FFE492] text-[#043873] py-2 px-4 rounded">Login</Link>
          <Link href={"/form"} className="bg-sky-500 hover:bg-sky-600 py-2 px-4 rounded hidden md:inline-block">Cek Keluarga</Link>
        </div>
      </nav>
    </header>

    <section id="hero" className="bg-[#043873] text-white" style={{ backgroundImage: "url(/Element.svg)", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
      <div className="min-h-[calc(100vh-64px)] 2xl:min-h-[768px] max-w-screen-lg px-4 xl:px-0 m-auto flex items-center justify-center gap-8 flex-col md:flex-row py-8 md:py-0">
        <div className="text-center md:text-start">
          <div className="bg-sky-500/50 border border-sky-500 text-sky-100 inline-block py-1 px-4 rounded-full mb-3 text-sm">
            <p>FBP = Family and Budget Planner</p>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-5 ">Ciptakan Keluarga Idealmu dari Sekarang!!</h1>
          <p className="italic mb-8">{`"Temukan tahapan membangun keluarga ideal dengan komunikasi, kepercayaan, dan kebahagiaan bersama"`}</p>
          <Link href={"/form"} className="bg-sky-500 hover:bg-sky-600 align-middle py-3 px-4 rounded">Coba Sekarang</Link>
        </div>
        <div className="w-60 sm:w-auto">
          <Image src={"/image-3.png"} alt="family illustration" width={500} height={500} />
        </div>
      </div>
    </section>

    <section className="min-h-screen 2xl:min-h-[768px] max-w-screen-lg px-4 xl:px-0 m-auto py-20">
      <div className="flex flex-col md:flex-row items-center mb-10 md:mb-20 gap-8">
        <div className="md:w-1/3 order-1">
          <Image src={"/image-1.png"} alt="family illustration" width={500} height={500} />
        </div>
        <div className="md:w-2/3 text-justify md:text-start md:order-2">
          <div style={{ backgroundImage: "url(/Element.svg)" }} className="mb-5">
            <h1 className="text-3xl md:text-5xl font-semibold">Ayo Cek Seberapa Ideal Keluargamu Sekarang!!</h1>
            <Image src={"/Vector.svg"} alt="family illustration" width={500} height={500} className="" />
          </div>
          <p className="mb-8">{`"Fitur ini dibuat untuk membantu kamu mengenali seberapa ideal kondisi keluargamu saat ini berdasarkan beberapa indikator sederhana, seperti penghasilan, jumlah anak, status pendidikan. Dengan hasil grafik yang mudah dipahami, kamu bisa melihat aspek mana yang sudah baik dan apa saja yang masih perlu ditingkatkan demi terciptanya keluarga yang harmonis dan bahagia."`}</p>
          <Link href={"/form"} className="bg-sky-500 hover:bg-sky-600 text-white align-middle py-3 px-4 rounded">Coba Sekarang</Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <p className="mb-8">{`"Setiap keluarga punya cerita, yuk kenali seberapa ideal keluargamu hari ini dan jadikan keluargamu lebih baik."`}</p>
          <Link href={"/form"} className="bg-sky-500 hover:bg-sky-600 text-white align-middle py-3 px-4 rounded">Coba Sekarang</Link>
        </div>
        <div className="md:w-1/2">
          <Image src={"/image-2.png"} alt="family illustration" width={500} height={500} />
        </div>
      </div>
    </section>

    <section id="hero" className="bg-[#043873] text-white pt-8" style={{ backgroundImage: "url(/Element.svg)", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
      <h1 className="text-3xl font-semibold text-center">Anggota</h1>
      <div className="max-w-screen-lg px-4 xl:px-0 m-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-8">
        <div className="bg-zinc-100/30 px-4 pt-4 rounded flex items-end">
          <Image src={"/img/dwi.png"} alt="dwi" width={500} height={500} />
        </div>
        <div className="bg-zinc-100/30 px-4 pt-4 rounded flex items-end">
          <Image src={"/img/yudis.png"} alt="yudis" width={500} height={500} />
        </div>
        <div className="bg-zinc-100/30 px-4 pt-4 rounded flex items-end">
          <Image src={"/img/rangga.png"} alt="rangga" width={500} height={500} />
        </div>
        <div className="bg-zinc-100/30 px-4 pt-4 rounded flex items-end">
          <Image src={"/img/adi.png"} alt="adi" width={500} height={500} />
        </div>
        <div className="bg-zinc-100/30 px-4 pt-4 rounded flex items-end">
          <Image src={"/img/aziz.png"} alt="aziz" width={500} height={500} />
        </div>
      </div>
    </section>
  </div>
}
