import { AxiosError, AxiosResponse } from "axios";

export function parseAxiosTrpcResponse<D = string>(
  res: AxiosResponse | AxiosError
): ParseAxiosTrpcResponse<D> {
  if (res instanceof Error) {
    const errorMessage = (res.response as TRPCErrorAxios).data.error.message;
    return { success: false, message: errorMessage ?? "An error occured" };
  }
  const data = res.data.result.data as D;
  return { success: true, data };
}

type TRPCErrorAxios = { data: { error: { message: string } } };
type ParseAxiosTrpcResponse<T> = { success: false; message: string } | { success: true; data: T };
