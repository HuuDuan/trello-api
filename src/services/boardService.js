/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formatters'
import { BoardModel } from '~/models/boardModel'
const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard ={
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới thằng Model để xử lý lưu bản ghi newBoard vào trong Database
    const createBoard = await BoardModel.createNew(newBoard)

    // Lấy bản ghi board sau khi gọi
    const getNewBoard = await BoardModel.findOneById(createBoard.insertedId)

    return getNewBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}
