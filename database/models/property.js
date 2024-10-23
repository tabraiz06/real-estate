const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    basic:{
        buildingType:String,
        price:Number,
        age:Number,
        description:String,
        negotiable:String,
        ownership:{
            type:String,
            enum:['Sole','Joint','Community','Trust']
        },
        approved:String,
        hasLoan:String
    },
    details:{
        length:Number,
        area:Number,
        noOfBHK:Number,
        attached:String,
        furnished:{
            type:String,
            enum:['Fully','Semi','Unfurnished']
        },
        lift:String,
        facing:String,
        breadth:Number,
        areaUnit:String,
        noOfFloor:Number,
        westernToilet:String,
        carParking:String,
        electricity:String
    },
    general:{
        ownerName:String,
        postedBy:String,
        featuredPackage:String,
        mobile:String,
        saleType:String,
        ppdPackage:String
    },
    location:{
        email:String,
        area:String,
        address:String,
        latitude:Number,
        city:String,
        pincode:String,
        landmark:String,
        longitude:Number
    },
    owner:{type:mongoose.Types.ObjectId, ref:'User'},
    imageUrl:String,
    status:String,
    views:Number,
    daysLeft:Number,
    ppdId:String
})

const propertyModel = mongoose.model('property',propertySchema)

module.exports = propertyModel