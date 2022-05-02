import { storeReducer } from "../../../redux/reducers/reducer";


  const cartItems =[{
        title: 'Test Product1',
        description: 'test',
        email: "Test@gmail.com",
        userId: "test",
        category: "test",
        id: "TestId123",
        price: 12,
        image: "imageUrl",
        rating: {
          count: 100,
          rate: 2.2,
        },
        itemCount:1
    },{
        title: 'Test Product2',
        description: 'test2',
        email: "Test2@gmail.com",
        userId: "test2",
        category: "test2",
        id: "TestId1234",
        price: 155,
        image: "imageUrl2",
        rating: {
          count: 110,
          rate: 4,
        },
        itemCount:2
    },{
        title: 'Test Product3',
        description: 'test3',
        email: "Test3@gmail.com",
        userId: "test3",
        category: "test3",
        id: "TestId1234",
        price: 172,
        image: "imageUrl3",
        rating: {
          count: 120,
          rate: 4.2,
        },
        itemCount:3
    }]

test("Should set default State", () => {
    const state = storeReducer([], { type: '@@INIT' })
    expect(state).toEqual([])
})

test("should test add cartitem action  type in reducer", () => {
    const newcartitem = {
                title: 'Test Product4',
                description: 'test4',
                email: "Test4@gmail.com",
                userId: "test4",
                category: "test4",
                id: "TestId12345",
                price: 189,
                image: "imageUrl4",
                rating: {
                count: 140,
                rate: 1.2,
                },
                itemCount:4
    }
    const action = {
            type: 'ADD_ITEM',
            payload:newcartitem
    }
    const state = storeReducer(cartItems,action)
    expect(state).toEqual([...cartItems,action.payload])   
})