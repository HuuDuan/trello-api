import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { userModel } from '~/models/userModel'
import { boardModel } from '~/models/boardModel'
import { invitationModel } from '~/models/invitationModel'
import { pickUser } from '~/utils/formatters'
import { INVITATION_TYPES, BOARD_INVITATION_STATUS } from '~/utils/constants'

const createNewBoardInvitation = async (reqBody, inviterId) => {
  const inviter = await userModel.findOneById(inviterId)
  const invitee = await userModel.findOneByEmail(reqBody.inviteeEmail)
  const board = await boardModel.findOneById(reqBody.boardId)

  if (!invitee || !inviter || !board) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Inviter, invitee or board not found')
  }

  // Tạo data cần thiết để lưu vào trong DB
  const newInvitationData = {
    inviterId,
    inviteeId: invitee._id.toString(),
    type: INVITATION_TYPES.BOARD_INVITATION,
    boardInvitation: {
      boardId: board._id.toString(),
      status: BOARD_INVITATION_STATUS.PENDING
    }
  }

  const createdInvitation = await invitationModel.createNewBoardInvitation(newInvitationData)
  const getInvitation = await invitationModel.findOneById(createdInvitation.insertedId)

  const resInvitation = {
    ...getInvitation,
    board,
    inviter: pickUser(inviter),
    invitee: pickUser(invitee)
  }
  return resInvitation

}

export const invitationService = {
  createNewBoardInvitation
}
