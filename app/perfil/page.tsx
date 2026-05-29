"use client";

import { EditForm, ProfileData, HeaderCard } from './layout';
import { useUserProfileForm } from './logic';
export default function CriarEvento() {
    const { initials, isEditing, isSaving, saved, isLoading, error, profile, draft, errors, handleChange, handleEdit, handleCancel, handleSave } = useUserProfileForm();
    
    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
            <div className="w-full max-w-lg flex flex-col gap-5">
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl p-6 flex flex-col items-center gap-4">
                    <HeaderCard
                        initials={initials}
                        profile={profile}
                    />
                    {isLoading && (
                        <p className="text-xs text-zinc-400">Carregando...</p>
                    )}
                    {error && (
                        <p className="text-xs text-red-400" role="alert">
                            {error}
                        </p>
                    )}
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl p-8">
                    {!isEditing ? (
                        <ProfileData
                            profile={profile}
                            saved={saved}
                            handleEdit={handleEdit}
                        />
                    ) : (
                        <EditForm
                            draft={draft}
                            isSaving={isSaving}
                            errors={errors}
                            handleSave={handleSave}
                            handleChange={handleChange}
                            handleCancel={handleCancel}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
