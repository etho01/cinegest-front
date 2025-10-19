import { UserRepository } from "@/src/application/repositories/UserRepository";
import { Unauthenticated, UserLog } from "@/src/domain/entities/User";
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
    getUser: async () => {
      let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/me`, {}, {});

      if (resp.status == 401)
      {
        throw new Unauthenticated();
      }

      let text = await resp.text();
      let body = JSON.parse(text);
      console.log(body, resp);
    }
}