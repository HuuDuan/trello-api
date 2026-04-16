
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body)

    const userId = req.jwtDecoded._id
    // Điều hướng dữ liệu sang tầng service
    const createBoard = await boardService.createNew(userId, req.body)

    // Có kết quả thì trả về cho client
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {next(error)}
}

const getDetails = async (req, res, next) => {
  try {
    const userId = req.jwtDecoded._id
    const boardId = req.params.id

    // Điều hướng dữ liệu sang tầng service
    const board = await boardService.getDetails(userId, boardId)

    // Có kết quả thì trả về cho client
    res.status(StatusCodes.OK).json(board) 
  } catch (error) {next(error)}
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    // Điều hướng dữ liệu sang tầng service
    const updateBoard = await boardService.update(boardId, req.body)

    // Có kết quả thì trả về cho client
    res.status(StatusCodes.OK).json(updateBoard)
  } catch (error) {next(error)}
}

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumn(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {next(error)}
}

const getBoards = async (req, res, next) => {
  try {
    const userId = req.jwtDecoded._id
    // page và itemsPerPage được truyền vào trong query url từ phía FE sẽ lấy thông tin qua req.query
    const { page, itemsPerPage, q } = req.query
    const queryFilters = q

    const results = await boardService.getBoards(userId, page, itemsPerPage, queryFilters)
    res.status(StatusCodes.OK).json(results)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn,
  getBoards
}

