import { redirect } from 'next/navigation'

export default function RootRedirectPage() {
  // 服务器端立即重定向到默认语言
  redirect('/zh')
} 