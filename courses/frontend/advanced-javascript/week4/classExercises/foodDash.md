Build a food delivery app class structure

Class Restaurants()
    - Name, Type, Location
    menu{}
    addReview()
    showReview()
    paymentOptions{}

Class DeliveryStaff()
    - Name, Age, Vehicle, Location
    addReview()
    showReview()
    addTip()

Class Customers()
    - Address, Location, Favorites
    paymentMethods{}
    orderHistory{}

Class PaymentMethods()
    - Type, Currency
    calculateFee()

Class Order()
    - Name, Location, time
    getRestaurant()
    addItems()
    calculatePrices()
    makePayment()

