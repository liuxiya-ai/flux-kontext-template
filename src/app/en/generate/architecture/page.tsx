import { ArchitectureGenerator } from "@/components/ArchitectureGenerator"

export const metadata = {
  title: "建筑效果图生成器 - 专业建筑设计可视化平台",
  description: "上传方案模型截图，输入提示词，一键生成专业建筑效果图，支持多种建筑风格和类型"
}

export default function ArchitectureGeneratorPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold text-center mb-4">建筑效果图生成器</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          上传您的建筑方案模型截图，选择风格和类型，AI将为您生成专业级建筑效果图
        </p>
        
        <ArchitectureGenerator />
      </div>
    </main>
  )
} 