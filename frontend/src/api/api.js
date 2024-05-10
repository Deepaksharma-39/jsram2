import axios from "axios";
import { domain } from "src/config";

export const getPaginatedResult = async (page,rowsPerPage) => {
    const response = await axios.get(`${domain}/api/readPagination?page=${page}&pageSize=${rowsPerPage}`);
    return response.data;
};

export const searchAndPaginate= async (page,rowsPerPage,searchQuery)=>{
    const response = await axios.get(`${domain}/api/search?page=${page}&pageSize=${rowsPerPage}&searchQuery=${searchQuery}`);
    return response.data;
}

export const getUniqueCities= async ()=>{
    const response = await axios.get(`${domain}/api/uniqueCities`);
    console.log(response.data)
    return response.data
}

export const getPaginatedfilterData = async (page,rowsPerPage,filters) => {
    console.log(filters)
    try {
      const response = await axios.post(`${domain}/api/filter`, {
        filters:filters,
        page: page,
        limit: rowsPerPage
      });

      console.log(response.data); // Handle response data as needed
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
}