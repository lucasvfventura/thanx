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
  GetRewards200,
  GetRewardsId200,
  PostRewards201,
  PostRewards422,
  PostRewardsBody,
  PutRewardsId200,
  PutRewardsIdBody
} from '.././model';





/**
 * @summary list rewards
 */
export type getRewardsResponse200 = {
  data: GetRewards200
  status: 200
}
    
export type getRewardsResponseComposite = getRewardsResponse200;
    
export type getRewardsResponse = getRewardsResponseComposite & {
  headers: Headers;
}

export const getGetRewardsUrl = () => {


  

  return `http://localhost:3000/rewards`
}

export const getRewards = async ( options?: RequestInit): Promise<getRewardsResponse> => {
  
  const res = await fetch(getGetRewardsUrl(),
  {      
    ...options,
    method: 'GET'
    
    
  }
)

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: getRewardsResponse['data'] = body ? JSON.parse(body) : {}

  return { data, status: res.status, headers: res.headers } as getRewardsResponse
}



export const getGetRewardsQueryKey = () => {
    return [`http://localhost:3000/rewards`] as const;
    }

    
export const getGetRewardsQueryOptions = <TData = Awaited<ReturnType<typeof getRewards>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRewards>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRewardsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRewards>>> = ({ signal }) => getRewards({ signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getRewards>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetRewardsQueryResult = NonNullable<Awaited<ReturnType<typeof getRewards>>>
export type GetRewardsQueryError = unknown


export function useGetRewards<TData = Awaited<ReturnType<typeof getRewards>>, TError = unknown>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRewards>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getRewards>>,
          TError,
          Awaited<ReturnType<typeof getRewards>>
        > , 'initialData'
      >, fetch?: RequestInit}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetRewards<TData = Awaited<ReturnType<typeof getRewards>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRewards>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getRewards>>,
          TError,
          Awaited<ReturnType<typeof getRewards>>
        > , 'initialData'
      >, fetch?: RequestInit}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetRewards<TData = Awaited<ReturnType<typeof getRewards>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRewards>>, TError, TData>>, fetch?: RequestInit}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary list rewards
 */

export function useGetRewards<TData = Awaited<ReturnType<typeof getRewards>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRewards>>, TError, TData>>, fetch?: RequestInit}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetRewardsQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary create reward
 */
export type postRewardsResponse201 = {
  data: PostRewards201
  status: 201
}

export type postRewardsResponse422 = {
  data: PostRewards422
  status: 422
}
    
export type postRewardsResponseComposite = postRewardsResponse201 | postRewardsResponse422;
    
export type postRewardsResponse = postRewardsResponseComposite & {
  headers: Headers;
}

export const getPostRewardsUrl = () => {


  

  return `http://localhost:3000/rewards`
}

export const postRewards = async (postRewardsBody: PostRewardsBody, options?: RequestInit): Promise<postRewardsResponse> => {
  
  const res = await fetch(getPostRewardsUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      postRewardsBody,)
  }
)

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: postRewardsResponse['data'] = body ? JSON.parse(body) : {}

  return { data, status: res.status, headers: res.headers } as postRewardsResponse
}




export const getPostRewardsMutationOptions = <TError = PostRewards422,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postRewards>>, TError,{data: PostRewardsBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof postRewards>>, TError,{data: PostRewardsBody}, TContext> => {
    
const mutationKey = ['postRewards'];
const {mutation: mutationOptions, fetch: fetchOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, fetch: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postRewards>>, {data: PostRewardsBody}> = (props) => {
          const {data} = props ?? {};

          return  postRewards(data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostRewardsMutationResult = NonNullable<Awaited<ReturnType<typeof postRewards>>>
    export type PostRewardsMutationBody = PostRewardsBody
    export type PostRewardsMutationError = PostRewards422

    /**
 * @summary create reward
 */
export const usePostRewards = <TError = PostRewards422,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postRewards>>, TError,{data: PostRewardsBody}, TContext>, fetch?: RequestInit}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postRewards>>,
        TError,
        {data: PostRewardsBody},
        TContext
      > => {

      const mutationOptions = getPostRewardsMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary show reward
 */
export type getRewardsIdResponse200 = {
  data: GetRewardsId200
  status: 200
}

export type getRewardsIdResponse404 = {
  data: void
  status: 404
}
    
export type getRewardsIdResponseComposite = getRewardsIdResponse200 | getRewardsIdResponse404;
    
export type getRewardsIdResponse = getRewardsIdResponseComposite & {
  headers: Headers;
}

export const getGetRewardsIdUrl = (id: number,) => {


  

  return `http://localhost:3000/rewards/${id}`
}

export const getRewardsId = async (id: number, options?: RequestInit): Promise<getRewardsIdResponse> => {
  
  const res = await fetch(getGetRewardsIdUrl(id),
  {      
    ...options,
    method: 'GET'
    
    
  }
)

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: getRewardsIdResponse['data'] = body ? JSON.parse(body) : {}

  return { data, status: res.status, headers: res.headers } as getRewardsIdResponse
}



export const getGetRewardsIdQueryKey = (id: number,) => {
    return [`http://localhost:3000/rewards/${id}`] as const;
    }

    
export const getGetRewardsIdQueryOptions = <TData = Awaited<ReturnType<typeof getRewardsId>>, TError = void>(id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRewardsId>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRewardsIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRewardsId>>> = ({ signal }) => getRewardsId(id, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getRewardsId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetRewardsIdQueryResult = NonNullable<Awaited<ReturnType<typeof getRewardsId>>>
export type GetRewardsIdQueryError = void


export function useGetRewardsId<TData = Awaited<ReturnType<typeof getRewardsId>>, TError = void>(
 id: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRewardsId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getRewardsId>>,
          TError,
          Awaited<ReturnType<typeof getRewardsId>>
        > , 'initialData'
      >, fetch?: RequestInit}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetRewardsId<TData = Awaited<ReturnType<typeof getRewardsId>>, TError = void>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRewardsId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getRewardsId>>,
          TError,
          Awaited<ReturnType<typeof getRewardsId>>
        > , 'initialData'
      >, fetch?: RequestInit}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetRewardsId<TData = Awaited<ReturnType<typeof getRewardsId>>, TError = void>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRewardsId>>, TError, TData>>, fetch?: RequestInit}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary show reward
 */

export function useGetRewardsId<TData = Awaited<ReturnType<typeof getRewardsId>>, TError = void>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRewardsId>>, TError, TData>>, fetch?: RequestInit}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetRewardsIdQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary update reward
 */
export type putRewardsIdResponse200 = {
  data: PutRewardsId200
  status: 200
}

export type putRewardsIdResponse422 = {
  data: void
  status: 422
}
    
export type putRewardsIdResponseComposite = putRewardsIdResponse200 | putRewardsIdResponse422;
    
export type putRewardsIdResponse = putRewardsIdResponseComposite & {
  headers: Headers;
}

export const getPutRewardsIdUrl = (id: number,) => {


  

  return `http://localhost:3000/rewards/${id}`
}

export const putRewardsId = async (id: number,
    putRewardsIdBody: PutRewardsIdBody, options?: RequestInit): Promise<putRewardsIdResponse> => {
  
  const res = await fetch(getPutRewardsIdUrl(id),
  {      
    ...options,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      putRewardsIdBody,)
  }
)

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: putRewardsIdResponse['data'] = body ? JSON.parse(body) : {}

  return { data, status: res.status, headers: res.headers } as putRewardsIdResponse
}




export const getPutRewardsIdMutationOptions = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putRewardsId>>, TError,{id: number;data: PutRewardsIdBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof putRewardsId>>, TError,{id: number;data: PutRewardsIdBody}, TContext> => {
    
const mutationKey = ['putRewardsId'];
const {mutation: mutationOptions, fetch: fetchOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, fetch: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putRewardsId>>, {id: number;data: PutRewardsIdBody}> = (props) => {
          const {id,data} = props ?? {};

          return  putRewardsId(id,data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutRewardsIdMutationResult = NonNullable<Awaited<ReturnType<typeof putRewardsId>>>
    export type PutRewardsIdMutationBody = PutRewardsIdBody
    export type PutRewardsIdMutationError = void

    /**
 * @summary update reward
 */
export const usePutRewardsId = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putRewardsId>>, TError,{id: number;data: PutRewardsIdBody}, TContext>, fetch?: RequestInit}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putRewardsId>>,
        TError,
        {id: number;data: PutRewardsIdBody},
        TContext
      > => {

      const mutationOptions = getPutRewardsIdMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary delete reward
 */
export type deleteRewardsIdResponse204 = {
  data: void
  status: 204
}

export type deleteRewardsIdResponse403 = {
  data: void
  status: 403
}
    
export type deleteRewardsIdResponseComposite = deleteRewardsIdResponse204 | deleteRewardsIdResponse403;
    
export type deleteRewardsIdResponse = deleteRewardsIdResponseComposite & {
  headers: Headers;
}

export const getDeleteRewardsIdUrl = (id: number,) => {


  

  return `http://localhost:3000/rewards/${id}`
}

export const deleteRewardsId = async (id: number, options?: RequestInit): Promise<deleteRewardsIdResponse> => {
  
  const res = await fetch(getDeleteRewardsIdUrl(id),
  {      
    ...options,
    method: 'DELETE'
    
    
  }
)

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: deleteRewardsIdResponse['data'] = body ? JSON.parse(body) : {}

  return { data, status: res.status, headers: res.headers } as deleteRewardsIdResponse
}




export const getDeleteRewardsIdMutationOptions = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteRewardsId>>, TError,{id: number}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof deleteRewardsId>>, TError,{id: number}, TContext> => {
    
const mutationKey = ['deleteRewardsId'];
const {mutation: mutationOptions, fetch: fetchOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, fetch: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteRewardsId>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteRewardsId(id,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteRewardsIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteRewardsId>>>
    
    export type DeleteRewardsIdMutationError = void

    /**
 * @summary delete reward
 */
export const useDeleteRewardsId = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteRewardsId>>, TError,{id: number}, TContext>, fetch?: RequestInit}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteRewardsId>>,
        TError,
        {id: number},
        TContext
      > => {

      const mutationOptions = getDeleteRewardsIdMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    