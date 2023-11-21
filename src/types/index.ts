export type VoidFunction = () => void;

export type UserRoles = "hall-tutor" | "chief-porter" | "porter"

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