import Response from '@/api/Response'

describe('Response', () => {

  describe('Success', () => {
    let response

    beforeEach(() => {
      response = {
        data: {
          data: [
            {
              id: 1,
              attributes: {
                name: "testname1",
                species: "testspecies1"
              }
            },
            {
              id: 2,
              attributes: {
                name: "testname2",
                species: "testspecies2"
              }
            },
            {
              id: 3,
              attributes: {
                name: "testname3",
                species: "testspecies3"
              }
            }
          ]
        },
        status: 200,
        statusText: "OK"
      }
    })

    it('is initialized with a response object', () => {
      let init = new Response(response)
      expect(init.status).toEqual(response.status)
      expect(init.errors).toEqual({})
    })

    it('#get body', () => {
      let init = new Response(response)
      let expectedResponse = [
        { id: 1, name: "testname1", species: "testspecies1" },
        { id: 2, name: "testname2", species: "testspecies2" },
        { id: 3, name: "testname3", species: "testspecies3" },
      ]
      expect(init.body).toEqual(expectedResponse)
    })
  })

  describe('Failure', () => {
    let response

    beforeEach(() => {
      response = {
        data: {
          errors: {
            name: ['name error message 1'],
            species: ['species error message 2.1', 'species error message 2.2']
          }
        },
        status: 422,
        statusText: "Unprocessible entity"
      }
    })

    it('is initialized with a response object', () => {
      let init = new Response(response)
      expect(init.status).toEqual(response.status)
      expect(init.body).toEqual({})
    })

    it('#get errors', () => {
      let init = new Response(response)
      let msg = 'name name error message 1, species species error message 2.1, species species error message 2.2'
      let expectedResponse = { message: msg }
      expect(init.errors).toEqual(expectedResponse)
    })

  })

})
