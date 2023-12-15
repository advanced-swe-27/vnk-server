export type VoidFunction = () => void;

export type UserRoles = "SUDO" | "ADMIN" | "PORTER"
export type KeyStatus = "assigned" | "unassigned" | "missing" | "unknown"

export interface MailData {
    name?: string;
    email?: string | string[];
    subject: string;
    message: string;
    cc?: string | string[];
    bcc?: string | string[];
    from?: {
        name: string;
        address: string;
    }
    sender?: {
        name: string;
        address: string;
    }
}

export type Level = "100" | "200" | "300" | "400" | "500" | "600" | "700"

export type MongoResponse = {
    _id: string
    createdAt: NativeDate
    updatedAt: NativeDate
    __v?: number
}


export type User = {
    surname: string
    othernames: string
    email: string
    password: string
    role: UserRoles
    token: string
    phone: string
    isFirstLogin: boolean
}

export type Resident = {
    surname: string
    othernames: string
    dob: string
    email: string
    sid: string
    programme: string
    level: Level
    imageUrl: string
    phone: string
}

export type Visitor = {
    surname: string
    othernames: string
    phone: string
    email: string
    residence: string
    sid?: string
    isStudent: boolean
    flagged: boolean
}

export type Room = {
    number: string
    capacity: number
    gender: "male" | "female"
    key: string | Key
}

export type Facility = {
    name: string
    description: string
}

export type Key = {
    room: Room | string
    status: KeyStatus
}

export type VisitLog = {
    visitor: string | Visitor
    checkin: Date
    checkout: Date
    place: string | Room | Facility
    isVisitingResident: boolean
    visitee?: string | Resident
}

export type KeyLog = {
    resident: string | Resident
    checkin: Date
    checkout: Date
    room: string | Room
}

export type UserRes = User & MongoResponse
export type ResidentRes = Resident & MongoResponse
export type VisitorRes = Visitor & MongoResponse
export type RoomRes = Room & MongoResponse
export type FacilityRes = Facility & MongoResponse
export type KeyRes = Key & MongoResponse
export type VisitLogRes = VisitLog & MongoResponse
export type KeyLogRes = KeyLog & MongoResponse


export type CreateUserInput = {
    othernames: string
    surname: string
    email: string
    phone: string
    // role: UserRoles
}

export type LoginUserInput = {
    email: string
    password: string
}

export type ChangePasswordInput = {
    email: string
    oldPassword: string
    newPassword: string
}

export type ResetPasswordInput = Pick<ChangePasswordInput, "newPassword"> & {
    email: string
}

export type SendCodeInput = Pick<LoginUserInput, "email">

export type VerifyCodeInput = SendCodeInput & {
    code: string
}