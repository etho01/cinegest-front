"use client";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/src/component/ui/table/Table";
import { Price } from "@/src/domain/CinemaApi";
import { useRef, useState } from "react";
import { useLoadObjectAndShowModalRef } from "@/src/component/hook/useLoadObjectAndShowModal";
import { Button } from "@/src/component/ui/btn/button";
import { ConfirmationModal, ConfirmationModalRef } from "@/src/component/ui/modal/ConfirmationModal";
import { ErrorModal, ErrorModalRef } from "@/src/component/ui/modal/ErrorModal";
import { User, UserHasRight } from "@/src/domain/User";
import { deletePriceController } from "@/src/controller/app/CinemaApiController";
import { PriceModal } from "./PriceModal";

interface PriceListProps {
    entityId: number;
    cinemaApiId: number;
    prices: Price[];
    user: User;
}

export const PriceList = ({ entityId, cinemaApiId, prices: initialPrices, user }: PriceListProps) => {
    const [prices, setPrices] = useState(initialPrices);
    const modalRef = useRef<useLoadObjectAndShowModalRef<Price>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);
    const errorModalRef = useRef<ErrorModalRef>(null);

    return (
        <>
            <div className="flex justify-between">
                <div className="flex gap-3">
                </div>
                {UserHasRight(user, 'editCinemaApiPrices', null) && 
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modalRef.current?.createNew()}
                >
                    Créer un prix
                </Button>
                }
            </div>
            <Table>
                <Thead>
                    <Tr>
                        <Th className="w-1/3">Nom</Th>
                        <Th className="w-1/4">Montant</Th>
                        <Th className="w-1/6">Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {prices.map((price, index) => (
                        <Tr key={price.id} index={index}>
                            <Td>{price.name}</Td>
                            <Td>{price.amount}</Td>
                            <Td>
                                <div className="flex gap-3">
                                    {UserHasRight(user, 'editCinemaApiPrices', null) && 
                                    <Button
                                        variant="default"
                                        onClick={() => modalRef.current?.loadFromObject(price)}
                                    >
                                        Éditer
                                    </Button>
                                    }
                                    {UserHasRight(user, 'editCinemaApiPrices', null) && 
                                    <Button
                                        variant="remove"
                                        onClick={async () => {
                                            confirmationModalRef.current?.open(
                                                "Confirmer la suppression",
                                                "Êtes-vous sûr de vouloir supprimer ce prix ?",
                                                async () => {
                                                    const resp = await deletePriceController({ 
                                                        entityId: entityId, 
                                                        cinemaApiId: cinemaApiId, 
                                                        priceId: price.id 
                                                    });
                                                    if (resp?.serverError || resp?.validationErrors) {
                                                        errorModalRef.current?.open(
                                                            "Erreur lors de la suppression",
                                                            resp.serverError || "Une erreur est survenue lors de la suppression du prix."
                                                        );
                                                        return;
                                                    }
                                                    const updatedPrices = prices.filter(p => p.id !== price.id);
                                                    setPrices(updatedPrices);
                                                }
                                            );
                                        }}
                                    >
                                        Supprimer
                                    </Button>
                                    }
                                </div>
                            </Td>
                        </Tr>
                    ))}
                    {prices.length === 0 && (
                        <Tr>
                            <Td colSpan={4} className="text-center">Aucun prix disponible.</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            <ConfirmationModal ref={confirmationModalRef} />
            <ErrorModal ref={errorModalRef} />
            <PriceModal
                isOpen={false}
                onClose={() => {}}
                initialObject={null}
                ref={modalRef}
                entityId={entityId}
                cinemaApiId={cinemaApiId}
                onSaved={async (savedPrice) => {
                    const updatedPrices = [...prices];
                    const existingIndex = updatedPrices.findIndex(p => p.id === savedPrice.id);
                    if (existingIndex >= 0) {
                        // Update existing price
                        updatedPrices[existingIndex] = savedPrice;
                    } else {
                        // Add new price
                        updatedPrices.push(savedPrice);
                    }
                    setPrices(updatedPrices);
                }}
            />
        </>
    );
}