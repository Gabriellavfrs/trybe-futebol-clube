export type ServiceResponseError = {
  status: string,
  data: { message: string }
};

export type ServiceResponseSuccess<T> = {
  status: string,
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
