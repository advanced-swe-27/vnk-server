import _ from "lodash"
import { __genPassword } from "../helpers/string";
import { ResidentModel, RoomModel } from "../models"
import { NextFunction, Request, Response } from 'express';
import { createError } from "../utils";
import { Resident } from "../types";

export async function createResident(req: Request<{}, {}, Resident>, res: Response, next: NextFunction) {
    const { dob, email, imageUrl, level, othernames, phone, programme, sid, surname, gender, room } = req.body

    try {
        // validation
        if (!dob || !email || !imageUrl || !level || !othernames || !phone || !programme || !sid || !surname || !gender || !room) {
            return next(createError(400, 'Provide all required fields'))
        }

        const residentExists = await ResidentModel.findOne({ email }) || await ResidentModel.findOne({ sid })

        // check if user exists
        if (residentExists) {
            return next(createError(409, 'User already exists with this email/ student id'));
        }

        const residentRoom = await RoomModel.findById(room)

        //  check if room exists
        if (!residentRoom) {
            return next(createError(404, 'Room was not found'));
        }

        // check if room is full
        const roommates = await ResidentModel.find({ room, status: { $ne: "rejected" } })

        // console.log(roommates)

        if (roommates?.length >= residentRoom?.capacity) {
            return next(createError(409, 'This room is already full'));
        }

        // check if gender is the same as the room gender
        if (gender !== residentRoom?.gender) {
            return next(createError(409, 'Your gender does not match this rooms gender'));
        }

        const newResident = new ResidentModel<Omit<Resident, "status">>({
            dob,
            email,
            imageUrl,
            level,
            surname,
            othernames,
            phone,
            programme,
            room,
            sid,
            gender,
        })

        await newResident.save()

        const resident = await ResidentModel.findById(newResident?._id).populate("room")

        res.status(201).json({
            success: true,
            data: resident,
        });


    } catch (error) {
        next(error)
    }

}

export async function getAllResidents(req: Request, res: Response, next: NextFunction) {
    try {
        const residents = await ResidentModel.find().populate("room")

        res.status(200).json({
            success: true,
            message: 'Residents fetched successfully',
            data: residents,
        });
    } catch (error) {
        next(error)
    }
}

export async function getAcceptedResidents(req: Request, res: Response, next: NextFunction) {
    try {
        const residents = await ResidentModel.find({ status: "approved" }).populate("room")

        res.status(200).json({
            success: true,
            message: 'Residents fetched successfully',
            data: residents,
        });
    } catch (error) {
        next(error)
    }
}



export async function getResidentById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide resident id'));
        }

        const resident = await ResidentModel.findById(id).populate("room")

        if (!resident) {
            return next(createError(404, "Resident not found"))
        }

        res.status(200).json({
            success: true,
            message: 'Resident fetched successfully',
            data: resident,
        });
    } catch (error) {
        next(error)
    }
}

export async function getResidentByRoom(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const room = await RoomModel.findById(id)

        if (!room) {
            return next(createError(404, "Room not found"))
        }

        const roommates = await ResidentModel.find({ room, status: { $ne: "rejected" } }).populate("room")

        res.status(200).json({
            success: true,
            message: 'Resident fetched successfully',
            data: roommates,
        });
    } catch (error) {
        next(error)
    }
}

export async function deleteResident(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide resident id'));
        }

        const resident = await ResidentModel.findById(id)

        if (!resident) {
            return next(createError(404, "Resident not found"))
        }

        const deletedResident = await ResidentModel.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'Resident deleted successfully',
            data: deletedResident,
        });
    } catch (error) {
        next(error)
    }
}


export async function approveResident(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide resident id'));
        }

        const resident = await ResidentModel.findById(id)

        if (!resident) {
            return next(createError(404, "Resident not found"))
        }

        const approvedResident = await ResidentModel.findByIdAndUpdate(id, {
            status: "approved"
        }, { new: true })

        res.status(200).json({
            success: true,
            message: 'Resident deleted successfully',
            data: approvedResident,
        });
    } catch (error) {
        next(error)
    }
}

export async function rejectResident(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide resident id'));
        }

        const resident = await ResidentModel.findById(id)

        if (!resident) {
            return next(createError(404, "Resident not found"))
        }

        // remove room


        const rejectedResident = await ResidentModel.findByIdAndUpdate(id, {
            status: "rejected",
        }, { new: true }).populate("room")

        res.status(200).json({
            success: true,
            message: 'Resident deleted successfully',
            data: rejectedResident,
        });
    } catch (error) {
        next(error)
    }
}

export async function changeResidentRoom(req: Request<{ id: string }, {}, { room: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    const { room } = req.body
    try {
        if (!id) {
            return next(createError(400, 'Provide resident id'));
        }

        const resident = await ResidentModel.findById(id)

        if (!resident) {
            return next(createError(404, "Resident not found"))
        }

        const roomExists = await RoomModel.findById(room)

        if (!roomExists) {
            return next(createError(404, "Room not found"))
        }

        // check if room is full
        const roommates = await ResidentModel.find({ room, status: { $ne: "rejected" } })

        // console.log(roommates)

        if (roommates?.length >= roomExists?.capacity) {
            return next(createError(409, 'This room is already full'));
        }

        // check if gender is the same as the room gender
        if (resident?.gender !== roomExists?.gender) {
            return next(createError(409, 'Your gender does not match this rooms gender'));
        }

        const modifiedResident = await ResidentModel.findByIdAndUpdate(id, {
            room
        }, { new: true }).populate("room")

        res.status(200).json({
            success: true,
            message: 'Resident room changed successfully',
            data: modifiedResident,
        });
    } catch (error) {
        next(error)
    }
}



