import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center space-x-6 md:order-2">
              <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">
                Terms of Use
              </Link>
              
            </div>
            <div className="mt-8 md:order-1 md:mt-0">
              <p className="text-center text-sm text-gray-500">&copy; {currentYear} PostNatal Care. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
