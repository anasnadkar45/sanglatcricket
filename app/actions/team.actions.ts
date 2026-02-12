"use server"

import prisma from "@/lib/db";
import { requireUser } from "@/lib/require-user"
import z from "zod";

export type State = {
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
};

const teamSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required"),
    tagline: z
        .string()
        .optional(),
    bannerUrl: z
        .string()
        .optional(),
    logoUrl: z
        .string()
        .optional()
})
export async function createTeamAction(prevState: any, formData: FormData) {
    const user = await requireUser();

    if (!user) {
        return {
            status: "error",
            message: 'User not found. Please login to add new car'
        }
    }

    const validateFields = teamSchema.safeParse({
        name: formData.get('name'),
        tagline: formData.get('tagline'),
        bannerUrl: formData.get('bannerUrl'),
        logoUrl: formData.get('logoUrl')
    })

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Validation failed.",
            errors: validateFields.error.flatten().fieldErrors,
        };
    }
    try {
        const data = await prisma.team.create({
            data: {
                name: validateFields.data.name,
                tagline: validateFields.data.tagline,
                logoUrl: validateFields.data.logoUrl,
                bannerUrl: validateFields.data.bannerUrl,
            }
        })

        if (data) {
            return {
                status: "success",
                message: "Your Team has been created successfully",
            };
        }

        const state: State = {
            status: "success",
            message: "Your Tean has been created successfully",
        };
        return state;
    } catch (error) {
        console.log(error)
        return {
            status: "error",
            message: "An error occurred while Adding the team. Please try again later.",
        };
    }
}


export async function editTeamAction(prevState: any, formData: FormData) {
    const user = await requireUser();

    if (!user) {
        return {
            status: "error",
            message: "User not found. Please login.",
        };
    }

    const validatedFields = teamSchema.safeParse({
        id: formData.get("id"),
        name: formData.get("name"),
        tagline: formData.get("tagline"),
        bannerUrl: formData.get("bannerUrl"),
        logoUrl: formData.get("logoUrl"),
    });

    if (!validatedFields.success) {
        return {
            status: "error",
            message: "Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const teamId = formData.get('teamId') as string;
    try {
        await prisma.team.update({
            where: { id: teamId },
            data: {
                name: validatedFields.data.name,
                tagline: validatedFields.data.tagline,
                bannerUrl: validatedFields.data.bannerUrl,
                logoUrl: validatedFields.data.logoUrl,
            },
        });

        return {
            status: "success",
            message: "Team updated successfully 🎉",
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Something went wrong while updating team.",
        };
    }
}