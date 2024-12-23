class Customer {
    private name: string
    private address: string

    constructor(name: string, address: string){
        this.name = name
        this.address = address
    }

    public getInfo():string{
        return `Name : ${this.name}, \nAddress : ${this.address}`
    }
}

class Order {
    private customer: Customer;
    private payment: Payment = new Cash(0, 0)
    private orderDetails: OrderDetail[] = []
    private date: string
    private status: string

    constructor(customer: Customer, date: string , status: string){
        this.customer = customer
        this.date = date
        this.status = status
    }

    public getPayment():Payment{
        return this.payment
    }

    public addOrderDetail(orderDetail: OrderDetail){
        this.orderDetails.push(orderDetail)
    }

    public payOrder(payment: Payment){
        this.payment = payment
    }

    public calcSubTotal(){
        let subtotal = 0
        for(let i = 0; i < this.orderDetails.length ;i++){
            subtotal += this.orderDetails[i].calcSubTotal()
        }
        return subtotal
    }

    public calcTax(){
        let vat = 0
        for(let i = 0; i < this.orderDetails.length; i++){
            vat += this.orderDetails[i].calcTax()
        }
        return vat
    }

    public calcTotal(){
        return this.calcSubTotal() + this.calcTax()
    }

    public calcTotalWeight(){
        let weight = 0
        for(let i = 0; i < this.orderDetails.length; i++){
            weight += this.orderDetails[i].calcWeight()
        }
        return weight
    }

    public printOrderDetail():void{
        for(let i = 0; i < this.orderDetails.length; i++){
            this.orderDetails[i].printDetail();
        }
    }
}

class Item {
    private shippingWeight: number
    private description: string
    private price: number

    constructor(shippingWeight: number, description: string, price: number){
        this.shippingWeight = shippingWeight
        this.description = description
        this.price = price
    }

    public getPriceForQuantity(){
        return this.price
    }

    public getName():string{
        return this.description
    }

    public getInfo(): string{
        return `Name : ${this.description}, Price : ${this.price} ฿, Weight : ${this.shippingWeight} kg`
    }

    public getTax(){
        return this.price * 0.07
    }
    public inStock(){
        return true
    }

    public getShippingWeight():number{
        return this.shippingWeight
    }
}

class OrderDetail {
    private item: Item
    private quantity: number
    private taxStatus: string

    constructor(item: Item , quantity: number, taxStatus: string){
        this.item = item
        this.quantity = quantity
        this.taxStatus = taxStatus
    }

    public calcSubTotal(){
        return this.quantity * this.item.getPriceForQuantity()
    }

    public calcWeight(){
        return this.quantity * this.item.getShippingWeight()
    }

    public calcTax(){
        if(this.taxStatus === 'not included'){
            return this.quantity * this.item.getTax()
        }
        return 0
    }

    public printDetail():void{
        console.log(this.item.getName() + ' ' + this.quantity + '(ชิ้น)' + this.calcSubTotal() + "฿" + this.calcTax() + 'ภาษี\n')
    }
}

abstract class Payment{
    private amount: number

    constructor(amount: number){
        this.amount = amount
    }

    public getAmount():number{
        return amount
    }
}

class Check extends Payment {
    private name: string
    private bankID: string

    constructor(amount: number, name: string, bankID: string){
        super(amount)
        this.name = name
        this.bankID = bankID
    }
}

class Cash extends Payment {
    private cashTendered: number

    constructor(amount: number,cashTendered: number){
        super(amount)
        this.cashTendered = cashTendered
    }

    public getCashTendered(): number{
        return this.cashTendered
    }

    public getChange():number{
        return this.cashTendered - this.getAmount()
    }
}

class Credit extends Payment {
    private number: string
    private type: string
    private expDate: string

    constructor(amount: number,number: string, type: string, expDate: string){
        super(amount)
        this.number = number
        this.type = type
        this.expDate = expDate
    }
}

// Create Object

// Customer
const customer1 = new Customer('i', 'sus')
console.log(customer1.getInfo())

//Items
const item1= new Item(1.5, `Lotus's water`, 15)
const item2= new Item(0.05, `Lays`, 30)
const item3 = new Item(0.7, 'Mama', 7)

console.log(item1.getInfo())
console.log(item2.getInfo())

// Order
const order1 = new Order(customer1, '16/12/2567', 'inproggress')
const order2 = new Order(customer1, '16/12/2567', 'inproggress')


// OrderDetail
const orderDetail1 = new OrderDetail(item1, 1, 'not included')
const orderDetail2 = new OrderDetail(item2, 2, 'not included')
const orderDetail3 = new OrderDetail(item3, 5, 'not included')

// OrderDetail => Order
order1.addOrderDetail(orderDetail1)
order1.addOrderDetail(orderDetail2)
order1.addOrderDetail(orderDetail3)


// Payment
const amount = order1.calcTotal()
const amount3 = order2.calcTotal()


const cash = new Cash(amount, 1000)


order1.payOrder(cash)

console.log('#################### Order ####################')
order1.printOrderDetail()
console.log('#################### Order ####################')

// console.log(`SubTotal: ${order1.calcSubTotal()}`)
// console.log(`VAT: ${order1.calcTax()}`)
// console.log(`Total: ${order1.getPayment().getAmount()}`)
// console.log(`Total: ${order1.calcTotal()}`)
// console.log(`Recieve: ${(order1.getPayment() as Cash).getCashTendered()}`)
// console.log(`Change: ${(order1.getPayment() as Cash).getChange()}`)

