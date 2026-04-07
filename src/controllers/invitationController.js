import { StatusCodes } from 'http-status-codes'
import { invitationService } from '~/services/invitationService'

const createNewBoardInvitation = async (req, res, next) => {
  try {
    // Người đi mời sẽ được lấy từ dữ liệu đã giải mã trong JWT
    const inviterId = req.jwtDecoded._id
    const resInvitation = await invitationService.createNewBoardInvitation( req.body, inviterId )
    res.status(StatusCodes.CREATED).json(resInvitation)
  } catch (error) {
    next(error)
  }
}

export const invitationController = {
  createNewBoardInvitation
}
