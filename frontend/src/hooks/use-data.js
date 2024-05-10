import { useContext } from 'react';
import { DataContext } from 'src/contexts/data-context';

export const useData = () => useContext(DataContext);
