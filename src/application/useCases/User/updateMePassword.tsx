
import { UserRepository } from "../../repositories/UserRepository";

export interface UpdateMePasswordProps {
    actualPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}

export const updateMePassword = async (repo : UserRepository, props: UpdateMePasswordProps): Promise<void> => {
    repo.updateMePassword(props);
}