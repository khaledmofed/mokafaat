import { api } from "../apiClient";

export const APIGetMidellware = async (fullPath: string, params: any) => {
  return await api
    .get(fullPath, params)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const APIGetPaginationMidellware = async (
  fullPath: string,
  params: any
) => {
  const { page, perPage } = params;
  return await api
    .get(`${fullPath}page=${page}&perPage=${perPage}`, {})
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const APIPostWithDataMidellware = async (
  fullPath: string,
  params: any
) => {
  return await api
    .post(fullPath, params)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const APIPostMidellware = async (
  fullPath: string,
  params: any,
  headers?: {}
) => {
  return await api
    .post(fullPath, params, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
};

export const APIPatchMidellware = async (
  fullPath: string,
  params: any,
  headers?: {}
) => {
  return await api
    .patch(fullPath, params, headers)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const APIDeleteMidellware = async (fullPath: string, params: any) => {
  return await api
    .delete(fullPath, { data: params })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
};
