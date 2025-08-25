import { ArrowLeft } from 'lucide-react'

interface FormHeaderProps {
  title: string
  subtitle: string
  onBack: () => void
}

export default function FormHeader({ title, subtitle, onBack }: FormHeaderProps) {
  return (
    <div className="mb-8 flex-shrink-0">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-md">Back to document types</span>
      </button>
      
      <h2 className="text-3xl font-semibold text-white mb-2">{title}</h2>
      <p className="text-gray-400">{subtitle}</p>
    </div>
  )
}
