import { ReqRefDefaults, Request } from "@hapi/hapi/lib/types/request";
import { Credentials } from "shared";

export function getCredentials(request: Request<ReqRefDefaults>): Credentials {
  return request.auth.credentials as unknown as Credentials;
}
