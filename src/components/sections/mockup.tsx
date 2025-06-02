import Image from "next/image"

export function AppMockupSection() {
  return (
    <section className="bg-gradient-to-b from-white to-purple-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Experience PostNatal Care</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Your comprehensive guide to maternal and child health, right in your pocket.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="relative max-w-[300px]">
            {/* Phone frame */}
            <div className="absolute -inset-4 rounded-[3rem] border-[14px] border-gray-900 bg-gray-900 shadow-xl"></div>

            {/* Screen content */}
            <div className="relative overflow-hidden rounded-[2rem] border-[8px] border-gray-800 bg-white shadow-inner">
              <Image
                src="/Onboarding - 1.png"
                alt="MamaCare App Screenshot"
                width={300}
                height={600}
                className="h-[600px] w-[300px] object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-pink-200 opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-purple-200 opacity-50 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}