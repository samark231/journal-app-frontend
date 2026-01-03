import {create} from "zustand";
import api from "../api/axios";

const useGeneralStore = create(()=>({
    healthCheck: async ()=>{
        try{
            const res = await api.get("/public/health-check");
            return res.data;
        }catch(err){
            console.log("Error while checking health of backend: ", err);
        }
    },
    getDateInLocalIsoFormat: ()=>{
        const localDate = new Date();
        const offset = localDate.getTimezoneOffset() * 60000;
        const localISO = new Date(localDate.getTime() - offset).toISOString().slice(0, -1);
        return localISO;
    }
}))

export default useGeneralStore;