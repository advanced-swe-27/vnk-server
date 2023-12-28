import { createError } from "../utils";
import { NextFunction, Request, Response } from 'express';
import { UserModel, FacilityModel, KeyLogModel,  ResidentModel, RoomModel, VisitLogModel, VisitorModel } from "../models";
import _ from "lodash"

export async function getAllCounts(req: Request, res: Response, next: NextFunction) {
    try {
        const keyLogs = await KeyLogModel.countDocuments()
        const facilities = await FacilityModel.countDocuments()
        const residents = await ResidentModel.countDocuments()
        const rooms = await RoomModel.countDocuments()
        const visitLogs = await VisitLogModel.countDocuments()
        const visitors = await VisitorModel.countDocuments()
        const porters = await UserModel.countDocuments({ role: "PORTER" })
        const openVisitLogs = await VisitLogModel.countDocuments({checkout: null})
        const openKeyLogs = await KeyLogModel.countDocuments({closedAt: null})

        const data = {
            keyLogs,
            facilities,
            residents,
            rooms,
            visitLogs,
            visitors,
            porters,
            openVisitLogs,
            openKeyLogs,
        }

        res.status(200).json({
            success: true,
            message: 'Rooms fetched successfully',
            data,
        });
    } catch (error) {
        next(error)
    }
}