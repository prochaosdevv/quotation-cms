import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Package, Users, PlusCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Quotation CMS Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2" />
              Line Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your line items inventory</p>
            <Link href="/line-items">
              <Button className="mt-4">Manage Line Items</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PlusCircle className="mr-2" />
              Create Quote
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create a new quotation</p>
            <Link href="/quotes/create">
              <Button className="mt-4">Create New Quote</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" />
              View Quotes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage existing quotes</p>
            <Link href="/quotes">
              <Button className="mt-4">View All Quotes</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage system users</p>
            <Link href="/users">
              <Button className="mt-4">Manage Users</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

