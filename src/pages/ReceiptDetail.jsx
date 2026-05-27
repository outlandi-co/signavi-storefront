import { useParams } from "react-router-dom"

export default function ReceiptDetail() {
  const { id } = useParams()

  return (
    <main className="min-h-screen bg-[#020617] p-10 text-white">
      <h1 className="text-4xl font-black">
        Receipt Detail
      </h1>

      <p className="mt-4 text-slate-400">
        Receipt ID: {id}
      </p>
    </main>
  )
}