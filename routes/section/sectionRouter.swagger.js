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
 *                                                   
 */