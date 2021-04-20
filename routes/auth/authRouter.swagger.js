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
 *      responses:
 *          500:
 *              description: Server's error
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
 *                                  default: Что-то пошло не так...
 *          401:
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
 *      securitySchemes:
 *          BearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 */



/**
 * @swagger
 * /auth/login:
 *  post:
 *      description: Login user
 *      tags: [Authentication]
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
 *                                      limit:
 *                                          type: number
 *                                          description: user's limit of sections
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
 *          404:
 *              description: User not found
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
 *          500:
 *              $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *      description: Registration user
 *      tags: [Authentication]
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
 *                                      limit:
 *                                          type: number
 *                                          description: user's limit of sections
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
 *          500:
 *              $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /auth/check:
 *  get:
 *      description: Check is auth this user
 *      tags: [Authentication]
 *      security:
 *          - BearerAuth: [read]
 *      responses:
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
 *                                      limit:
 *                                          type: number
 *                                          description: user's limit of sections
 *          401:
 *              $ref: '#/components/responses/401'
 *          500:
 *              $ref: '#/components/responses/500'
 */


/**
 * @swagger
 * /auth/logout:
 *  put:
 *      description: Logout user
 *      tags: [Authentication]
 *      security:
 *          - BearerAuth: [read]
 *      responses:
 *          200:
 *              description: Logout success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean     
 *                                  default: true
 *          401:
 *              $ref: '#/components/responses/401'
 *          500:
 *              $ref: '#/components/responses/500'
 */