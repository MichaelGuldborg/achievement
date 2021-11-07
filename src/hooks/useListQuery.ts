import Identifiable from "../models/Identifyable";
import {useQuery, useQueryClient} from "react-query";


export const useListQuery = <T extends Identifiable, >(queryKey: string, queryFn: () => Promise<T[]>, initial: T[]) => {
    const queryClient = useQueryClient();

    const query = useQuery<T[]>({
        queryKey: queryKey,
        queryFn: queryFn,
        initialData: initial ?? [],
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    return {
        query: query,
        elements: query.data ?? [],
        onCreate: async (value: T) => {
            await queryClient.cancelQueries(queryKey)
            const previous = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey, (old: unknown) => {
                if (!Array.isArray(old)) return [value];
                return [...old, value];
            })
            return {previous}
        },
        onUpdate: async (value: T) => {
            await queryClient.cancelQueries(queryKey)
            const previous = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey, (old: unknown) => {
                if (!Array.isArray(old)) return [value];
                const index = old.findIndex(e => e.id === value.id);
                const next = [...old];
                index === -1 ? next.unshift(value) : (next[index] = value);
                return next;
            })
            return {previous}
        },
        onDelete: async (value: T | string) => {
            queryClient.setQueryData(queryKey, (old: unknown) => {
                if (!Array.isArray(old)) return [];
                const id = typeof value === 'string' ? value : value.id;
                return old.filter(e => e.id !== id);
            })
        },
    }
}