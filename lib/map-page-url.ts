import { type ExtendedRecordMap } from 'notion-types'
import { parsePageId, uuidToId } from 'notion-utils'

import { includeNotionIdInUrls } from './config'
import { getCanonicalPageId } from './get-canonical-page-id'
import { type Site } from './types'

// include UUIDs in page URLs during local development but not in production
// (they're nice for debugging and speed up local dev)
const uuid = !!includeNotionIdInUrls

export const mapPageUrl =
  (
    site: Site,
    recordMap: ExtendedRecordMap,
    searchParams: URLSearchParams,
    basePath = ''
  ) =>
  (pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true })!

    if (uuidToId(pageUuid) === site.rootNotionPageId) {
      return createUrl('/', searchParams)
    } else {
      const canonicalPageId = getCanonicalPageId(pageUuid, recordMap, { uuid })
      // Join the base path with the new canonical page ID to create a hierarchical URL.
      const path = [basePath, canonicalPageId].filter(Boolean).join('/')
      return createUrl(`/${path}`, searchParams)
    }
  }

export const getCanonicalPageUrl =
  (site: Site, recordMap: ExtendedRecordMap) =>
  (pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true })!

    if (uuidToId(pageId) === site.rootNotionPageId) {
      return `https://${site.domain}`
    } else {
      return `https://${site.domain}/${getCanonicalPageId(pageUuid, recordMap, {
        uuid
      })}`
    }
  }

function createUrl(path: string, searchParams: URLSearchParams) {
  return [path, searchParams.toString()].filter(Boolean).join('?')
}
