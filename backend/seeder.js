import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectionDB from './config/db.js'

dotenv.config()

connectionDB()

const importData = async () => {
    try{
        User.deleteMany()
        Product.deleteMany()
        Order.deleteMany()
    
        const createdUsers = await User.insertMany(users)
    
        const adminUser = createdUsers[0]._id
    
        const sampleProducts = products.map(product => {
            return { ...product, user:adminUser }
        })
    
        await Product.insertMany(sampleProducts)
    
        console.log('Data imported!')
        process.exit(1)

    }catch(error){
        console.log(`${error}`)
        process.exit(1)
    }
    
}

const destroyData = async () => {
    try{
        User.deleteMany()
        Product.deleteMany()
        Order.deleteMany()
    
        console.log('Data destroyed!')
        process.exit(1)
        
    }catch(error){
        console.log(`${error}`)
        process.exit(1)
    }
    
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}