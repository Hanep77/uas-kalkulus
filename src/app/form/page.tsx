"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

interface InputType {
  pendapatan: number,
  jumlah_anggota: number,
  tahun: number,
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data: InputType = {
      pendapatan: Number(formData.get("jumlah_pendapatan")),
      jumlah_anggota: Number(formData.get("jumlah_anggota")),
      tahun: Number(formData.get("tahun")),
    };

    try {
      setIsLoading(true);
      const response = await axios.post("https://family-flow-lilac.vercel.app/api/v1/simulation", data);
      if (response.status == 200) {
        localStorage.setItem("data", JSON.stringify(response.data.data));
        router.push("/result");
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  }

  return <div className="min-h-screen flex justify-center items-center">
    <div className="max-w-screen-lg px-4 xl:px-0 m-auto flex flex-col md:flex-row gap-12">
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold mb-3">Penasaran  Seberapa Ideal Keluargamu?</h2>
        <p className="text-justify text-zinc-700">Mulai sekarang, cukup isi beberapa informasi sederhan
          tentang keluarga kamu, dan biarkan IdealKeluarga
          membantumu melihat gambaran ideal versi terbaiknya.
          Jadikan ini kesempatan untuk lebih memahami
          keluarga tercinta dan wujudkan keseimbangan dalam
          kehidupan bersama!”</p>
      </div>
      <div className="md:w-1/2">
        <form onSubmit={handleForm} className="flex flex-col gap-3">
          <div className="flex flex-col">
            <input
              type="number"
              id="jumlah_pendapatan"
              placeholder="jumlah pendapatan"
              name="jumlah_pendapatan"
              className="bg-zinc-200 h-10 px-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              id="jumlah_anggota"
              placeholder="jumlah anggota"
              name="jumlah_anggota"
              className="bg-zinc-200 h-10 px-2 rounded"
              required
            />
          </div>
          {/* <div className="flex flex-col"> */}
          {/*   <input */}
          {/*     type="number" */}
          {/*     id="tahun" */}
          {/*     placeholder="tahun" */}
          {/*     name="tahun" */}
          {/*     className="bg-zinc-200 h-10 px-2 rounded" */}
          {/*     required */}
          {/*   /> */}
          {/* </div> */}
          <button type="submit" className="flex justify-center gap-2 items-center h-10 bg-[#043873] cursor-pointer text-white w-full rounded">
            submit
            <div className={`${!isLoading && "hidden"} h-6 w-6 border-2 rounded-full border-x-transparent animate-spin`}></div>
          </button>
        </form>
      </div>
    </div>
  </div>
}
