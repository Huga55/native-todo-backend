/**
 * @swagger
 * components:
 *      schemas:
 *          ElemName:
 *              type: string
 *              description: the sections's name
 *          ElemDescription:
 *              type: string
 *              description: the sections's description
 *          Section:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      description: the sections's id
 *                  name:
 *                      $ref: '#/components/schemas/ElemName'
 *                  description:
 *                      $ref: '#/components/schemas/ElemDescription'
 *          SectionNoId:
 *              type: object
 *              properties:
 *                  name:
 *                      $ref: '#/components/schemas/ElemName'
 *                  description:
 *                      $ref: '#/components/schemas/ElemDescription'
 *      parameters:
 *          SectionType: 
 *              name: type
 *              description: Type of section
 *              required: true
 *              in: path
 *              type: string
 *              enum: [movie, book, todo] 
 *          ElemId:
 *              name: id
 *              description: Elem's id
 *              required: true
 *              in: path
 *              type: string
 *      responses:
 *          Section404:
 *              description: This section or elem not found
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
 *                                  enum: [Данный элемент не найден, Данный раздел не найден]
 *
 */



/**
 * @swagger
 * /section:
 *  get:
 *       description: Get all sections Movies, Books, Todos
 *       tags: [Section]
 *       security:
 *          - BearerAuth: [read]
 *       responses:
 *          200:
 *              description: Success, data of all sections
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
 *                                      movies:
 *                                          type: array
 *                                          items:
 *                                              $ref: '#/components/schemas/Section'
 *                                      books:
 *                                          type: array
 *                                          items:
 *                                              $ref: '#/components/schemas/Section'
 *                                      todos:
 *                                          type: array
 *                                          items:
 *                                              $ref: '#/components/schemas/Section'
 *          401:
 *              $ref: '#/components/responses/401'
 *          500:
 *              $ref: '#/components/responses/500'                                                   
 */

/**
 * @swagger
 * /section/{type}/{id}:
 *  get:
 *      description: Get one elem by section type and id
 *      tags: [Section]
 *      security:
 *          - BearerAuth: [read]
 *      parameters:
 *        - $ref: '#/components/parameters/SectionType'
 *        - $ref: '#/components/parameters/ElemId'       
 *      responses:
 *          200:
 *              description: Success, get data of elem
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  default: true
 *                              data:
 *                                  $ref: '#/components/schemas/Section'
 *          401:
 *              $ref: '#/components/responses/401'
 *          404:
 *              $ref: '#/components/responses/Section404'
 *          500:
 *              $ref: '#/components/responses/500'
 *  delete:
 *      description: Delete one elem by id
 *      tags: [Section]
 *      security:
 *          - BearerAuth: [read]
 *      parameters:
 *        - $ref: '#/components/parameters/SectionType'
 *        - $ref: '#/components/parameters/ElemId'
 *      responses:
 *          200:
 *              description: Success, get id of deleted elem
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
 *                                      id:
 *                                          type: string
 *          401:
 *              $ref: '#/components/responses/401'
 *          404:
 *              $ref: '#/components/responses/Section404'
 *          500:
 *              $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /section/{type}:
 *  post:
 *      description: Create new elem
 *      tags: [Section]
 *      security:
 *          - BearerAuth: [read]
 *      parameters:
 *          - $ref: '#/components/parameters/SectionType'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SectionNoId'
 *      responses:
 *          200:
 *              description: Success, get elem after create
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  default: true
 *                              data:
 *                                  $ref: '#/components/schemas/Section'
 *          400:
 *              $ref: '#/components/responses/IncorrectData400'
 *          401:
 *              $ref: '#/components/responses/401'
 *          404:
 *              $ref: '#/components/responses/Section404'
 *          500:
 *              $ref: '#/components/responses/500'
 *  put:
 *      description: Change one elem by id
 *      tags: [Section]
 *      security:
 *          - BearerAuth: [read]
 *      parameters:
 *          - $ref: '#/components/parameters/SectionType'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Section'
 *      responses:
 *          200:
 *              description: Success, give elem after update
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  default: true
 *                              data:
 *                                  $ref: '#/components/schemas/Section'
 *          400:
 *              $ref: '#/components/responses/IncorrectData400'
 *          401:
 *              $ref: '#/components/responses/401'
 *          404:
 *              $ref: '#/components/responses/Section404'
 *          500:
 *              $ref: '#/components/responses/500'
 *
 */