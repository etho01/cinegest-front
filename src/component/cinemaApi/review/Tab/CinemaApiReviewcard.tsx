"use client";
import { FormButton } from "@/src/component/ui/btn/form-button";
import { formError, Select } from "@/src/component/ui/form";
import Input from "@/src/component/ui/form/Input";
import { updateCinemaApiController } from "@/src/controller/app/CinemaApiController";
import { Cinema } from "@/src/domain/Cinema";
import { CinemaApi } from "@/src/domain/CinemaApi";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

interface CinemaApiReviewcardProps {
    cinemaApi: CinemaApi;
    entityId: number;
    cinemas: Cinema[];
}

export const CinemaApiReviewcard = ({ cinemaApi, entityId, cinemas }: CinemaApiReviewcardProps) => {
    cinemaApi.cinemaIds = cinemaApi.cinemas?.map(cinema => cinema.id) || [];

    const { executeAsync, hasErrored, result } = useAction(updateCinemaApiController);

    const [cinemaApiUpdated, setCinemaApiUpdated] = useState<CinemaApi>(cinemaApi);

    return (
        <>
            <form onSubmit={async (e) => {
                e.preventDefault();
                await executeAsync({ ...cinemaApiUpdated, entityId : parseInt(entityId.toString()), cinemaIds: cinemaApiUpdated.cinemaIds || [] });
            }}>
                <div className="flex flex-col gap-2">
                    <Input className="col-span-2 w-full" label="Nom de l'API" value={cinemaApiUpdated.name} onChange={(value) => {
                        setCinemaApiUpdated({...cinemaApiUpdated, name: value});
                    }} />
                    <Input 
                        className="col-span-2 w-full" 
                        label="URL du site web" 
                        value={cinemaApiUpdated.websiteUrl || ""} 
                        onChange={(value) => {
                            setCinemaApiUpdated({...cinemaApiUpdated, websiteUrl: value});
                        }}
                        required
                        placeholder="https://exemple.com"
                    />
                    <Select 
                        errors={result.validationErrors?.cinemaIds as formError | undefined}
                        label="Cinémas" 
                        placeholder="Sélectionner les cinémas"
                        value={cinemaApiUpdated.cinemaIds || []} 
                        onChange={(value) => {
                            setCinemaApiUpdated({ ...cinemaApiUpdated, cinemaIds: value });
                        }} 
                        options={cinemas.map((cinema) => ({ label: cinema.name, value: cinema.id }))}
                        isMulti
                        required
                        containerClassName=" col-span-2 "
                    />
                </div>
                <div className="flex justify-end mt-5">
                    <FormButton>
                        Sauvegarder
                    </FormButton>
                </div>
            </form>
            { hasErrored ? <div className="text-red-500">{result.serverError}</div> : null }
        </>
    );
}