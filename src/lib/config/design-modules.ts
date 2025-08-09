// @/lib/config/design-modules.ts

/**
 * 定义一个选择项的结构，用于下拉菜单等
 */
export interface SelectOption {
  value: string
  label: string
}

/**
 * 参数控件类型定义
 * 用于定义每个模块需要哪些特定的UI控件。
 * 已升级以支持更复杂的控件配置。
 */
export interface ModuleControl {
  requiresInputImage?: boolean
  inputTypes?: SelectOption[] // 输入类型下拉菜单
  requiresInpaint?: boolean
  requiresStyleMatch?: boolean
  requiresSimilarityLevel?: boolean // 相似度选择器
  roomTypes?: SelectOption[] // 房间类型下拉菜单
  renderStyles?: SelectOption[] // 渲染风格下拉菜单
  requiresRenderPerformance?: boolean // 渲染性能滑块
  
  // 新增：支持纵横比选择
  aspectRatios?: SelectOption[] 
  
  // 新增：明确要求显示种子和图片数量控件
  requiresSeedInput?: boolean
  requiresImageCount?: boolean

  // 为了保持兼容性，保留旧的 advanced settings
  requiresAdvancedSettings?: boolean
}

/**
 * AI 设计模块的类型定义
 */
export interface DesignModule {
  id: string
  name: string
  image: string
  controls: ModuleControl
  title: string
  description: string
  examples: {
    input: string
    output: string
  }[]
}

/**
 * 设计模块的“菜单”配置文件
 * 这是我们整个页面的核心配置，所有UI都将根据此文件动态生成。
 */
export const designModules: DesignModule[] = [
  {
    id: 'inspire',
    name: 'Inspire',
    image: '/images/modules/inspire.webp', // 占位图
    controls: {
      requiresInputImage: true, // 灵感生成，允许上传草图
      requiresSimilarityLevel: true,
      requiresAdvancedSettings: true,
    },
    title: 'Inspiration in Seconds',
    description:
      'Spark new ideas instantly. Upload a sketch to generate multiple architectural design concepts for rapid brainstorming and visualization.',
    examples: [
      {
        input: '/images/examples/inspire-input.webp', // 占位图
        output: '/images/examples/inspire-output.webp', // 占位图
      },
    ],
  },
  {
    id: 'exterior',
    name: 'Exterior',
    image: '/images/modules/exterior.webp', // 占位图
    controls: {
      requiresInputImage: true,
      requiresSimilarityLevel: true,
      requiresAdvancedSettings: true,
    },
    title: 'From Model to Masterpiece',
    description:
      'Instantly upgrade your SketchUp, Revit, or CAD models to photorealistic architectural renderings in a single click.',
    examples: [
      {
        input: '/images/examples/exterior-input.webp', // 占位图
        output: '/images/examples/exterior-output.webp', // 占位图
      },
    ],
  },
  {
    id: 'interior',
    name: 'Interior',
    image: '/images/modules/interior.webp', // 占位图
    controls: {
      // 完全复刻参考图中的 Interior 模块控件
      requiresInputImage: true,
      inputTypes: [
        { value: 'photo', label: 'Photo' },
        { value: 'sketch', label: 'Sketch' },
        { value: '3d-model', label: '3D Model' },
      ],
      requiresSimilarityLevel: true,
      roomTypes: [
        { value: 'living-room', label: 'Living Room' },
        { value: 'bedroom', label: 'Bedroom' },
        { value: 'kitchen', label: 'Kitchen' },
        { value: 'bathroom', label: 'Bathroom' },
        { value: 'office', label: 'Office' },
      ],
      renderStyles: [
        { value: 'no-style', label: '--- NO STYLE ---' },
        { value: 'modern', label: 'Modern' },
        { value: 'minimalist', label: 'Minimalist' },
        { value: 'scandinavian', label: 'Scandinavian' },
        { value: 'bohemian', label: 'Bohemian' },
        { value: 'industrial', label: 'Industrial' },
      ],
      requiresRenderPerformance: true,
      requiresAdvancedSettings: true,
    },
    title: 'Interior Render Generator',
    description:
      'Upload a photo, sketch, or 3D model of an interior space. Choose a similarity level to match creative needs. Describe your desired room environment with a prompt (e.g., ‘modern living room, cozy ambiance’). Select room type and style. Adjust render performance for speed or quality.',
    examples: [
      {
        input: '/images/examples/interior-input.webp', // 占位图
        output: '/images/examples/interior-output.webp', // 占位图
      },
    ],
  },
  {
    id: 'modify',
    name: 'Modify',
    image: '/images/modules/modify.webp', // 占位图
    controls: {
      requiresInputImage: true,
      requiresInpaint: true,
      requiresSimilarityLevel: true,
      requiresAdvancedSettings: true,
    },
    title: 'Pixel-Perfect Edits, Instantly',
    description:
      'Effortlessly handle last-minute client revisions. Select any area of your final rendering and modify it with a simple text command',
    examples: [
      {
        input: '/images/examples/modify-input.webp', // 占位图
        output: '/images/examples/modify-output.webp', // 占位图
      },
    ],
  },
  // 新增：夜景模块
  {
    id: 'night-scene',
    name: 'Night Scene',
    image: '/images/modules/night-scene.webp', // 占位图
    controls: {
      requiresInputImage: true,
      // 定义需要显示的控件
      aspectRatios: [
        { value: 'default', label: 'Default' }, // 新增默认选项
        { value: '21:9', label: '21:9' },
        { value: '16:9', label: '16:9' },
        { value: '4:3', label: '4:3' },
        { value: '3:2', label: '3:2' },
        { value: '1:1', label: '1:1' },
        { value: '2:3', label: '2:3' },
        { value: '3:4', label: '3:4' },
        { value: '9:16', label: '9:16' },
        { value: '9:21', label: '9:21' },
      ],
      requiresSeedInput: true,
      requiresImageCount: true,
    },
    title: 'Perfect Night Renders, Zero Setup',
    description:
      'Instantly transform any daytime model or render into a professional, atmospheric night scene with a single click.',
    examples: [
      {
        input: '/images/examples/night-scene-input.webp', // 占位图
        output: '/images/examples/night-scene-output.webp', // 占位图
      },
    ],
  },
] 