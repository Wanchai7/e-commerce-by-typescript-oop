"use strict";
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    getInfo() {
        return `Name : ${this.name}, \nAddress : ${this.address}`;
    }
}
class Order {
    constructor(customer, date, status) {
        this.payment = new Cash(0, 0);
        this.orderDetails = [];
        this.customer = customer;
        this.date = date;
        this.status = status;
    }
    getPayment() {
        return this.payment;
    }
    addOrderDetail(orderDetail) {
        this.orderDetails.push(orderDetail);
    }
    payOrder(payment) {
        this.payment = payment;
    }
    calcSubTotal() {
        let subtotal = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            subtotal += this.orderDetails[i].calcSubTotal();
        }
        return subtotal;
    }
    calcTax() {
        let vat = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            vat += this.orderDetails[i].calcTax();
        }
        return vat;
    }
    calcTotal() {
        return this.calcSubTotal() + this.calcTax();
    }
    calcTotalWeight() {
        let weight = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            weight += this.orderDetails[i].calcWeight();
        }
        return weight;
    }
    printOrderDetail() {
        for (let i = 0; i < this.orderDetails.length; i++) {
            this.orderDetails[i].printDetail();
        }
    }
}
class Item {
    constructor(shippingWeight, description, price) {
        this.shippingWeight = shippingWeight;
        this.description = description;
        this.price = price;
    }
    getPriceForQuantity() {
        return this.price;
    }
    getName() {
        return this.description;
    }
    getInfo() {
        return `Name : ${this.description}, Price : ${this.price} ฿, Weight : ${this.shippingWeight} kg`;
    }
    getTax() {
        return this.price * 0.07;
    }
    inStock() {
        return true;
    }
    getShippingWeight() {
        return this.shippingWeight;
    }
}
class OrderDetail {
    constructor(item, quantity, taxStatus) {
        this.item = item;
        this.quantity = quantity;
        this.taxStatus = taxStatus;
    }
    calcSubTotal() {
        return this.quantity * this.item.getPriceForQuantity();
    }
    calcWeight() {
        return this.quantity * this.item.getShippingWeight();
    }
    calcTax() {
        if (this.taxStatus === 'not included') {
            return this.quantity * this.item.getTax();
        }
        return 0;
    }
    printDetail() {
        console.log(this.item.getName() + ' ' + this.quantity + '(ชิ้น)' + this.calcSubTotal() + "฿" + this.calcTax() + 'ภาษี\n');
    }
}
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    getAmount() {
        return amount;
    }
}
class Check extends Payment {
    constructor(amount, name, bankID) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
}
class Cash extends Payment {
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
    }
    getCashTendered() {
        return this.cashTendered;
    }
    getChange() {
        return this.cashTendered - this.getAmount();
    }
}
class Credit extends Payment {
    constructor(amount, number, type, expDate) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
}
// Create Object
// Customer
const customer1 = new Customer('i', 'sus');
console.log(customer1.getInfo());
//Items
const item1 = new Item(1.5, `Lotus's water`, 15);
const item2 = new Item(0.05, `Lays`, 30);
const item3 = new Item(0.7, 'Mama', 7);
console.log(item1.getInfo());
console.log(item2.getInfo());
// Order
const order1 = new Order(customer1, '16/12/2567', 'inproggress');
const order2 = new Order(customer1, '16/12/2567', 'inproggress');
// OrderDetail
const orderDetail1 = new OrderDetail(item1, 1, 'not included');
const orderDetail2 = new OrderDetail(item2, 2, 'not included');
const orderDetail3 = new OrderDetail(item3, 5, 'not included');
// OrderDetail => Order
order1.addOrderDetail(orderDetail1);
order1.addOrderDetail(orderDetail2);
order1.addOrderDetail(orderDetail3);
// Payment
const amount = order1.calcTotal();
const amount3 = order2.calcTotal();
const cash = new Cash(amount, 1000);
order1.payOrder(cash);
console.log('#################### Order ####################');
order1.printOrderDetail();
console.log('#################### Order ####################');
// console.log(`SubTotal: ${order1.calcSubTotal()}`)
// console.log(`VAT: ${order1.calcTax()}`)
// console.log(`Total: ${order1.getPayment().getAmount()}`)
// console.log(`Total: ${order1.calcTotal()}`)
// console.log(`Recieve: ${(order1.getPayment() as Cash).getCashTendered()}`)
// console.log(`Change: ${(order1.getPayment() as Cash).getChange()}`)
