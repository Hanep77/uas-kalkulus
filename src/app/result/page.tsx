"use client";

import axios from "axios";
import { Chart as ChartJS, Legend, Tooltip, ArcElement, Title, BarElement, LinearScale, CategoryScale } from "chart.js";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { RiGeminiFill } from "react-icons/ri";
import Chats from "../components_/chats";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const options = {
  responsive: true,
  maintainAspectRatio: true,
}

type KebutuhanKapitaType = {
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
  total_kebutuhan: number,
  kebutuhan_kapita_per_orang: number,
  note: string,
  pendapatan: number,
  saving: number,
  total_kebutuhan_kapita: number,
}


type BerdasarkanPendapatanType = {
  kebutuhan_kapita_per_orang: number,
  note: string,
  pendapatan: number,
  total_kebutuhan_kapita: number,
  fleksibel: number,
  saving: number,
  total_kebutuhan: number,
  jumlah_anggota_keluarga: number,
}

export default function Result() {
  const [kebutuhanKapita, setKebutuhanKapita] = useState<KebutuhanKapitaType[]>();
  const [berdasarkanJumlah, setBerdasarkanJumlah] = useState<BerdasarkanJumlahType>();
  const [berdasarkanPendapatan, setBerdasarkanPendapatan] = useState<BerdasarkanPendapatanType>();
  const [, setKategoriKomoditas] = useState<Record<string, string | number>[]>([]);
  const [data, setData] = useState({
    labels: ["test"],
    datasets: [
      {
        label: 'IDR',
        data: [1],
        backgroundColor: [
          'red',
          'green',
          'blue',
          'yellow',
          'purple',
          'gray',
          'orange',
        ],
        borderWidth: 1,
      },
    ],
  });
  const [dataBarChart, setDataBarChart] = useState({
    labels: ['2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Garis Kemiskinan (per-orang)',
        data: [498711, 537497, 565377, 576176],
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Pendapatan Anda',
        data: [, , , 5000000,],
        backgroundColor: 'rgba(53, 162, 235, 1)',
      },
      {
        label: 'Pendapatan Ideal',
        data: [, , , 5000000,],
        backgroundColor: 'lightgreen',
      },
    ]
  });
  const [chatBot, setChatBot] = useState<{ role: string, text: string }[]>([{ role: "user", text: "bisa kah kamu bantu saya mengenai hal ini?" }]);
  const [isLoading, setIsLoading] = useState(false);

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

    const dataKategoriKomoditas = data.kebutuhan_kapita.reduce((acc: Record<string, number>, item: KebutuhanKapitaType) => {
      if (!acc[item.kategori]) {
        acc[item.kategori] = 0
      }
      acc[item.kategori] += item.nilai_rupiah
      return acc
    }, {} as Record<string, number>)

    const chat = async () => {
      const chatData = [{ role: "user", text: "bisa kah kamu bantu saya mengenai hal ini?" }];
      try {
        setIsLoading(true);
        const chatResponse = await axios.post("https://family-flow-lilac.vercel.app/api/v1/chat", chatData);
        if (chatResponse.status == 200) {
          setChatBot(prev => [...prev, chatResponse.data.data]);
          console.log(chatResponse.data.data);
        }
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    }
    chat();

    const labels = Object.keys(dataKategoriKomoditas);
    const nilaiDataset = labels.map(label => dataKategoriKomoditas[label]);

    setData({
      labels: labels,
      datasets: [
        {
          label: 'IDR',
          data: nilaiDataset,
          backgroundColor: [
            'red',
            'green',
            'blue',
            'yellow',
            'purple',
            'gray',
            'orange',
          ],
          borderWidth: 1,
        },
      ],
    });

    setDataBarChart(prev => {
      const pendapatan_sekarang = data.rekomendasi_keuangan.berdasarkan_jumlah_anggota_keluarga.pendapatan;
      const ideal = data.rekomendasi_keuangan.berdasarkan_jumlah_anggota_keluarga.total_kebutuhan;
      const updatedDatasets = prev.datasets.map((ds, i) => {
        if (i === 1 || i === 2) {
          const updatedData = [...ds.data];
          updatedData[3] = i === 1 ? pendapatan_sekarang : ideal;

          return {
            ...ds,
            data: updatedData,
          };
        }

        return ds;
      });

      return {
        ...prev,
        datasets: updatedDatasets,
      };
    });

    setKategoriKomoditas(dataKategoriKomoditas);

    setKebutuhanKapita(data.kebutuhan_kapita);
    setBerdasarkanJumlah(data.rekomendasi_keuangan.berdasarkan_jumlah_anggota_keluarga);
    setBerdasarkanPendapatan(data.rekomendasi_keuangan.berdasarkan_pendapatan);
  }, []);

  const submitMessage = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      role: "user",
      text: String(formData.get("chat"))
    }

    setChatBot(prev => [...prev, data]);
    (event.target as HTMLFormElement).chat.value = "";

    try {
      setIsLoading(true);
      const response = await axios.post("https://family-flow-lilac.vercel.app/api/v1/chat", [data]);
      if (response.status == 200) {
        setChatBot(prev => [...prev, response.data.data]);
        console.log(response);
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  }

  return <div className="">
    <div className="max-w-screen-lg px-4 xl:px-0 m-auto py-4">
      {/* <h2 className="text-3xl font-bold mb-3">Hasil</h2> */}
      <div>
        <div className="p-4 border border-zinc-300 mb-4 rounded bg-zinc-100 text-zinc-700 flex flex-col">
          <div className="mb-3">
            <h4 className="text-xl font-bold mb-1">Informasi Sekarang</h4>
            <p><span className="font-medium">Pendapatan</span>: {formatToIDR(berdasarkanJumlah?.pendapatan)}</p>
            <p><span className="font-medium">Anggota Keluarga</span>: {berdasarkanJumlah?.jumlah_anggota_keluarga} orang</p>
          </div>

          <div className="border border-zinc-300 bg-zinc-200/50 rounded">
            <div className="border-b border-zinc-300 flex gap-2 items-center p-4">
              <RiGeminiFill />
              <h5 className="font-medium">Konsultasi dengan AI</h5>
            </div>
            <Chats chatBot={chatBot} isLoading={isLoading} />
            <form onSubmit={submitMessage} className="p-4">
              <div className="border border-zinc-300 rounded-full flex">
                <input type="text" name="chat" className="text-start py-2 px-4 w-full outline-none" />
                <button type="submit" className="bg-blue-700 hover:bg-blue-600 active:bg-blue-500 text-white py-2 px-4 rounded-full">send</button>
              </div>
            </form>
          </div>

        </div>
        <div className="p-4 border border-zinc-300 mb-4 rounded bg-zinc-100 text-zinc-700 flex justify-between">
          <div className="mb-3 flex flex-col gap-1 items-start">
            <h4 className="text-xl font-bold mb-2">Rekomendasi keuangan berdasarkan jumlah anggota keluarga</h4>
            <div className="py-1 px-2 mb-2 bg-sky-300/30 border border-sky-700 rounded text-sky-900 text-sm">
              <p className="italic">Note: {berdasarkanJumlah?.note}</p>
            </div>
            <p><span className="font-medium">Fleksibel</span>: {formatToIDR(berdasarkanJumlah?.fleksibel)}</p>
            <p><span className="font-medium">Saving</span>: {formatToIDR(berdasarkanJumlah?.saving)}</p>
            <p><span className="font-medium">Kebutuhan Kapita Perorang</span>: {formatToIDR(berdasarkanJumlah?.kebutuhan_kapita_per_orang)}</p>
            <p><span className="font-medium">Kebutuhan Kapita</span>: {formatToIDR(berdasarkanJumlah?.total_kebutuhan_kapita)}</p>
            <p><span className="font-medium">Total Pendapatan Ideal</span>: {formatToIDR(berdasarkanJumlah?.total_kebutuhan)}</p>
          </div>
        </div>
        <div className="p-4 border border-zinc-300 rounded bg-zinc-100 text-zinc-700 flex justify-between">
          <div className="mb-3 flex flex-col gap-1 items-start">
            <h4 className="text-xl font-bold mb-2">Rekomendasi berdasarkan pendapatan</h4>
            <div className="py-1 px-2 mb-2 bg-sky-300/30 border border-sky-700 rounded text-sky-900 text-sm">
              <p className="italic">Note: {berdasarkanPendapatan?.note}</p>
            </div>
            <p><span className="font-medium">Fleksibel</span>: {formatToIDR(berdasarkanPendapatan?.fleksibel)}</p>
            <p><span className="font-medium">Saving</span>: {formatToIDR(berdasarkanPendapatan?.saving)}</p>
            <p><span className="font-medium">Kebutuhan Kapita Perorang</span>: {formatToIDR(berdasarkanPendapatan?.kebutuhan_kapita_per_orang)}</p>
            <p><span className="font-medium">Kebutuhan Kapita</span>: {formatToIDR(berdasarkanPendapatan?.total_kebutuhan_kapita)}</p>
            <p><span className="font-medium">Jumlah Anggota Keluarga Ideal</span>: {berdasarkanPendapatan?.jumlah_anggota_keluarga}</p>
          </div>
        </div>
      </div>
      <div className="my-8 text-center bg-zinc-100 p-4 border border-zinc-300 rounded">
        <div className="flex flex-col md:flex-row md:justify-evenly items-center pb-10 md:pb-0">
          <div className="w-full sm:w-96 mb-10 md:mb-0">
            <h4 className="text-xl font-bold mb-3 text-zinc-700">Pie chart pengeluaran berdasarkan kategori</h4>
            {data &&
              <Pie data={data} options={options} />
            }
          </div>
          <div className="w-full h-80 md:w-96 md:h-96">
            <h4 className="text-xl font-bold mb-3 text-zinc-700">Chart garis kemiskinan</h4>
            {dataBarChart &&
              <Bar data={dataBarChart} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }} />
            }
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-3 text-zinc-700">Pengeluaran Perkapita Berdasarkan Komoditas Tahun 2025</h4>
        <div className="px-2 border-s-2 border-zinc-500 text-sm italic text-zinc-500 mb-3">
          <p>Note: Data dibawah dibuat berdasarkan data 2023 yang disesuaikan dengan inflasi tahunan</p>
        </div>
        <div className="px-2 border-s-2 border-zinc-500 text-sm italic text-zinc-500 mb-3">
          <p>Note: Jika merasa aneh dengan tabel dibawah kaerna merasa tidak relevan, silahkan salahkan BPS</p>
        </div>
        <div className="bg-zinc-100 border border-zinc-300 rounded overflow-auto">
          <table className="table w-full text-sm text-left rtl:text-right">
            <thead className="">
              <tr>
                <th className="py-3 px-6">Nama</th>
                <th className="py-3 px-6">Kategori</th>
                <th className="py-3 px-6">Jumlah Anggota</th>
                <th className="py-3 px-6">Nilai</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="text-zinc-600">
              {kebutuhanKapita?.map(item => (
                <tr className="" key={item.id}>
                  <td className="py-3 px-6 whitespace-nowrap">{item.nama}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{item.kategori}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{item.jumlah_anggota_keluarga}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{formatToIDR(item.nilai_rupiah)}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{formatToIDR(item.total_harga)}</td>
                  <td className="flex gap-2 py-3 px-6">
                    <Link href={"/dashboard/" + "/edit/"} className="bg-yellow-300 hover:bg-yellow-300/70 border border-yellow-700 px-2 rounded-full text-yellow-700">edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-2 border-s-2 border-zinc-500 text-sm italic text-zinc-500 mt-3">
          <p>source: BPS, Survei Sosial Ekonomi Nasional (Susenas) Maret 2022 dan Maret 2023/BPS-Statistics Indonesia, National
            Socioeconomic Survey March 2022 and March 2023</p>
        </div>
      </div>
    </div>
  </div >
}
