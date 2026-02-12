"use client";

import React, { useActionState, useState } from "react";
import { useFormState } from "react-dom";
import { createTeamAction } from "@/app/actions/team.actions";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

const initialState = {
  status: undefined,
  message: "",
  errors: {},
};

const CreateTeamForm = () => {
  const [state, formAction] = useActionState(createTeamAction, initialState);

  const [logoUrl, setLogoUrl] = useState<string>("");
  const [bannerUrl, setBannerUrl] = useState<string>("");

  return (
    <form
      action={formAction}
      className="space-y-6 max-w-md mx-auto p-6 border rounded-xl"
    >
      <h2 className="text-2xl font-bold">Create Team</h2>

      {/* TEAM NAME */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Team Name *</label>
        <input
          name="name"
          placeholder="NBSC Sanglat"
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
          placeholder="Brothers in Cricket 🏏"
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* LOGO UPLOAD */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Team Logo</label>
        <UploadDropzone
          endpoint="profileImageUploader"
          onClientUploadComplete={(res) => {
            setLogoUrl(res[0].ufsUrl);
          }}
          onUploadError={(error: Error) => {
            alert(`Upload failed: ${error.message}`);
          }}
        />

        {logoUrl && (
          <img src={logoUrl} alt="logo" className="h-20 rounded-md" />
        )}

        <input type="hidden" name="logoUrl" value={logoUrl} />
      </div>

      {/* BANNER UPLOAD */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Team Banner</label>
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setBannerUrl(res[0].ufsUrl);
            console.log(res[0].ufsUrl)
          }}
          onUploadError={(error: Error) => {
            alert(`Upload failed: ${error.message}`);
          }}
        />

        {bannerUrl && (
          <img src={bannerUrl} alt="banner" className="h-24 rounded-md" />
        )}

        <input type="hidden" name="bannerUrl" value={bannerUrl} />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md"
      >
        Create Team
      </button>

      {/* MESSAGE */}
      {state?.message && (
        <p
          className={`text-sm ${
            state.status === "error" ? "text-red-500" : "text-green-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
};

export default CreateTeamForm;
