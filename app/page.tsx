import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Quotation CMS Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/line-items">
          <Button className="w-full">Manage Line Items</Button>
        </Link>
        <Link href="/quotes/create">
          <Button className="w-full">Create New Quote</Button>
        </Link>
        <Link href="/quotes">
          <Button className="w-full">View All Quotes</Button>
        </Link>
      </div>
    </div>
  )
}

