import { env } from '~/config/environment'
// NHững domain được phép truy cập tới tài nguyên của server
export const WHITELIST_DOMAINS = [
  'http://localhost:5173'
]

export const BOARD_TYPE = {
  PRIVATE: 'private',
  PUBLIC: 'public'
}

export const WEBSITE_DOMAIN = (env.BUILD_MODE === 'production') ? env.WEBSITE_DOMAIN_PRODUCTION : env.WEBSITE_DOMAIN_DEVELOPMENT
