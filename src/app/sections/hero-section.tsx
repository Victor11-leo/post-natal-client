import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#f9d5e5_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />

      <div className="relative flex flex-col lg:flex-row gap-4 justify-center items-center mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="">
          <img src="/logo.png" alt="logo" className="w-20" />
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-purple-800 sm:text-6xl md:text-7xl">PostNatal Care</h1>
          <p className="mb-6 text-xl font-medium text-pink-600">Empowering Mothers, One Article at a Time</p>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
            Your trusted companion for maternal and child health education. Access expert advice, track your child's
            development, and connect with a community of mothers just like you.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button className="min-w-[200px] bg-purple-700 hover:bg-purple-800">Download on Play Store</Button>
            <Link href='/admin'>
              <Button
                variant="outline"
                className="min-w-[200px] border-purple-300 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
              >
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
        <div className="aspect-square w-[400px] rounded-xl  overflow-hidden">
          <img 
          src="https://images.unsplash.com/photo-1565430076958-f6579417a6ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hdGVybml0eXxlbnwwfHwwfHx8MA%3D%3D"
          alt="image cover" 
          className="object-cover"
           />
        </div>
      </div>
    </section>
  )
}
