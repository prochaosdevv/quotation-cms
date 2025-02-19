"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { Label } from "@/components/ui/label"
import Link from "next/link"

type LineItem = {
  code: string
  category: string
  description: string
  unit: string
  labour: number
  material: string
  plant: string
  publication_price: number
  quantity: number
}

type CustomerInfo = {
  name: string
  email: string
  phone: string
  address: string
}

export default function CreateQuote() {
  const [quoteItems, setQuoteItems] = useState<LineItem[]>([])
  const [availableItems] = useState<LineItem[]>([
    {
      code: "CK.01.100.017",
      category: "Possession Staff",
      description: "Possession Planner",
      unit: "hr",
      labour: 40,
      material: "",
      plant: "",
      publication_price: 40,
      quantity: 0,
    },
    {
      code: "CK.01.100.018",
      category: "Possession Staff",
      description: "Possession Manager",
      unit: "hr",
      labour: 50,
      material: "",
      plant: "",
      publication_price: 50,
      quantity: 0,
    },
    {
      code: "CK.01.100.019",
      category: "Equipment",
      description: "Excavator",
      unit: "day",
      labour: 0,
      material: "",
      plant: "500",
      publication_price: 500,
      quantity: 0,
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [discount, setDiscount] = useState(0)
  const [tax, setTax] = useState(0)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const addItemToQuote = (item: LineItem) => {
    const existingItem = quoteItems.find((i) => i.code === item.code)
    if (existingItem) {
      setQuoteItems(quoteItems.map((i) => (i.code === item.code ? { ...i, quantity: i.quantity + 1 } : i)))
    } else {
      setQuoteItems([...quoteItems, { ...item, quantity: 1 }])
    }
  }

  const updateItemQuantity = (code: string, quantity: number) => {
    setQuoteItems(quoteItems.map((item) => (item.code === code ? { ...item, quantity } : item)))
  }

  const calculateSubtotal = () => {
    return quoteItems.reduce((total, item) => total + item.publication_price * item.quantity, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const discountAmount = subtotal * (discount / 100)
    const taxAmount = (subtotal - discountAmount) * (tax / 100)
    return subtotal - discountAmount + taxAmount
  }

  const saveQuote = () => {
    // Here you would typically save the quote to your backend
    console.log("Saving quote:", { quoteItems, customerInfo, discount, tax })
    alert("Quote saved successfully!")
  }

  const exportQuote = () => {
    const doc = new jsPDF()
    doc.text("Quote", 14, 15)

    // Add customer information
    doc.setFontSize(12)
    doc.text(`Customer: ${customerInfo.name}`, 14, 25)
    doc.text(`Email: ${customerInfo.email}`, 14, 32)
    doc.text(`Phone: ${customerInfo.phone}`, 14, 39)
    doc.text(`Address: ${customerInfo.address}`, 14, 46)

    const tableColumn = ["Code", "Description", "Unit", "Price", "Quantity", "Total"]
    const tableRows = quoteItems.map((item) => [
      item.code,
      item.description,
      item.unit,
      `$${item.publication_price.toFixed(2)}`,
      item.quantity,
      `$${(item.publication_price * item.quantity).toFixed(2)}`,
    ])

    // @ts-ignore
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 55,
    })

    const finalY = (doc as any).lastAutoTable.finalY || 55

    const subtotal = calculateSubtotal()
    const discountAmount = subtotal * (discount / 100)
    const taxAmount = (subtotal - discountAmount) * (tax / 100)
    const total = calculateTotal()

    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 14, finalY + 10)
    doc.text(`Discount (${discount}%): $${discountAmount.toFixed(2)}`, 14, finalY + 20)
    doc.text(`Tax (${tax}%): $${taxAmount.toFixed(2)}`, 14, finalY + 30)
    doc.text(`Total: $${total.toFixed(2)}`, 14, finalY + 40)

    doc.save("quote.pdf")
  }

  const filteredItems = availableItems.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Create Quote</h1>
        <Link href="/quotes">
          <Button variant="outline">Back to Quotes</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Customer Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Name</Label>
              <Input
                id="customerName"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone</Label>
              <Input
                id="customerPhone"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerAddress">Address</Label>
              <Input
                id="customerAddress"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Quote Items</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quoteItems.map((item) => (
                <TableRow key={item.code}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>${item.publication_price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItemQuantity(item.code, Number.parseInt(e.target.value))}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>${(item.publication_price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4">Add Item</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add Item to Quote</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2"
                />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.code}>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>${item.publication_price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button onClick={() => addItemToQuote(item)}>Add</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quote Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number.parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax">Tax (%)</Label>
              <Input id="tax" type="number" value={tax} onChange={(e) => setTax(Number.parseFloat(e.target.value))} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Subtotal: ${calculateSubtotal().toFixed(2)}</h3>
            <h3 className="text-lg font-semibold">Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
          <div className="space-x-2">
            <Button onClick={saveQuote}>Save Quote</Button>
            <Button onClick={exportQuote} variant="outline">
              Export Quote (PDF)
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

