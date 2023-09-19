 const asyncHandler = require("express-async-handler");
 const prisma = require("../config/prismaConfig.js");

 exports.createResidency = asyncHandler(async (req, res) => {

    const {title, description, price, address, country, city, facilities, image, userEmail} = req.body.data;
    try 
    {
        const residency = await prisma.residency.create({
            data: {
                title, 
                description, 
                price, 
                address, 
                country, 
                city, 
                facilities, 
                image, 
                owner: {connect: {email: userEmail}}
            }
        });
        res.send({meassage: "Residency created successfully.", residency});
    } 
    catch (error) 
    {
        if(error.code === "P2002")
        {
            throw new Error("A residency with address already there.");
        }
        throw new Error(error.meassage);
    }
 });

 //function to get all the residencies
 exports.getAllResidencies = asyncHandler(async (req, res) => {
    const residencies = await prisma.residency.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    res.send(residencies);
 })

 //function to get a specific residency
 exports.getResidency = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try 
    {
        const residency = await prisma.residency.findUnique({
            where: {id}
        });
        res.send(residency);
    } 
    catch (error) 
    {
        throw new Error(error.meassage);
    }
 });