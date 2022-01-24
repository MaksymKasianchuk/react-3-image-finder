import axios from "axios";

const API_KEY = '20725860-716e2490a7269985c8ea1b39a';

const fetchImages = ({ searchQuery = '', currentPage = 1, pageSize = 12}) => {
    return axios
    .get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${pageSize}`,
    )
    .then(response => response.data.hits);
};
//
// eslint-disable-next-line import/no-anonymous-default-export
export default  { fetchImages };