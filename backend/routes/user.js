const express = require("express")
const jwt = require("jsonwebtoken");
const {z} =require("zod")
const  { User, Account } = require("../db")
const { JWT_SECRET } =require("../config");
const { authMiddleWare } = require("../middleware");


const userRoute = express.Router();

const inputSchema=z.object({
    username: z.string().email(),
	firstName: z.string(),
	lastName: z.string(),
	password: z.string()
})
const signinBody = z.object({
    username: z.string().email(),
	password: z.string()
})
const updateBody =z.object({
    firstName: z.string().optional(),
	lastName: z.string().optional(),
	password: z.string().optional()
})

userRoute.get('/authenticated',authMiddleWare,async (req,res)=>{
    res.json({isAuthenticated:Boolean(req.userId)});
})

userRoute.post('/signup',async (req,res)=>{
    const {success} = inputSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    }
    const existUser= await User.findOne({
        username:req.body.username
    })

    if(existUser){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    }
    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })
    const account =await Account.create({
        userId:user._id,
        balance : 1+ Math.random()*10000
    })

    const userId= user._id;
    const amount = account.balance;

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        message: "User created successfully",
	    token: token,
        amount :amount
    })

})

userRoute.post('/signin', async (req,res) => {
    const { success } = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Error while logging in"
        })
    }
    const existUser= await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    
    if(!existUser){
        return res.status(411).json({
            message:"Error while logging in"
        })
    }
    const userId= existUser._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        token: token
    })
})

userRoute.put('/',authMiddleWare ,async (req,res)=>{
    const { success } = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Error while updating info"
        })
    }

    await User.updateOne({_id:userId},req.body)

    res.json({
        message: "Updated successfully"
    })
})

userRoute.get('/bulk',authMiddleWare, async (req,res)=>{
    const filter = req.query.filter || "";
    const result = await User.find().or([
        {firstName : {
            $regex : filter
        }},
        {lastName:{
            $regex : filter
        }}
    ])
    if(!result.length){
        return res.status(404).json({
            message: "No users found"
        })
    }
    res.json({
        user : result.map(user => ( user._id!=req.userId)?{
            username: user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }:null)
    })
})



module.exports =userRoute