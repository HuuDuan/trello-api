import multer from 'multer'
import { ALLOW_COMMON_FILE_TYPES, LIMIT_COMMON_FILE_SIZE } from '../utils/validators.js'

// Function kiểm trẩ loại file nào được chấp nhận
const customFileFilter = (req, file, cb) => {
//   console.log('Multer File: ', file)

  // Đối với thằng multer, kiểm tra kiểu file thì sử dụng mimetype
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.mimetype)) {
    const errMessage = 'File type is invalid. Only accept jpg, jpeg and png'
    return cb(errMessage, null)
  }
  // Nếu như kiểu file hợp lệ
  return cb(null, true)
}

// Khởi tạo function upload được bọc bởi thằng multer
const upload = multer({
  limits: { fileSize: LIMIT_COMMON_FILE_SIZE },
  fileFilter: customFileFilter
})

export const multerUploadMiddlewares = { upload }
