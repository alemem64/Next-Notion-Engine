import { type PageProps } from './types'

export async function pageAcl({
  site,
  recordMap,
  pageId
}: PageProps): Promise<PageProps | undefined> {
  if (!site) {
    return {
      site: undefined,
      error: {
        statusCode: 404,
        message: 'Unable to resolve notion site'
      }
    }
  }

  if (!recordMap) {
    return {
      site,
      error: {
        statusCode: 404,
        message: `Unable to resolve page for domain "${site?.domain}". Notion page "${pageId}" not found.`
      }
    }
  }

  const keys = Object.keys(recordMap.block)
  const rootKey = keys[0]

  if (!rootKey) {
    return {
      site,
      error: {
        statusCode: 404,
        message: `Unable to resolve page for domain "${site.domain}". Notion page "${pageId}" invalid data.`
      }
    }
  }

  const rootValue = recordMap.block[rootKey]?.value
  const rootSpaceId = rootValue?.space_id

  if (
    rootSpaceId &&
    site.rootNotionSpaceId &&
    rootSpaceId !== site.rootNotionSpaceId
  ) {
    if (process.env.NODE_ENV) {
      return {
        site,
        error: {
          statusCode: 404,
          message: `Notion page "${pageId}" doesn't belong to the Notion workspace owned by "${site.domain}".`
        }
      }
    }
  }
}
