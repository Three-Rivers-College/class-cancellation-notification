import { useCache, useData } from '@ellucian/experience-extension-utils';

const cacheKey = 'cancellationCard:Person';

export const useFetchPerson = (setPerson) => {
    const { getEthosQuery }  = useData();
    const {  getItem, storeItem  } = useCache();

    const fetchData = async () => {
        const { data: cachedData, expired: cachedDataExpired = true } = await getItem({ key: cacheKey });

        if (cachedData) {
            setPerson(cachedData);
        }
        if (cachedDataExpired || cachedData === undefined) {
            try {
                const personsData = await getEthosQuery({ queryId: 'getPerson' });
                const { data: { persons: { edges: personEdges } = [] } = {} } = personsData;
                const persons = personEdges.map(edge => edge.node);
                setPerson(persons);
                storeItem({ key: cacheKey, data: persons });
                return undefined;
            } catch (error) {
                console.error('ethosQuery failed', error);
                return error;
            }
        }

        return cachedData;
    };

    return { fetchData };
};
