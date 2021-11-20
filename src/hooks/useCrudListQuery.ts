import Identifiable from "../models/Identifyable";
import {useQuery, useQueryClient} from "react-query";
import CrudService from "../services/CrudService";
import {createRef, useState} from "react";
import {RestErrorResponse} from "../models/RestResponse";
import snackbar from "../services/snackbar";


export const useCrudListQuery = <T extends Identifiable, >(service: CrudService<T>) => {
    const queryClient = useQueryClient();
    const queryKey = service.path;

    const [selected, setSelected] = useState<T | undefined>();
    const submitButtonRef = createRef<HTMLButtonElement>();
    const query = useQuery<T[]>({
        queryKey: queryKey,
        queryFn: async () => {
            const response = await service.readAll();
            if (!response.success) return [];
            return response.value;
        },
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const showError = (response: RestErrorResponse) => {
        return snackbar.showFeedback(response.feedback);
    }

    const onCreate = async (value: T) => {
        await queryClient.cancelQueries(queryKey)
        const response = await service.create(value);
        if (!response.success) {
            return showError(response);
        }

        // naively update query state
        value.id = response.value.id;
        const previous = queryClient.getQueryData(queryKey)
        const next = queryClient.setQueryData(queryKey, (old: unknown) => {
            if (!Array.isArray(old)) return [value];
            return [value, ...old];
        })
        return {previous, next}
    }


    return {
        query: query,
        elements: query.data ?? [],
        selected,
        setSelected,
        submitButtonRef,
        onCreate,
        onSet: async (value: T) => {
            if (!service.set) return;

            await queryClient.cancelQueries(queryKey)
            const response = await service.set(value);
            if (!response.success) {
                return showError(response)
            }
        },
        onUpdate: async (value: T) => {
            if (!value.id) return onCreate(value);

            await queryClient.cancelQueries(queryKey)
            const response = await service.update(value);
            if (!response.success) {
                return showError(response);
            }

            // naively update query state
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
        onDelete: async (value: { id?: string } | string) => {
            await queryClient.cancelQueries(queryKey)

            const response = await service.delete(value);
            if (!response.success) {
                return showError(response);
            }

            // naively update query state
            queryClient.setQueryData(queryKey, (old: unknown) => {
                if (!Array.isArray(old)) return [];
                const id = typeof value === 'string' ? value : value.id;
                return old.filter(e => e.id !== id);
            })
        },
    }
}