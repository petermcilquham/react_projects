import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params:{
        key:"ed6a7400af614850b37d38d0930e02b5"
    }
})