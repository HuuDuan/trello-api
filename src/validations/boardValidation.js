
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (huuduan)',
      'string.empty': 'Title is not allowed to be empty (huuduan)',
      'string.min': 'Title length must be at least 3 character long (huuduan)',
      'string.max': 'Title length must be less than or equal 50 character long (huuduan)',
      'string.trim': 'Title must not have leading or trailing whitespace (huuduan)'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    // console.log('req.body: ', req.body)
    // chỉ định abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()
    res.status(StatusCodes.CREATED).json({ message: 'POST from validation API create new board' })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}
export const boardValidation = {
  createNew
}

