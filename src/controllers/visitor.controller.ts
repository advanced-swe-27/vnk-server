import _ from "lodash"
import { __genPassword } from "../helpers/string";
import { ResidentModel, RoomModel, VisitorModel } from "../models"
import { NextFunction, Request, Response } from 'express';
import { createError } from "../utils";
import { Resident, Visitor } from "../types";

export async function createVisitor(req: Request<{}, {}, Visitor>, res: Response, next: NextFunction) {
    const { email, isStudent, othernames, phone, residence, surname, sid } = req.body
    // console.log({ email, isStudent, othernames, phone, residence, surname, sid })
    try {
        if (!email  || !othernames || !phone || !surname  || !residence) {
            return next(createError(400, 'Provide all required fields'));
        } 
        
        const visitorExists = await VisitorModel.findOne({ email }) || await VisitorModel.findOne({ sid })

        if (visitorExists) {
            return next(createError(409, 'Visitor Exists with this email / student id'));
        }

        const newRoom = new VisitorModel<Omit<Visitor , "flagged">>({
            email,
            isStudent: isStudent || false,
            othernames,
            phone,
            residence,
            surname,
            sid
        })

        await newRoom.save()

        res.status(201).json({
            success: true,
            data: newRoom,
        });

    } catch (error) {
        next(error)
    }

}

export async function getAllVisitors(req: Request, res: Response, next: NextFunction) {
    try {
        const visitors = await VisitorModel.find()

        res.status(200).json({
            success: true,
            message: 'visitors fetched successfully',
            data: visitors,
        });
    } catch (error) {
        next(error)
    }
}

export async function getVisitorById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide visitor id'));
        }

        const visitor = await VisitorModel.findById(id)

        if (!visitor) {
            return next(createError(404, "visitor not found"))
        }

        res.status(200).json({
            success: true,
            message: 'visitor fetched successfully',
            data: visitor,
        });
    } catch (error) {
        next(error)
    }
}

export async function updateVisitor(req: Request<{ id: string }, {}, Visitor>, res: Response, next: NextFunction) {
    const { id } = req.params
    const { email, isStudent, othernames, phone, residence, surname, sid } = req.body
    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const visitor = await VisitorModel.findById(id)

        if (!visitor) {
            return next(createError(404, "visitor not found"))
        }

        const deletedVisitor = await VisitorModel.findByIdAndUpdate(id, {
            email,
            isStudent: isStudent || false,
            othernames,
            phone,
            residence,
            surname,
            sid
        }, {
            new: true
        })

        res.status(200).json({
            success: true,
            message: 'Visitor update successfully',
            data: deletedVisitor,
        });
    } catch (error) {
        next(error)
    }
}

export async function flagVisitor(req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const visitor = await VisitorModel.findById(id)

        if (!visitor) {
            return next(createError(404, "visitor not found"))
        }

        const deletedVisitor = await VisitorModel.findByIdAndUpdate(id, {
            flagged: true
        }, {
            new: true
        })

        res.status(200).json({
            success: true,
            message: 'Visitor update successfully',
            data: deletedVisitor,
        });
    } catch (error) {
        next(error)
    }
}

export async function unflagVisitor(req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const visitor = await VisitorModel.findById(id)

        if (!visitor) {
            return next(createError(404, "Visitor not found"))
        }

        const deletedVisitor = await VisitorModel.findByIdAndUpdate(id, {
            flagged: false
        }, {
            new: true
        })

        res.status(200).json({
            success: true,
            message: 'Visitor update successfully',
            data: deletedVisitor,
        });
    } catch (error) {
        next(error)
    }
}


export async function deleteVisitor(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide visitor id'));
        }

        const visitor = await VisitorModel.findById(id)

        if (!visitor) {
            return next(createError(404, "visitor not found"))
        }

        const deletedVisitor = await VisitorModel.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'Visitor deleted successfully',
            data: deletedVisitor,
        });
    } catch (error) {
        next(error)
    }
}