import Identifiable from "../models/Identifyable";
import {useQuery, useQueryClient} from "react-query";
import CrudService from "../services/CrudService";


export const useCrudQuery = <T extends Identifiable, >(id: string, service: CrudService<T>) => {
    const queryClient = useQueryClient();
    const queryKey = `${service.path}/${id}`;

    const query = useQuery<T | undefined>({
        queryKey: queryKey,
        queryFn: async () => {
            const response = await service.read(id);
            if (!response.success) return undefined;
            return response.value;
        },
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    return {
        query: query,
        value: query.data ?? undefined,
        onSet: async (value: T) => {
            if (!service.set) return;

            await queryClient.cancelQueries(queryKey)
            const response = await service.set(value);
            if (!response.success) return;

            // naively update query state
            value.id = response.value.id;
            const previous = queryClient.getQueryData(queryKey)
            const next = queryClient.setQueryData(queryKey, () => {
                return value;
            })
            return {previous, next}
        },
        onCreate: async (value: T) => {
            await queryClient.cancelQueries(queryKey)
            const response = await service.create(value);
            if (!response.success) return;

            // naively update query state
            value.id = response.value.id;
            const previous = queryClient.getQueryData(queryKey)
            const next = queryClient.setQueryData(queryKey, () => {
                return value;
            })
            return {previous, next}
        },
        onUpdate: async (value: T) => {

            await queryClient.cancelQueries(queryKey)
            const response = await service.update(value);
            if (!response.success) return;

            // naively update query state
            const previous = queryClient.getQueryData(queryKey)
            const next = queryClient.setQueryData(queryKey, () => {
                return value;
            })
            return {previous, next}
        },
        onDelete: async (value: { id?: string } | string) => {
            await queryClient.cancelQueries(queryKey)

            const response = await service.delete(value);
            if (!response.success) return;

            queryClient.setQueryData(queryKey, () => undefined)
        },
    }
}