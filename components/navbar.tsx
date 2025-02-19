"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Quotation CMS
        </Link>
        <div className="space-x-4">
          {pathname !== "/" && (
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
          )}
          {pathname !== "/quotes" && (
            <Link href="/quotes">
              <Button variant="ghost">Quotes</Button>
            </Link>
          )}
          {pathname !== "/line-items" && (
            <Link href="/line-items">
              <Button variant="ghost">Line Items</Button>
            </Link>
          )}
          <Button
            variant="ghost"
            onClick={() => {
              // Clear cookies and redirect to login
              document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
              document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
              window.location.href = "/login"
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}

