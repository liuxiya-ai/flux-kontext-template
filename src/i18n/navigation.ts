import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';
 
// 创建基于路由配置的导航API
// 这些是Next.js导航API的轻量级包装器，考虑了路由配置
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing); 