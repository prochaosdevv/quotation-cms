"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
}

export default function LineItemManagement() {
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [newItem, setNewItem] = useState<LineItem>({
    code: "",
    category: "",
    description: "",
    unit: "",
    labour: 0,
    material: "",
    plant: "",
    publication_price: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const addLineItem = () => {
    if (newItem.code && newItem.description) {
      setLineItems([...lineItems, newItem])
      setNewItem({
        code: "",
        category: "",
        description: "",
        unit: "",
        labour: 0,
        material: "",
        plant: "",
        publication_price: 0,
      })
    }
  }

  const importLineItems = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const items = content.split("\n").map((line) => {
          const [code, category, description, unit, labour, material, plant, publication_price] = line.split(",")
          return {
            code: code.trim(),
            category: category.trim(),
            description: description.trim(),
            unit: unit.trim(),
            labour: Number.parseFloat(labour.trim()),
            material: material.trim(),
            plant: plant.trim(),
            publication_price: Number.parseFloat(publication_price.trim()),
          }
        })
        setLineItems([...lineItems, ...items])
      }
      reader.readAsText(file)
    }
  }

  const filteredItems = lineItems.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pageCount = Math.ceil(filteredItems.length / itemsPerPage)
  const displayedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Line Item Management</h1>
        <Link href="/">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2"
        />
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Item</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Line Item</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Code</Label>
                  <Input
                    id="code"
                    value={newItem.code}
                    onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="labour">Labour</Label>
                  <Input
                    id="labour"
                    type="number"
                    value={newItem.labour}
                    onChange={(e) => setNewItem({ ...newItem, labour: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    value={newItem.material}
                    onChange={(e) => setNewItem({ ...newItem, material: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plant">Plant</Label>
                  <Input
                    id="plant"
                    value={newItem.plant}
                    onChange={(e) => setNewItem({ ...newItem, plant: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publication_price">Publication Price</Label>
                  <Input
                    id="publication_price"
                    type="number"
                    value={newItem.publication_price}
                    onChange={(e) => setNewItem({ ...newItem, publication_price: Number.parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              <Button onClick={addLineItem} className="mt-4">
                Add Item
              </Button>
            </DialogContent>
          </Dialog>
          <Input type="file" onChange={importLineItems} accept=".csv" className="inline-block" />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Labour</TableHead>
            <TableHead>Material</TableHead>
            <TableHead>Plant</TableHead>
            <TableHead>Publication Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedItems.map((item) => (
            <TableRow key={item.code}>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.labour}</TableCell>
              <TableCell>{item.material}</TableCell>
              <TableCell>{item.plant}</TableCell>
              <TableCell>${item.publication_price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-between items-center">
        <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {pageCount}
        </span>
        <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount}>
          Next
        </Button>
      </div>
    </div>
  )
}

