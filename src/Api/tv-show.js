import axios from "axios";
import { FAKE_POPULARS ,FAKE_RECOMMENDATIONS} from "./fake_data";
import {base_url,api_key_param} from '../config'
export class TVShowAPI{
    static async fetchPopulars(){
        const response=await axios.get(`${base_url}tv/popular${api_key_param}`);
        console.log(response.data.results);
        return response.data.results;
        // return FAKE_POPULARS;
    }
    static async fetchRecommendations(tvShowId){
        const response=await axios.get(`${base_url}tv/${tvShowId}/recommendations${api_key_param}`);
        console.log(response.data.results);
        return response.data.results;
        // return FAKE_RECOMMENDATIONS;
    }
    static async fetchByTitle(title){
        const response=await axios.get(`${base_url}search/tv${api_key_param}&query=${title}`);
        console.log(response.data.results);
        return response.data.results;
        // return FAKE_RECOMMENDATIONS;
    }
}