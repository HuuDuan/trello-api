/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constants'

const createNew = async (userId, reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard ={
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới thằng Model để xử lý lưu bản ghi newBoard vào trong Database
    const createBoard = await boardModel.createNew(userId, newBoard)

    // Lấy bản ghi board sau khi gọi
    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)

    return getNewBoard
  } catch (error) { throw error }
}
const getDetails = async (userId, boardId) => {
  try {
    const board = await boardModel.getDetails(userId, boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    // Deep clone board ra một cái mới để xử lý, không ảnh hưởng tới board ban đầu,
    // tùy mục đíc về sau mà có cần clone deep hay không
    const resBoard = cloneDeep(board)
    // Đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      column.cards = column.cardOrderIds.map(cardId =>
        resBoard.cards.find(card => card._id.toString() === cardId.toString())
      ).filter(Boolean)
    })
    // Xóa mảng cards khỏi board ban đầu
    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }
}

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updateBoard = await boardModel.update(boardId, updateData)
    return updateBoard
  } catch (error) { throw error }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {
    // B1: Cập nhật  mảng cardOrderIds của column ban đầu chứa nó
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })
    // B2: Cập nhật  mảng cardOrderIds của column đích chuyển tới
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })
    // B3: Cập nhật lại thuộc tính columnId của card đang di chuyển
    await cardModel.update(reqBody.cardId, {
      columnId: reqBody.nextColumnId
    })

    return { updateResult: 'Successfully' }
  } catch (error) { throw error }
}

const getBoards = async (userId, page, itemsPerPage, queryFilters) => {
  try {
    // Nếu không tồn tại page hoặc itemsPerPage từ phía FE thì BE sẽ cần phải luôn gán giá trị mặc định
    if (!page) page = DEFAULT_PAGE
    if (!itemsPerPage) itemsPerPage = DEFAULT_ITEMS_PER_PAGE

    const results = await boardModel.getBoards(userId, parseInt(page, 10), parseInt(itemsPerPage, 10), queryFilters)
    return results
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  getBoards,
  moveCardToDifferentColumn
}
