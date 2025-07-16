import { useData } from 'vitepress'
import { nextTick, provide } from 'vue'

/**
 * 过渡动画类型
 */
export type TransitionType = 'fade' | 'slide' | 'scale'

/**
 * 视图过渡配置接口
 */
export interface ViewTransitionConfig {
  /** 动画持续时间（毫秒） */
  duration?: number
  /** 动画缓动函数 */
  easing?: string
  /** 过渡动画类型 */
  type?: TransitionType
  /** 是否启用视图过渡 */
  enabled?: boolean
}

/**
 * 默认视图过渡配置
 */
const defaultConfig: Required<ViewTransitionConfig> = {
  duration: 1000,
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  type: 'fade',
  enabled: true
}

/**
 * 检测是否支持视图过渡 API 和用户动画偏好
 * @returns 是否启用过渡动画
 */
const enableTransitions = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return (
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  )
}

/**
 * 设置过渡动画类型的 CSS 类
 * @param type 过渡动画类型
 */
const setTransitionType = (type: TransitionType): void => {
  // 移除之前的过渡类型类
  document.documentElement.classList.remove('transition-fade', 'transition-slide', 'transition-scale')

  // 添加新的过渡类型类
  document.documentElement.classList.add(`transition-${type}`)
}

/**
 * 视图过渡 Composable 函数
 * @param config 可选的配置参数
 */
export function useViewTransition(config: ViewTransitionConfig = {}) {
  const { isDark } = useData()
  const finalConfig = { ...defaultConfig, ...config }

  /**
   * 处理外观切换的函数
   * @param event 鼠标事件（可选，用于兼容性）
   */
  const handleAppearanceToggle = async (event?: MouseEvent): Promise<void> => {
    // 如果不支持视图过渡或被禁用，直接切换
    if (!enableTransitions() || !finalConfig.enabled) {
      isDark.value = !isDark.value
      return
    }

    try {
      // 设置过渡动画类型
      setTransitionType(finalConfig.type)

      // 启动视图过渡动画
      const transition = document.startViewTransition(async () => {
        isDark.value = !isDark.value
        await nextTick()
      })

      // 等待过渡完成
      await transition.finished
    } catch (error) {
      // 如果视图过渡失败，回退到直接切换
      console.warn('视图过渡动画失败，回退到直接切换:', error)
      isDark.value = !isDark.value
    }
  }

  // 通过 provide 向子组件提供切换功能
  provide('toggle-appearance', handleAppearanceToggle)

  return {
    isDark,
    handleAppearanceToggle,
    enableTransitions: () => enableTransitions() && finalConfig.enabled
  }
}
