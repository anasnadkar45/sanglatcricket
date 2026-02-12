"use client";

import React, { useActionState, useEffect, useState } from "react";
import { editTeamAction } from "@/app/actions/team.actions";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

const initialState = {
  status: undefined,
  message: "",
  errors: {},
};

type Props = {
  team: {
    id: string;
    name: string;
    tagline?: string | null;
    logoUrl?: string | null;
    bannerUrl?: string | null;
  };
};

const EditTeamForm = ({ team }: Props) => {
  const [state, formAction] = useActionState(editTeamAction, initialState);

  const [logoUrl, setLogoUrl] = useState<string>(team.logoUrl || "");
  const [bannerUrl, setBannerUrl] = useState<string>(team.bannerUrl || "");

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message || "Team updated!");
    }
    if (state?.status === "error") {
      toast.error(state.message || "Something went wrong");
    }
  }, [state]);
  return (
    <form action={formAction} className="space-y-6 max-w-md mx-auto p-6 border rounded-xl">
      <h2 className="text-2xl font-bold">Edit Team</h2>

      {/* hidden team id */}
      <input type="hidden" name="teamId" value={team.id} />

      {/* NAME */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Team Name *</label>
        <input
          name="name"
          defaultValue={team.name}
          className="w-full border p-2 rounded-md"
        />
        {state?.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
        )}
      </div>

      {/* TAGLINE */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Tagline</label>
        <input
          name="tagline"
          defaultValue={team.tagline || ""}
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* LOGO */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Team Logo</label>
        <UploadDropzone
          endpoint="profileImageUploader"
          onClientUploadComplete={(res) => setLogoUrl(res[0].ufsUrl)}
          onUploadError={(error: Error) => alert(error.message)}
        />

        {logoUrl && <img src={logoUrl} className="h-20 rounded-md" />}
        <input type="hidden" name="logoUrl" value={logoUrl} />
      </div>

      {/* BANNER */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Team Banner</label>
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => setBannerUrl(res[0].ufsUrl)}
          onUploadError={(error: Error) => alert(error.message)}
        />

        {bannerUrl && <img src={bannerUrl} className="h-24 rounded-md" />}
        <input type="hidden" name="bannerUrl" value={bannerUrl} />
      </div>

      <button type="submit" className="w-full bg-black text-white py-2 rounded-md">
        Update Team
      </button>

      {state?.message && (
        <p className={`text-sm ${state.status === "error" ? "text-red-500" : "text-green-600"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
};

export default EditTeamForm;
