"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
  const [customItem, setCustomItem] = useState<LineItem>({
    code: "",
    category: "",
    description: "",
    unit: "",
    labour: 0,
    material: "",
    plant: "",
    publication_price: 0,
    quantity: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")

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

  const addCustomItem = () => {
    if (customItem.code && customItem.description && customItem.quantity > 0) {
      setQuoteItems([...quoteItems, customItem])
      setCustomItem({
        code: "",
        category: "",
        description: "",
        unit: "",
        labour: 0,
        material: "",
        plant: "",
        publication_price: 0,
        quantity: 0,
      })
    }
  }

  const calculateTotal = () => {
    return quoteItems.reduce((total, item) => total + item.publication_price * item.quantity, 0)
  }

  const saveQuote = () => {
    // Here you would typically save the quote to your backend
    console.log("Saving quote:", quoteItems)
    alert("Quote saved successfully!")
  }

  const exportQuote = () => {
    const headers = [
      "Code",
      "Category",
      "Description",
      "Unit",
      "Labour",
      "Material",
      "Plant",
      "Publication Price",
      "Quantity",
      "Total",
    ]
    const csvContent = [
      headers.join(","),
      ...quoteItems.map((item) =>
        [
          item.code,
          item.category,
          item.description,
          item.unit,
          item.labour,
          item.material,
          item.plant,
          item.publication_price,
          item.quantity,
          item.publication_price * item.quantity,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "quote.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const filteredItems = availableItems.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Quote</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Available Items</h2>
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
          <h2 className="text-xl font-semibold mt-4 mb-2">Add Custom Item</h2>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="text"
              placeholder="Code"
              value={customItem.code}
              onChange={(e) => setCustomItem({ ...customItem, code: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Category"
              value={customItem.category}
              onChange={(e) => setCustomItem({ ...customItem, category: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Description"
              value={customItem.description}
              onChange={(e) => setCustomItem({ ...customItem, description: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Unit"
              value={customItem.unit}
              onChange={(e) => setCustomItem({ ...customItem, unit: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Labour"
              value={customItem.labour}
              onChange={(e) => setCustomItem({ ...customItem, labour: Number.parseFloat(e.target.value) })}
            />
            <Input
              type="text"
              placeholder="Material"
              value={customItem.material}
              onChange={(e) => setCustomItem({ ...customItem, material: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Plant"
              value={customItem.plant}
              onChange={(e) => setCustomItem({ ...customItem, plant: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Publication Price"
              value={customItem.publication_price}
              onChange={(e) => setCustomItem({ ...customItem, publication_price: Number.parseFloat(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={customItem.quantity}
              onChange={(e) => setCustomItem({ ...customItem, quantity: Number.parseInt(e.target.value) })}
            />
          </div>
          <Button onClick={addCustomItem} className="mt-2">
            Add Custom Item
          </Button>
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
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
          <div className="mt-4 space-x-2">
            <Button onClick={saveQuote}>Save Quote</Button>
            <Button onClick={exportQuote} variant="outline">
              Export Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

