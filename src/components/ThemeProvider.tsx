"use client"

import { useEffect, useState } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark") // 默认主题

  useEffect(() => {
    // 客户端渲染时，我们可以在这里添加更复杂的主题逻辑，
    // 例如从localStorage读取或根据系统偏好设置
    
    // 将主题class应用到<html>元素
    if (document.documentElement) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  }, [theme])

  // 这个组件现在只提供上下文或包装器，不渲染多余的DOM元素
  return <>{children}</>
} 