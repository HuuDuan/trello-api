
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body)

    // Điều hướng dữ liệu sang tầng service
    const createBoard = await boardService.createNew(req.body)

    // Có kết quả thì trả về cho client
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {next(error)}
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id

    // Điều hướng dữ liệu sang tầng service
    const board = await boardService.getDetails(boardId)

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

export const boardController = {
  createNew,
  getDetails,
  update
}

