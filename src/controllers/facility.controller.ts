import _ from "lodash"
import { FacilityModel, KeyModel, ResidentModel, } from "../models"
import { NextFunction, Request, Response } from 'express';
import { createError } from "../utils";
import { Facility, Room } from "../types";

export async function createFacility(req: Request<{}, {}, Facility>, res: Response, next: NextFunction) {
    const { description, name } = req.body

    try {
        if (!name || !description) {
            return next(createError(400, 'Provide all required fields'));
        }

        const newFacility = new FacilityModel({
            name,
            description
        })

        await newFacility.save()

        res.status(201).json({
            success: true,
            data: newFacility,
        });

    } catch (error) {
        next(error)
    }

}

export async function getAllFacilities(req: Request, res: Response, next: NextFunction) {
    try {
        const facilities = await FacilityModel.find()

        res.status(200).json({
            success: true,
            message: 'Facilities fetched successfully',
            data: facilities,
        });
    } catch (error) {
        next(error)
    }
}

export async function getFacilityById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide facility id'));
        }

        const facility = await FacilityModel.findById(id)

        if (!facility) {
            return next(createError(404, "Facility not found"))
        }

        res.status(200).json({
            success: true,
            message: 'Facility fetched successfully',
            data: facility,
        });
    } catch (error) {
        next(error)
    }
}

export async function updateFacility(req: Request<{ id: string }, {}, Facility>, res: Response, next: NextFunction) {
    const { id } = req.params
    const { name, description } = req.body
    try {
        if (!id) {
            return next(createError(400, 'Provide facility id'));
        }

        const facility = await FacilityModel.findById(id)

        if (!facility) {
            return next(createError(404, "Facility not found"))
        }

        const updatedFacility = await FacilityModel.findByIdAndUpdate(id, {
            name,
            description
        }, {
            new: true
        })

        res.status(200).json({
            success: true,
            message: 'Facility updated successfully',
            data: updatedFacility,
        });
    } catch (error) {
        next(error)
    }
}



export async function deleteFacility(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide facility id'));
        }

        const facility = await FacilityModel.findById(id)

        if (!facility) {
            return next(createError(404, "Facility not found"))
        }

        const deletedFacility = await FacilityModel.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'Room deleted successfully',
            data: deletedFacility,
        });
    } catch (error) {
        next(error)
    }
}