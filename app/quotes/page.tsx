"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

type Quote = {
  id: number
  customerName: string
  total: number
  date: string
}

export default function QuoteList() {
  const [quotes] = useState<Quote[]>([
    { id: 1, customerName: "John Doe", total: 1000, date: "2023-05-01" },
    { id: 2, customerName: "Jane Smith", total: 1500, date: "2023-05-02" },
    { id: 3, customerName: "Bob Johnson", total: 2000, date: "2023-05-03" },
  ])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredQuotes = quotes.filter((quote) => quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Quote List</h1>
      <Input
        type="text"
        placeholder="Search by customer name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredQuotes.map((quote) => (
            <TableRow key={quote.id}>
              <TableCell>{quote.id}</TableCell>
              <TableCell>{quote.customerName}</TableCell>
              <TableCell>${quote.total.toFixed(2)}</TableCell>
              <TableCell>{quote.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

