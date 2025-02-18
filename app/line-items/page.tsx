"use client"

import type React from "react"

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Line Item Management</h1>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <Input
          type="text"
          placeholder="Code"
          value={newItem.code}
          onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Unit"
          value={newItem.unit}
          onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Labour"
          value={newItem.labour}
          onChange={(e) => setNewItem({ ...newItem, labour: Number.parseFloat(e.target.value) })}
        />
        <Input
          type="text"
          placeholder="Material"
          value={newItem.material}
          onChange={(e) => setNewItem({ ...newItem, material: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Plant"
          value={newItem.plant}
          onChange={(e) => setNewItem({ ...newItem, plant: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Publication Price"
          value={newItem.publication_price}
          onChange={(e) => setNewItem({ ...newItem, publication_price: Number.parseFloat(e.target.value) })}
        />
      </div>
      <div className="mb-4">
        <Button onClick={addLineItem} className="mr-2">
          Add Item
        </Button>
        <Input type="file" onChange={importLineItems} accept=".csv" className="inline-block" />
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
          {lineItems.map((item) => (
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
    </div>
  )
}

