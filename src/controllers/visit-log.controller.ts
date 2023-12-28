import _ from "lodash"
import { RoomModel, ResidentModel, VisitLogModel, VisitorModel, FacilityModel } from "../models"
import { NextFunction, Request, Response } from 'express';
import { createError } from "../utils";
import { VisitLog } from '../types';


export async function createVisitLog(req: Request<{}, {}, VisitLog>, res: Response, next: NextFunction) {
    const { visitor, checkout, room } = req.body;

    try {
        if (!visitor || !room) {
            return next(createError(400, 'Provide all required fields'));
        }

        const visitorExists = await VisitorModel.findById(visitor);
        if (!visitorExists) {
            return next(createError(404, 'Visitor does not exist'));
        }

        const roomExists = await RoomModel.findById(room);
        if (!roomExists) {
            return next(createError(404, 'Room does not exist'));
        }

        const newVisitLog = new VisitLogModel({
            visitor,
            room,
        });

        const createdVisitLog = await newVisitLog.save();

        await createdVisitLog.populate('visitor room')

        res.status(201).json({
            success: true,
            data: createdVisitLog
        });

    } catch (error) {
        next(error);
    }
}

export async function closeVisitLog(req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        if (!id) {
            return next(createError(400, 'Provide all required fields'));
        }

        const visitLogExists = await VisitLogModel.findById(id);

        if (!visitLogExists) {
            return next(createError(404, 'Visit Log does not exist'));
        }

        // Check if visit log is already closed
        if (visitLogExists.checkout) {
            return next(createError(400, 'Visit Log is already closed.'));
        }

        const updatedVisitLog = await VisitLogModel.findByIdAndUpdate(id, {
            checkout: new Date(), 
        }, { new: true }).populate('visitor room');

        res.status(200).json({
            success: true,
            data: updatedVisitLog,
        });

    } catch (error) {
        next(error);
    }
}


export async function getAllVisitLogs(req: Request, res: Response, next: NextFunction) {
    try {
        const visitLogs = await VisitLogModel.find().populate('visitor room');

        res.status(200).json({
            success: true,
            message: 'Visit Logs fetched successfully',
            data: visitLogs,
        });
    } catch (error) {
        next(error);
    }
}

export async function getVisitLogById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        if (!id) {
            return next(createError(400, 'Provide visit log id'));
        }

        const visitLog = await VisitLogModel.findById(id).populate('visitor room');

        if (!visitLog) {
            return next(createError(404, 'Visit log not found'));
        }

        res.status(200).json({
            success: true,
            message: 'Visit Log fetched successfully',
            data: visitLog,
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteVisitLog(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        if (!id) {
            return next(createError(400, 'Provide visit log id'));
        }

        const visitLog = await VisitLogModel.findByIdAndDelete(id).populate('visitor room');

        if (!visitLog) {
            return next(createError(404, 'Visit log not found'));
        }

        res.status(200).json({
            success: true,
            message: 'Visit Log deleted successfully',
            data: visitLog,
        });
    } catch (error) {
        next(error);
    }
}

export async function getVisitLogByRoom(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const room = await RoomModel.findById(id);

        if (!room) {
            return next(createError(404, 'Room not found'));
        }

        const visitLogs = await VisitLogModel.find({ room: id }).populate('visitor room');

        res.status(200).json({
            success: true,
            message: 'Visit Logs fetched successfully',
            data: visitLogs,
        });
    } catch (error) {
        next(error);
    }
}
