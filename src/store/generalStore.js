import {create} from "zustand";
import api from "../api/axios";
import {persist,createJSONStorage} from "zustand/middleware";

const useGeneralStore = create((set, get)=>({
    backendStatus:"idle", 
    handleHealthCheck :async () => {
        set({backendStatus:'checking'});
        try {
            const res = await get().healthCheck();
            set({backendStatus:res});
            setTimeout(() => set({backendStatus:"idle"}), 3000);
        } catch (err) {
            console.log("Error In handleHealthCheck ", err);
            set({backendStatus:'error'});
        }
    },
    healthCheck: async ()=>{
        try{
            // console.log("sending req for health check");
            const res = await api.get("/public/health-check");
            console.log(res);
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