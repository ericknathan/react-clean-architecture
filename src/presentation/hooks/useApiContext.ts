import { useContext } from 'react';
import { ApiContext } from '@/presentation/contexts';

export function useApiContext() {
    return useContext(ApiContext);
}