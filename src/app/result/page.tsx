"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";

type KebutuhanPokokType = {
  id: number,
  komoditas_id: number,
  nama: string,
  persentasi: string,
  kategori: string,
  tahun: number,
  nilai_rupiah: number,
  jumlah_anggota_keluarga: number,
  total_harga: number,
}

type BerdasarkanJumlahType = {
  fleksibel: number,
  jumlah_anggota_keluarga: number,
  kebutuhan_pokok: number,
  kebutuhan_pokok_per_orang: number,
  note: string,
  pendapatan: number,
  saving: number,
  total_kebutuhan: number,
}


type BerdasarkanPendapatanType = {
  kebutuhan_pokok_per_orang: number,
  note: string,
  pendapatan: number,
  total_kebutuhan: number,
  maximal: {
    kebutuhan_pokok: number,
    fleksibel: number,
    saving: number,
    jumlah_anggota_keluarga: number,
  },
  rekomendasi: {
    rekomendasi_kebutuhan_pokok: number,
    rekomendasi_fleksibel: number,
    rekomendasi_saving: number,
    rekomendasi_jumlah_anggota_keluarga: number,
  }
}

export default function Result() {
  const [kebutuhanPokok, setKebutuhanPokok] = useState<KebutuhanPokokType[]>();
  const [berdasarkanJumlah, setBerdasarkanJumlah] = useState<BerdasarkanJumlahType>();
  const [berdasarkanPendapatan, setBerdasarkanPendapatan] = useState<BerdasarkanPendapatanType>();

  const data = [
    ["Task", "IDR"],
    ["Pangan", 900000],
    ["Perumahan", 500000],
    ["Aneka barang dan jasa", 200000],
  ];

  const options = {
    tooltip: {},
  };

  const formatToIDR = (amount?: number) => {
    const formatted = amount?.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR'
    });
    return formatted;
  }

  useEffect(() => {
    const stringData = localStorage.getItem("data");
    if (!stringData) return
    const data = JSON.parse(stringData);
    console.log(data);
    setKebutuhanPokok(data.kebutuhan_pokok);
    setBerdasarkanJumlah(data.rekomendasi_keuangan.berdasarkan_jumlah_anggota_keluarga);
    setBerdasarkanPendapatan(data.rekomendasi_keuangan.berdasarkan_pendapatan);
  }, []);

  return <div className="">
    <div className="max-w-screen-lg px-4 xl:px-0 m-auto py-4">
      <h2 className="text-3xl font-bold mb-3">Hasil</h2>
      <div>
        <div className="p-4 border border-zinc-300 mb-4 rounded bg-zinc-100 text-zinc-700 flex justify-between">
          <div className="mb-3">
            <h4 className="text-xl font-bold mb-1">Informasi Sekarang</h4>
            <p><span className="font-medium">Pendapatan</span>: {formatToIDR(berdasarkanJumlah?.pendapatan)}</p>
            <p><span className="font-medium">Anggota Keluarga</span>: {berdasarkanJumlah?.jumlah_anggota_keluarga} orang</p>
          </div>
          {/* <div> */}
          {/*   <h4 className="text-xl font-bold mb-1">Analisis Pengeluaran</h4> */}
          {/*   <p><span className="font-medium">Pengeluaran Ideal</span>: IDR 5.000.000</p> */}
          {/* </div> */}
        </div>
        <div className="p-4 border border-zinc-300 mb-4 rounded bg-zinc-100 text-zinc-700 flex justify-between">
          <div className="mb-3 flex flex-col gap-1">
            <h4 className="text-xl font-bold mb-2">Rekomendasi keuangan berdasarkan jumlah anggota keluarga</h4>
            <div className="py-1 px-2 mb-2 bg-sky-300/30 border border-sky-700 rounded text-sky-900">
              <p className="italic">Note: Rekomendasi berdasarkan konsep pokok: 50%, fleksibel: 30%, saving: 20%</p>
            </div>
            <p><span className="font-medium">Fleksibel</span>: {formatToIDR(berdasarkanJumlah?.fleksibel)}</p>
            <p><span className="font-medium">Saving</span>: {formatToIDR(berdasarkanJumlah?.saving)}</p>
            <p><span className="font-medium">Kebutuhan Pokok Perorang</span>: {formatToIDR(berdasarkanJumlah?.kebutuhan_pokok_per_orang)}</p>
            <p><span className="font-medium">Kebutuhan Pokok</span>: {formatToIDR(berdasarkanJumlah?.kebutuhan_pokok)}</p>
            <p><span className="font-medium">Total Pendapatan Ideal</span>: {formatToIDR(berdasarkanJumlah?.total_kebutuhan)}</p>
          </div>
        </div>
        <div className="p-4 border border-zinc-300 rounded bg-zinc-100 text-zinc-700 flex justify-between">
          <div className="mb-3 flex flex-col gap-1">
            <h4 className="text-xl font-bold mb-2">Rekomendasi berdasarkan pendapatan</h4>
            <div className="py-1 px-2 mb-2 bg-sky-300/30 border border-sky-700 rounded text-sky-900">
              <p className="italic">Note: Rekomendasi berdasarkan konsep pokok: 50%, fleksibel: 30%, saving: 20%</p>
            </div>
            <p><span className="font-medium">Fleksibel</span>: {formatToIDR(berdasarkanPendapatan?.maximal.fleksibel)}</p>
            <p><span className="font-medium">Saving</span>: {formatToIDR(berdasarkanPendapatan?.maximal.saving)}</p>
            <p><span className="font-medium">Kebutuhan Pokok Perorang</span>: {formatToIDR(berdasarkanPendapatan?.kebutuhan_pokok_per_orang)}</p>
            <p><span className="font-medium">Kebutuhan Pokok</span>: {formatToIDR(berdasarkanPendapatan?.maximal.kebutuhan_pokok)}</p>
            <p><span className="font-medium">Jumlah Anggota Keluarga Ideal</span>: {berdasarkanPendapatan?.maximal.jumlah_anggota_keluarga}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h4 className="text-xl font-bold mb-3 text-zinc-700">Pie chart pengeluaran berdasarkan kategori</h4>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
      <div>
        <h4 className="text-xl font-bold mb-3 text-zinc-700">Tabel Detail Pengeluaran Kebutuhan Pokok</h4>
        <div className="bg-zinc-100 border border-zinc-300 rounded overflow-auto">
          <table className="table w-full text-sm text-left rtl:text-right">
            <thead className="">
              <tr>
                <th className="py-3 px-6">Nama</th>
                <th className="py-3 px-6">Kategori</th>
                <th className="py-3 px-6">Tahun</th>
                <th className="py-3 px-6">Jumlah Anggota</th>
                <th className="py-3 px-6">Nilai</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="text-zinc-600">
              {kebutuhanPokok?.map(item => (
                <tr className="" key={item.id}>
                  <td className="py-3 px-6 whitespace-nowrap">{item.nama}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{item.kategori}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{item.tahun}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{item.jumlah_anggota_keluarga}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{formatToIDR(item.nilai_rupiah)}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{formatToIDR(item.total_harga)}</td>
                  <td className="flex gap-2 py-3 px-6">
                    <Link href={"/dashboard/" + "/edit/"} className="text-yellow-500">edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

}
