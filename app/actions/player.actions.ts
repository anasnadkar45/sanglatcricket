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

const playerSchema = z.object({
    teamId: z.string().min(1, "Team is required"),
    name: z.string().min(1, "Player name is required"),
    role: z.enum(["BATTER", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"]),

    nickname: z.string().optional(),
    jerseyNumber: z
        .string()
        .optional()
        .transform(val => (val ? Number(val) : undefined)),

    battingStyle: z.string().optional(),
    bowlingStyle: z.string().optional(),
    debutYear: z
        .string()
        .optional()
        .transform(val => (val ? Number(val) : undefined)),

    imageUrl: z.string().optional(),
});
export async function createPlayerAction(prevState: any, formData: FormData) {
    const user = await requireUser();

    if (!user) {
        return {
            status: "error",
            message: 'User not found. Please login to add new car'
        }
    }

    const validateFields = playerSchema.safeParse({
        teamId: formData.get("teamId"),
        name: formData.get("name"),
        role: formData.get("role"),
        nickname: formData.get("nickname"),
        jerseyNumber: formData.get("jerseyNumber"),
        battingStyle: formData.get("battingStyle"),
        bowlingStyle: formData.get("bowlingStyle"),
        debutYear: formData.get("debutYear"),
        imageUrl: formData.get("imageUrl"),
    })

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Validation failed.",
            errors: validateFields.error.flatten().fieldErrors,
        };
    }
    try {
        const data = await prisma.player.create({
            data: validateFields.data,
        });

        const state: State = {
            status: "success",
            message: "Player added successfully 🏏",
        };
        return state;
    } catch (error) {
        console.log(error)
        return {
            status: "error",
            message: "Error creating player.",
        };
    }
}


export async function editPlayerAction(prevState: any, formData: FormData) {
    const user = await requireUser();

    if (!user) {
        return {
            status: "error",
            message: "User not found. Please login.",
        };
    }

    const playerId = formData.get("playerId") as string;

    const validatedFields = playerSchema.safeParse({
        teamId: formData.get("teamId"),
        name: formData.get("name"),
        role: formData.get("role"),
        nickname: formData.get("nickname"),
        jerseyNumber: formData.get("jerseyNumber"),
        battingStyle: formData.get("battingStyle"),
        bowlingStyle: formData.get("bowlingStyle"),
        debutYear: formData.get("debutYear"),
        imageUrl: formData.get("imageUrl"),
    });

    if (!validatedFields.success) {
        return {
            status: "error",
            message: "Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    try {
        await prisma.player.update({
            where: { id: playerId },
            data: validatedFields.data,
        });

        return {
            status: "success",
            message: "Player updated successfully 🎉",
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Error updating player.",
        };
    }
}