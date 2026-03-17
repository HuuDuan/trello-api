import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { jwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'

// Middleware này sẽ đảm nhiệm việc quan trọng; Xác thực cái JWT accessToken nhận từ phía Fe có hợp lệ hay không

const isAuthorized = async (req, res, next) => {
  // Lấy accessToken nằm trong request cookies phía client - withCredentials trong file authorizeaxios
  const clientAccessToken = req.cookies?.accessToken

  //nếu như cái clientAccessToken này không tồn tại thì trả về lỗi
  if (!clientAccessToken) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! (token not found!)'))
    return
  }
  try {
    // Bước 1: Thực hiển giải mã token xem nó có hợp lệ hay không
    const accessTokenDecoded = await jwtProvider.verifyToken(clientAccessToken, env.ACCESS_TOKEN_SECRET_SIGNATURE)
    // console.log(accessTokenDecoded)
    // Bươc 2: Nếu như token hợp lệ, thì sẽ cần lưu lại thông tin giải mã dược vào cái req.jwtDecoded, để sử dụng cho các tầng sử lý ở phía sau
    req.jwtDecoded = accessTokenDecoded

    // Bước 3: Cho phép request đi tiếp tới các tầng xử lý tiếp theo (Controller, Service,...)
    next()
  } catch (error) {
    // console.log('authMiddleware', error)
    // Nếu cái accesstoken nó bị hết hạn thì mình cần trả về một cái mã lỗi GONE - 410 cho phía FE biết để gọi api refrehToken
    if (error?.message?.includes('jwt expired')) {
      next(new ApiError(StatusCodes.GONE, 'Need to refresh token!'))
      return
    }
    // Nếu cái accesstoken nó không hợp lệ do bất kỳ điều gì khác vụ hết hạn thì chúng ta cứ thẳng tay trả về mã 401 cho phía FE gọi api sign_out luôn
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! (invalid token!)'))
  }
}

export const authMiddleware = {
  isAuthorized
}
