/**
 * @swagger
 * components:
 *      schemas:
 *          Section:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: the sections's id
 *                  name:
 *                      type: string
 *                      description: the sections's name
 *                  description:
 *                      type: string    
 *                      description: the sections's description
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
 * /section/:type/:id:
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
 *              description: Success, data of elem
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
 *          500:
 *              $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /section/:type:
 *  post:
 *      description: Create new elem
 *      tags: [Section]
 *      security:
 *          - BearerAuth: [read]
 *      parameters:
 *          - $ref: '#/components/parameters/SectionType'
 *              
 *          
 */