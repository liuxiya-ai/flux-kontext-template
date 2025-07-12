"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Upload, 
  Wand2, 
  Loader2,
  Download,
  RefreshCw,
  Info
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { 
  ARCHITECTURE_STYLES, 
  BUILDING_TYPES, 
  ASPECT_RATIOS,
  generateArchitecturePrompt
} from "@/lib/fal-client"

interface GeneratedImage {
  url: string
  width?: number
  height?: number
}

export function ArchitectureGenerator() {
  const router = useRouter()
  const { data: session } = useSession()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // 生成状态
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null)
  const [error, setError] = useState("")
  
  // 表单状态
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState("")
  const [customPrompt, setCustomPrompt] = useState("")
  const [style, setStyle] = useState(ARCHITECTURE_STYLES[0])
  const [buildingType, setBuildingType] = useState(BUILDING_TYPES[0])
  const [aspectRatio, setAspectRatio] = useState("16:9")
  const [tier, setTier] = useState<"basic" | "advanced">("basic")
  
  // 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // 验证文件类型
    if (!file.type.startsWith("image/")) {
      setError("请上传有效的图片文件")
      return
    }
    
    // 创建本地预览URL
    const imageUrl = URL.createObjectURL(file)
    setUploadedImageUrl(imageUrl)
    setUploadedFile(file)
    setError("")
  }
  
  // 触发文件选择
  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }
  
  // 上传图片到服务器
  const uploadImage = async (file: File): Promise<string> => {
    // 创建FormData对象
    const formData = new FormData()
    formData.append("file", file)
    
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })
      
      if (!response.ok) {
        throw new Error("图片上传失败")
      }
      
      const data = await response.json()
      return data.url
    } catch (error) {
      console.error("上传错误:", error)
      throw new Error("图片上传失败，请重试")
    }
  }
  
  // 生成效果图
  const generateImage = async () => {
    if (!session) {
      setError("请先登录再生成效果图")
      return
    }
    
    if (!uploadedImageUrl || !uploadedFile) {
      setError("请先上传方案模型图片")
      return
    }
    
    // 组合提示词
    const finalPrompt = generateArchitecturePrompt(style, buildingType, customPrompt)
    
    setIsGenerating(true)
    setError("")
    
    try {
      // 1. 上传图片到服务器
      let imageUrl = uploadedImageUrl
      
      // 如果是本地blob URL，需要先上传到服务器
      if (uploadedImageUrl.startsWith("blob:")) {
        imageUrl = await uploadImage(uploadedFile)
      }
      
      // 确保图片URL是完整的URL
      if (imageUrl.startsWith("/")) {
        // 如果是相对路径，转换为完整URL
        // 优先使用环境变量中配置的公开URL（例如ngrok），否则回退到浏览器当前地址
        const ngrokUrl = process.env.NEXT_PUBLIC_APP_URL;
        console.log("环境变量NEXT_PUBLIC_APP_URL:", ngrokUrl);
        
        const baseUrl = ngrokUrl || window.location.origin;
        imageUrl = `${baseUrl}${imageUrl}`
        
        console.log("最终使用的baseUrl:", baseUrl);
        console.log("完整的图片URL:", imageUrl);
      }
      
      console.log("发送到API的图片URL:", imageUrl)
      
      // 2. 调用生成API
      const response = await fetch("/api/architecture-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          image_url: imageUrl,
          aspect_ratio: aspectRatio,
          tier: tier,
          num_images: 1
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "生成失败")
      }
      
      const data = await response.json()
      
      if (!data.images || data.images.length === 0) {
        throw new Error("未能生成效果图")
      }
      
      // 设置生成结果
      setGeneratedImage(data.images[0])
      
    } catch (error) {
      console.error("生成错误:", error)
      setError(error instanceof Error ? error.message : "生成过程中发生错误")
    } finally {
      setIsGenerating(false)
    }
  }
  
  // 下载生成的图片
  const downloadImage = () => {
    if (!generatedImage?.url) return
    
    const link = document.createElement("a")
    link.href = generatedImage.url
    link.download = `建筑效果图_${new Date().getTime()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 输入区域 */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">上传方案模型</h2>
              
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              
              {!uploadedImageUrl ? (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
                  onClick={triggerFileUpload}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-500">点击上传方案模型截图</p>
                    <p className="text-xs text-gray-400">支持 JPG, PNG 格式</p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={uploadedImageUrl} 
                    alt="上传的方案模型" 
                    className="w-full rounded-md"
                    style={{ maxHeight: "300px", objectFit: "contain" }}
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={triggerFileUpload}
                  >
                    更换图片
                  </Button>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">设置生成参数</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">建筑风格</label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ARCHITECTURE_STYLES.map((style) => (
                        <SelectItem key={style} value={style}>
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">建筑类型</label>
                  <Select value={buildingType} onValueChange={setBuildingType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BUILDING_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">自定义描述</label>
                  <Textarea
                    placeholder="添加更多细节描述，如材质、光照、环境等..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">纵横比</label>
                    <Select value={aspectRatio} onValueChange={setAspectRatio}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ASPECT_RATIOS.map((ratio) => (
                          <SelectItem key={ratio.value} value={ratio.value}>
                            {ratio.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">生成质量</label>
                    <Select value={tier} onValueChange={(value: "basic" | "advanced") => setTier(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">基础版</SelectItem>
                        <SelectItem value="advanced">高级版</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start gap-2">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <Button 
              onClick={generateImage} 
              disabled={isGenerating || !uploadedImageUrl}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  生成效果图
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        {/* 结果区域 */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-xl font-bold">生成结果</h2>
            
            <div className="aspect-video bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  <p className="text-sm text-gray-500">正在生成效果图...</p>
                  <p className="text-xs text-gray-400">这可能需要10-30秒</p>
                </div>
              ) : generatedImage ? (
                <img 
                  src={generatedImage.url} 
                  alt="生成的建筑效果图" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-gray-500">效果图将在这里显示</p>
                  <p className="text-xs text-gray-400">上传方案模型并点击生成按钮</p>
                </div>
              )}
            </div>
            
            {generatedImage && (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setGeneratedImage(null)}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  重新生成
                </Button>
                <Button className="flex-1" onClick={downloadImage}>
                  <Download className="mr-2 h-4 w-4" />
                  下载效果图
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 