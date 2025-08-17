"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SplashCursor } from "@/components/animations";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // 只在首页和定价页面显示鼠标烟花效果
  const shouldShowSplashCursor = pathname === '/' || 
                                 pathname === '/zh' || 
                                 pathname === '/en' || 
                                 pathname === '/pricing' || 
                                 pathname === '/zh/pricing' || 
                                 pathname === '/en/pricing';
  
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <div className="antialiased">
      {/* 鼠标烟花效果 - 只在首页和定价页面显示 */}
      {shouldShowSplashCursor && <SplashCursor />}
      {children}
    </div>
  );
}
