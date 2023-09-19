const asyncHandler = require("express-async-handler");
const prisma = require("../config/prismaConfig");

exports.createUser = asyncHandler(async (req, res) => {
    // console.log("creating a user");
    let {email} = req.body;
    const userExists = await prisma.user.findUnique({where: {email: email}});
    if(!userExists)
    {
        const user = await prisma.user.create({data: req.body});
        res.send({
            message: "User registered successfully",
            user: user
        });
    }
    else
    {
        res.status(201).send({
            message: "User already exists",
        });
    }
});

//function to book visit to a specific residency
exports.bookVisit = asyncHandler(async (req, res) => {
    const {email, date} = req.body;
    const {id} = req.params;

    try 
    {
        const alreadyBooked = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        });
        if(alreadyBooked.bookedVisits.some((visit) => visit.id === id))
        {
            res.status(400).json({
                message: "his residency has been already booked by you."
            });
        }
        else
        {
            await prisma.user.update({
                where: {email: email},
                data: {
                    bookedVisits: {push: {id, date}}
                }
            })
        }
    } 
    catch (error) 
    {
        throw new Error(error.message);
    }
});

//function to get all bookings of the user
exports.getAllBookings = asyncHandler(async (req, res) => {
    const {email} = req.body;
    try 
    {
        const bookings = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        });
        res.status(200).send(bookings);
    } 
    catch (error) 
    {
        throw new Error(error.message);
    }
});

//function to cancel the booking 
exports.cancelBooking = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const {id}  = req.params;
    try 
    {
        const user = await prisma.user.findUnique({
            where: {email: email},
            select: {bookedVisits: true} 
        });
        const index = user.bookedVisits.findIndex((visit) => visit.id === id);
        if(index === -1)
        {
            res.status(404).json({
                message: "booking not found."
            });
        }
        else
        {
            user.bookedVisits.splice(index, 1);
            await prisma.user.update({
                where: {email},
                data: {
                    bookedVisits: user.bookedVisits
                }
            });
            res.send("booking cancelled successfully.");
        }
    } 
    catch (error) 
    {
        throw new Error(error.message);
    }
});

//function to add a ressidency in favourite list of a user
exports.toFav = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const {rid} = req.params;

    try 
    {
        const user = await prisma.user.findUnique({
            where: {email}
        });
        if(user.favResidenciesId.includes(rid))
        {
            const updateuser = await prisma.user.update({
                where: {email},
                data: {
                    favResidenciesId: {
                        set: user.favResidenciesId.filter((id) => id !== rid)
                    }
                }
            });
            res.send({message: "removed from favourites", user: updateuser});
        } 
        else
        {
            const updateUser = await prisma.user.update({
                where: {email},
                data: {
                    favResidenciesId: {
                        push: rid 
                    }
                }
            });
            res.send({message: "Updated favourites", user: updateUser});
        }
    } 
    catch (error) 
    {
        throw new Error(error.message);
    }
});

//function to get all favourites
exports.getAllFavourites = asyncHandler(async (req, res) => {
    const {email} = req.body;
    try 
    {
        const favResd = await prisma.user.findUnique({
            where: {email},
            select: {favResidenciesId: true}
        });
        res.status(200).send(favResd);
    } 
    catch (error) 
    {
        throw new Error(error.message);
    }
});