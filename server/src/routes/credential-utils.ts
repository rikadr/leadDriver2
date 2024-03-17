import { notFound } from "@hapi/boom";
import { ReqRefDefaults, Request } from "@hapi/hapi/lib/types/request";
import { Credentials } from "shared";

export function getCredentials(
  request: Request<ReqRefDefaults>
): Credentials | undefined {
  return request.auth.credentials as unknown as Credentials | undefined;
}

export function getCredentialsDefined(
  request: Request<ReqRefDefaults>
): Credentials {
  const credentials = getCredentials(request);
  if (!credentials || !credentials.userId) {
    throw notFound("Invalid credentials");
  }
  return credentials;
}
