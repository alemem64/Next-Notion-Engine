import type * as types from './types'

export interface SiteConfig {
  rootNotionPageId: string
  rootNotionSpaceId?: string | null
  rootNotionDatabaseId?: string

  name: string
  domain: string
  author: string
  authors?: Array<{ name: string; avatar_dir: string; home_url: string }>
  description?: string
  language?: string

  // hero section (optional)
  heroAssets?: Array<{
    type: 'image' | 'video'
    src: string
    title?: string
    description?: string
  }>

  socials?: Record<string, string>

  defaultPageIcon?: string | null
  defaultPageCover?: string | null
  defaultPageCoverPosition?: number | null

  isPreviewImageSupportEnabled?: boolean
  isTweetEmbedSupportEnabled?: boolean
  isRedisEnabled?: boolean
  isSearchEnabled?: boolean

  includeNotionIdInUrls?: boolean
  pageUrlOverrides?: types.PageUrlOverridesMap | null
  pageUrlAdditions?: types.PageUrlOverridesMap | null

  navigationStyle?: types.NavigationStyle
  navigationLinks?: Array<NavigationLink>

  isr?: {
    revalidate: number
  }
}

export interface NavigationLink {
  title: string
  pageId?: string
  url?: string
}

export const siteConfig = (config: SiteConfig): SiteConfig => {
  return config
}
