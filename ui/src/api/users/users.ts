/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * API V1
 * OpenAPI spec version: v1
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  GetUsersId200,
  GetUsersId403,
  GetUsersId404,
  PostUsers201,
  PostUsers422,
  PostUsersBody,
  PutUsersId200,
  PutUsersId403,
  PutUsersIdBody
} from '.././model';





/**
 * @summary list users
 */
export type getUsersResponse200 = {
  data: void
  status: 200
}

export type getUsersResponse403 = {
  data: void
  status: 403
}
    
export type getUsersResponseComposite = getUsersResponse200 | getUsersResponse403;
    
export type getUsersResponse = getUsersResponseComposite & {
  headers: Headers;
}

export const getGetUsersUrl = () => {


  

  return `http://localhost:3000/users`
}

export const getUsers = async ( options?: RequestInit): Promise<getUsersResponse> => {
  
  const res = await fetch(getGetUsersUrl(),
  {      
    ...options,
    method: 'GET'
    
    
  }
)

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: getUsersResponse['data'] = body ? JSON.parse(body) : {}

  return { data, status: res.status, headers: res.headers } as getUsersResponse
}



export const getGetUsersQueryKey = () => {
    return [`http://localhost:3000/users`] as const;
    }

    
export const getGetUsersQueryOptions = <TData = Awaited<ReturnType<typeof getUsers>>, TError = void>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUsersQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsers>>> = ({ signal }) => getUsers({ signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetUsersQueryResult = NonNullable<Awaited<ReturnType<typeof getUsers>>>
export type GetUsersQueryError = void


export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = void>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUsers>>,
          TError,
          Awaited<ReturnType<typeof getUsers>>
        > , 'initialData'
      >, fetch?: RequestInit}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = void>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUsers>>,
          TError,
          Awaited<ReturnType<typeof getUsers>>
        > , 'initialData'
      >, fetch?: RequestInit}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = void>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>>, fetch?: RequestInit}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary list users
 */

export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = void>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>>, fetch?: RequestInit}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetUsersQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary create user
 */
export type postUsersResponse201 = {
  data: PostUsers201
  status: 201
}

export type postUsersResponse403 = {
  data: void
  status: 403
}

export type postUsersResponse422 = {
  data: PostUsers422
  status: 422
}
    
export type postUsersResponseComposite = postUsersResponse201 | postUsersResponse403 | postUsersResponse422;
    
export type postUsersResponse = postUsersResponseComposite & {
  headers: Headers;
}

export const getPostUsersUrl = () => {


  

  return `http://localhost:3000/users`
}

export const postUsers = async (postUsersBody: PostUsersBody, options?: RequestInit): Promise<postUsersResponse> => {
  
  const res = await fetch(getPostUsersUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      postUsersBody,)
  }
)

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: postUsersResponse['data'] = body ? JSON.parse(body) : {}

  return { data, status: res.status, headers: res.headers } as postUsersResponse
}




export const getPostUsersMutationOptions = <TError = void | PostUsers422,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postUsers>>, TError,{data: PostUsersBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof postUsers>>, TError,{data: PostUsersBody}, TContext> => {
    
const mutationKey = ['postUsers'];
const {mutation: mutationOptions, fetch: fetchOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, fetch: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postUsers>>, {data: PostUsersBody}> = (props) => {
          const {data} = props ?? {};

          return  postUsers(data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostUsersMutationResult = NonNullable<Awaited<ReturnType<typeof postUsers>>>
    export type PostUsersMutationBody = PostUsersBody
    export type PostUsersMutationError = void | PostUsers422

    /**
 * @summary create user
 */
export const usePostUsers = <TError = void | PostUsers422,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postUsers>>, TError,{data: PostUsersBody}, TContext>, fetch?: RequestInit}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postUsers>>,
        TError,
        {data: PostUsersBody},
        TContext
      > => {

      const mutationOptions = getPostUsersMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary show user
 */
export type getUsersIdResponse200 = {
  data: GetUsersId200
  status: 200
}

export type getUsersIdResponse403 = {
  data: GetUsersId403
  status: 403
}

export type getUsersIdResponse404 = {
  data: GetUsersId404
  status: 404
}
    
export type getUsersIdResponseComposite = getUsersIdResponse200 | getUsersIdResponse403 | getUsersIdResponse404;
    
export type getUsersIdResponse = getUsersIdResponseComposite & {
  headers: Headers;
}

export const getGetUsersIdUrl = (id: number,) => {


  

  return `http://localhost:3000/users/${id}`
}

export const getUsersId = async (id: number, options?: RequestInit): Promise<getUsersIdResponse> => {
  
  const res = await fetch(getGetUsersIdUrl(id),
  {      
    ...options,
    method: 'GET'
    
    
  }
)

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: getUsersIdResponse['data'] = body ? JSON.parse(body) : {}

  return { data, status: res.status, headers: res.headers } as getUsersIdResponse
}



export const getGetUsersIdQueryKey = (id: number,) => {
    return [`http://localhost:3000/users/${id}`] as const;
    }

    
export const getGetUsersIdQueryOptions = <TData = Awaited<ReturnType<typeof getUsersId>>, TError = GetUsersId403 | GetUsersId404>(id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUsersIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsersId>>> = ({ signal }) => getUsersId(id, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetUsersIdQueryResult = NonNullable<Awaited<ReturnType<typeof getUsersId>>>
export type GetUsersIdQueryError = GetUsersId403 | GetUsersId404


export function useGetUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = GetUsersId403 | GetUsersId404>(
 id: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUsersId>>,
          TError,
          Awaited<ReturnType<typeof getUsersId>>
        > , 'initialData'
      >, fetch?: RequestInit}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = GetUsersId403 | GetUsersId404>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUsersId>>,
          TError,
          Awaited<ReturnType<typeof getUsersId>>
        > , 'initialData'
      >, fetch?: RequestInit}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = GetUsersId403 | GetUsersId404>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>>, fetch?: RequestInit}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary show user
 */

export function useGetUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = GetUsersId403 | GetUsersId404>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>>, fetch?: RequestInit}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetUsersIdQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary update user
 */
export type putUsersIdResponse200 = {
  data: PutUsersId200
  status: 200
}

export type putUsersIdResponse403 = {
  data: PutUsersId403
  status: 403
}

export type putUsersIdResponse422 = {
  data: void
  status: 422
}
    
export type putUsersIdResponseComposite = putUsersIdResponse200 | putUsersIdResponse403 | putUsersIdResponse422;
    
export type putUsersIdResponse = putUsersIdResponseComposite & {
  headers: Headers;
}

export const getPutUsersIdUrl = (id: number,) => {


  

  return `http://localhost:3000/users/${id}`
}

export const putUsersId = async (id: number,
    putUsersIdBody: PutUsersIdBody, options?: RequestInit): Promise<putUsersIdResponse> => {
  
  const res = await fetch(getPutUsersIdUrl(id),
  {      
    ...options,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      putUsersIdBody,)
  }
)

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: putUsersIdResponse['data'] = body ? JSON.parse(body) : {}

  return { data, status: res.status, headers: res.headers } as putUsersIdResponse
}




export const getPutUsersIdMutationOptions = <TError = PutUsersId403 | void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putUsersId>>, TError,{id: number;data: PutUsersIdBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof putUsersId>>, TError,{id: number;data: PutUsersIdBody}, TContext> => {
    
const mutationKey = ['putUsersId'];
const {mutation: mutationOptions, fetch: fetchOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, fetch: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putUsersId>>, {id: number;data: PutUsersIdBody}> = (props) => {
          const {id,data} = props ?? {};

          return  putUsersId(id,data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutUsersIdMutationResult = NonNullable<Awaited<ReturnType<typeof putUsersId>>>
    export type PutUsersIdMutationBody = PutUsersIdBody
    export type PutUsersIdMutationError = PutUsersId403 | void

    /**
 * @summary update user
 */
export const usePutUsersId = <TError = PutUsersId403 | void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putUsersId>>, TError,{id: number;data: PutUsersIdBody}, TContext>, fetch?: RequestInit}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putUsersId>>,
        TError,
        {id: number;data: PutUsersIdBody},
        TContext
      > => {

      const mutationOptions = getPutUsersIdMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary delete user
 */
export type deleteUsersIdResponse200 = {
  data: void
  status: 200
}

export type deleteUsersIdResponse403 = {
  data: void
  status: 403
}
    
export type deleteUsersIdResponseComposite = deleteUsersIdResponse200 | deleteUsersIdResponse403;
    
export type deleteUsersIdResponse = deleteUsersIdResponseComposite & {
  headers: Headers;
}

export const getDeleteUsersIdUrl = (id: number,) => {


  

  return `http://localhost:3000/users/${id}`
}

export const deleteUsersId = async (id: number, options?: RequestInit): Promise<deleteUsersIdResponse> => {
  
  const res = await fetch(getDeleteUsersIdUrl(id),
  {      
    ...options,
    method: 'DELETE'
    
    
  }
)

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: deleteUsersIdResponse['data'] = body ? JSON.parse(body) : {}

  return { data, status: res.status, headers: res.headers } as deleteUsersIdResponse
}




export const getDeleteUsersIdMutationOptions = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteUsersId>>, TError,{id: number}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof deleteUsersId>>, TError,{id: number}, TContext> => {
    
const mutationKey = ['deleteUsersId'];
const {mutation: mutationOptions, fetch: fetchOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, fetch: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteUsersId>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteUsersId(id,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteUsersIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteUsersId>>>
    
    export type DeleteUsersIdMutationError = void

    /**
 * @summary delete user
 */
export const useDeleteUsersId = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteUsersId>>, TError,{id: number}, TContext>, fetch?: RequestInit}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteUsersId>>,
        TError,
        {id: number},
        TContext
      > => {

      const mutationOptions = getDeleteUsersIdMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    