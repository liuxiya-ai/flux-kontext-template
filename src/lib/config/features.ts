// 核心功能配置文件 (第一阶段：静态版)
// 用于定义首页展示的各项核心功能，实现数据与视图分离。

interface Feature {
  title: string; // 主标题
  description: string; // 副标题/描述
  image: string; // 单张示例图片路径
}

export const keyFeatures: Feature[] = [
  {
    title: "几秒钟从草图到设计",
    description: "上传草图和参考图，按照您的想法得到用于头脑风暴的大量前期意向图。",
    image: "/images/features/sketch-to-design.webp", // 示例图片，请确保图片存在于 public/images/features/ 目录下
  },
  {
    title: "一句话生成多种风格", 
    description: "只需输入一句话描述，即可探索现代、古典、未来主义等多种建筑风格的视觉呈现。",
    image: "/images/features/style-generation.webp",
  },
  {
    title: "精细化渲染与调整",
    description: "对生成的图像进行光照、材质、环境等参数的微调，直至达到理想的最终效果。", 
    image: "/images/features/fine-tuning.webp",
  },
  {
    title: "3D模型一键渲染",
    description: "直接上传 SketchUp, Revit, or CAD 模型，AI 自动完成高质量渲染，极大缩短工作周期。",
    image: "/images/features/model-render.webp",
  },
  {
    title: "无限灵感与探索", 
    description: "利用 AI 的创造力，发现传统方法难以想到的设计角度和视觉组合，激发你的创作灵感。",
    image: "/images/features/inspiration.webp",
  },
]; 