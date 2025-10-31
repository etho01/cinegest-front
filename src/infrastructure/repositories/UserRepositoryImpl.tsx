import { UserRepository } from "@/src/application/repositories/UserRepository";
import { Unauthenticated, User, UserLog } from "@/src/domain/User";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import fsPromises from 'fs/promises';


export const UserRepositoryImpl: UserRepository = {
    connect : async (userLog : UserLog) => {
        let resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/auth/login`, userLog, {});

        let text = await resp.text()
        let body = JSON.parse(text);
        return body['token'];
    },
    logout: async () => {
      await ApiRequestServeur.POST(`${process.env.API_URL}api/app/auth/logout`, {}, {});
    },
    getUser: async () : Promise<User> => {
      let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/me`, {}, {});

      if (resp.status == 401)
      {
        throw new Unauthenticated();
      }

      let text = await resp.text();
      let body = JSON.parse(text);

      let roles = body['roles'].map((roleData: any) => {
        return {
          id : roleData['id'],
          name : roleData['name'],
          cinemaId : roleData['pivot']['cinema_id'],
          entityId : roleData['entity_id']
        }
      });
      
      return {
        id : body['id'],
        email : body['email'],
        firstname : body['firstname'],
        lastname : body['lastname'],
        phone : body['phone'],
        roles : roles,
        isSuperAdmin : body['isSuperAdmin']
      }
    }
}