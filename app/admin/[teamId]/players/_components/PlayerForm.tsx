"use client";

import { createPlayerAction, editPlayerAction } from "@/app/actions/player.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadDropzone } from "@/lib/uploadthing";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { SubmitPlayerButton } from "./SubmitPlayerButton";

type Props = {
    teamId: string;
    player?: any; // pass when editing
};

const initialState = {
    status: undefined,
    message: "",
    errors: {},
};

export default function PlayerForm({ teamId, player }: Props) {
    const action = player ? editPlayerAction : createPlayerAction;
    const [state, formAction] = useActionState(action, initialState);
    const [imageUrl, setImageUrl] = useState<string>(player?.imageUrl || "");
    const [role, setRole] = useState(player?.role || "");
    const [battingStyle, setBattingStyle] = useState(player?.battingStyle || "");
    const [bowlingStyle, setBowlingStyle] = useState(player?.bowlingStyle || "");

    console.log("player", player)
    console.log("teamId", teamId)
    useEffect(() => {
        if (state?.status === "success") {
            toast.success(state.message);
        }
        if (state?.status === "error") {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-4">
            {/* hidden fields */}
            <Input type="hidden" name="teamId" value={teamId} />
            {player && <Input type="hidden" name="playerId" value={player.id} />}

            {/* Name */}
            <div>
                <Label className="label">Player Name *</Label>
                <Input
                    name="name"
                    defaultValue={player?.name}
                    className="input"
                    placeholder="Rohit Sharma"
                />
                {state.errors?.name && <p className="error">{state.errors.name}</p>}
            </div>

            {/* Role */}
            <div>
                <Label>Role *</Label>

                <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select player role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="BATTER">Batter</SelectItem>
                            <SelectItem value="BOWLER">Bowler</SelectItem>
                            <SelectItem value="ALL_ROUNDER">All Rounder</SelectItem>
                            <SelectItem value="WICKET_KEEPER">Wicket Keeper</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* THIS sends value to server */}
                <input type="hidden" name="role" value={role} />
            </div>

            {/* Nickname */}
            <div>
                <Label className="label">Nickname</Label>
                <Input
                    name="nickname"
                    defaultValue={player?.nickname}
                    className="input"
                    placeholder="Hitman"
                />
            </div>

            {/* Jersey Number */}
            <div>
                <Label className="label">Jersey Number</Label>
                <Input
                    name="jerseyNumber"
                    defaultValue={player?.jerseyNumber}
                    className="input"
                    type="number"
                    placeholder="45"
                />
            </div>

            {/* Batting Style */}
            <div>
                <Label>Batting Style</Label>

                <Select value={battingStyle} onValueChange={setBattingStyle}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select batting style" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="RIGHT_HANDED">Right Handed</SelectItem>
                            <SelectItem value="LEFT_HANDED">Left Handed</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <input type="hidden" name="battingStyle" value={battingStyle} />
            </div>

            {/* Bowling Style */}
            <div>
                <Label>Bowling Style</Label>

                <Select value={bowlingStyle} onValueChange={setBowlingStyle}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select bowling style" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="RIGHT_ARM_PACE">Right Arm Pace</SelectItem>
                            <SelectItem value="LEFT_ARM_PACE">Left Arm Pace</SelectItem>
                            <SelectItem value="RIGHT_ARM_OFF_SPIN">Right Arm Off Spin</SelectItem>
                            <SelectItem value="LEFT_ARM_OFF_SPIN">Left Arm Off Spin</SelectItem>
                            <SelectItem value="RIGHT_ARM_LEG_SPIN">Right Arm Leg Spin</SelectItem>
                            <SelectItem value="LEFT_ARM_LEG_SPIN">Left Arm Leg Spin</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <input type="hidden" name="bowlingStyle" value={bowlingStyle} />
            </div>

            {/* Debut Year */}
            <div>
                <Label className="label">Debut Year</Label>
                <Input
                    name="debutYear"
                    defaultValue={player?.debutYear}
                    className="input"
                    type="number"
                    placeholder="2022"
                />
            </div>

            {/* Image */}
            <div>
                <Label className="label">Player Image</Label>
                <UploadDropzone
                    endpoint="profileImageUploader"
                    onClientUploadComplete={(res) => {
                        setImageUrl(res[0].ufsUrl);
                    }}
                    onUploadError={(error: Error) => {
                        alert(`Upload failed: ${error.message}`);
                    }}
                />

                {imageUrl && (
                    <img src={imageUrl} alt="logo" className="h-20 rounded-md" />
                )}

                <input type="hidden" name="imageUrl" value={imageUrl} />
            </div>

           <SubmitPlayerButton player={player} />
        </form>
    );
}