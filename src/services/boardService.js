/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formatters'
import { BoardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
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
const getDetails = async (boardId) => {
  try {
    const board = await BoardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    return board
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}
