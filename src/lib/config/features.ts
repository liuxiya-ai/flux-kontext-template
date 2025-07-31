// 核心功能配置文件 (第一阶段：静态版)
// 用于定义首页展示的各项核心功能，实现数据与视图分离。

interface Feature {
  title: string; // 主标题
  description: string; // 副标题/描述
  image: string; // 单张示例图片路径
}

export const keyFeatures: Feature[] = [
  {
    title: "Inspiration in Seconds",
    description: "Spark new ideas instantly. Upload a sketch to generate multiple architectural design concepts for rapid brainstorming and visualization.",
    image: "/images/features/interior-ai-render-main.webp", // 示例图片，请确保图片存在于 public/images/features/ 目录下
  },
  {
    title: "From Model to Masterpiece", 
    description: "Instantly upgrade your SketchUp, Revit, or CAD models to photorealistic architectural renderings in a single click.",
    image: "/images/features/interior-ai-render-main.webp",
  },
  {
    title: "Design Your Space, Instantly",
    description: "Upload an interior photo or floor plan, select your style, —and let our AI handle the layout and decor.", 
    image: "/images/features/interior-ai-render-main.webp",
  },
  {
    title: "Perfect Night Renders, Zero Setup",
    description: "Skip the tedious lighting setup. Convert any daytime model or render into a professional, atmospheric night scene with just one click.",
    image: "/images/features/interior-ai-render-main.webp",
  },
  {
    title: "Pixel-Perfect Edits, Instantly", 
    description: "Effortlessly handle last-minute client revisions. Select any area of your final rendering and modify it with a simple text command",
    image: "/images/features/interior-ai-render-main.webp",
  },
]; 