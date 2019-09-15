const USER ={
    ROLE:{
        ADMIN:"admin",
        CUSTOMER : "customer"
    }
};
const PRODUCT={
    STATUS:{
        ACTIVE :'active',
        INACTIVE : 'inactive'

    }
};
const ORDER={
    STATUS:{
        PENDING :"pending",
        CONFIRM :"confirm",
        COMPLETED:"completed"
    }
}
module.exports={USER,PRODUCT,ORDER};