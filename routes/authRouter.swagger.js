/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  id:
 *                      type: string
 *                      description: the auto generated id of user
 *                  email:
 *                      type: string
 *                      description: the user's email
 *                  password:
 *                      type: string
 *                      description: the user's password
 *                  token:
 *                      type: string
 *                      description: the user's token
 *              example:
 *                  id: sdkj87f8sdugij3lk
 *                  email: example@yandex.ru
 *                  password: password
 *                  token: Bearer askluivuiewef89ds78q23he2lkn
 *          ErrorDetails:
 *              type: object
 *              properties:
 *                  value:
 *                      type: string
 *                      description: value from client
 *                  msg:
 *                      type: string
 *                      description: detail of error of field
 *                  param:
 *                      type: string
 *                      description: name of param from client
 *                  location:
 *                      type: string
 *                      default: body
 *              example:
 *                  value: example.ru
 *                  msg: Неверный формат email
 *                  param: email
 *                  location: body
 *      securitySchemes:
 *          BearerAuth:
 *              type: http
 *              scheme: bearer
 */



/**
 * @swagger
 * /auth/login:
 *  post:
 *      description: Login user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: the user's email
 *                          password:
 *                              type: string
 *                              description: the user's password
 *      responses:
 *          201:
 *              description: Success and User's token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  default: true
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      token:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *          404:
 *              description: Fail and Error message
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  default: false
 *                              error:
 *                                  type: string
 *                                  default: Пользователь с данным логином и/или паролем не найден
 *          400:
 *              description: Data is incorrect
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  default: false
 *                              error:
 *                                  type: string
 *                                  default: Неверные данные
 *                              details:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/ErrorDetails'
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *      description: Registration user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: the user's email
 *                          password:
 *                              type: string
 *                              description: the user's password
 *      responses:
 *          201:
 *              description: Success and user's token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  default: true
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      token:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *          400:
 *              description: Data is incorrect
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  default: false
 *                              error:
 *                                  type: string
 *                                  default: Неверные данные
 *                              details:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/ErrorDetails'
 *          409:
 *              description: This user already exist
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  default: false
 *                              error:
 *                                  type: string
 *                                  default: Пользователь с данным email уже существует
 */

/**
 * @swagger
 * /auth/check:
 *  get:
 *      description: Check is auth this user
 *      security:
 *          - BearerAuth: [read]
 *      responses:
 *          400:
 *              description: Token not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  default: false
 *                              error:
 *                                  type: string
 *                                  default: Токен не найден
 *          403:
 *              description: Token is incorrect
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  default: false
 *                              error:
 *                                  type: string
 *                                  default: Неверный токен
 *          200:
 *              description: Token is correct
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  default: true
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      email:
 *                                          type: string
 */
