/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formatters'
const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard ={
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới thằng Model để xử lý lưu bản ghi newBoard vào trong Database
    return newBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}
