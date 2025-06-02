import { BookOpen, CheckCircle, BarChart3, MessageCircle } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Trusted Content",
      description: "Access expert-reviewed articles on maternal and child health, written by healthcare professionals.",
    },
    {
      icon: CheckCircle,
      title: "Progress Tracking",
      description: "Monitor your child's development milestones and receive personalized recommendations.",
    },
    {
      icon: MessageCircle,
      title: "Interactive Questionnaires",
      description: "Engage with tailored questionnaires to better understand your child's needs and development.",
    },
    {
      icon: BarChart3,
      title: "Personalized Insights",
      description: "Receive customized insights based on your child's age and your specific parenting journey.",
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Features designed for modern mothers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Everything you need to navigate the beautiful journey of motherhood with confidence.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border border-purple-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}