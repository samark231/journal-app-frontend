import {create} from "zustand";
import api from "../api/axios";
import useJournalStore from "./JournalStore";
import { persist } from "zustand/middleware";

const useAuthStore = create(persist(
    (set, get)=>({
        user:null,
        isLogginIn: false,
        isLoading:false,

        login: async (formData)=>{
            try{
                // console.log(formData);
                set({isLogginIn:true});
                const res = await api.post("/public/login", formData);
                console.log(res);
                localStorage.setItem("jwt", res.data.token);
                set({user:res.data.user});
                // console.log("logged in Successfully.");
            }catch(err){
                console.log("Error while loggin in: ", err);
            }finally{
                set({isLogginIn:false});
            }
            
        },
        signup: async (formData)=>{
            // console.log(formData);
            try{
                const res = await api.post("/public/signup", formData);
                // console.log(res);
                await get().login({"usernameOrEmail": formData.username, "password": formData.password});
            }catch(err){
                console.log("Error while signing up:", err.response.data||err);
                throw err;
            }
        },

        logout: async ()=>{
            try{
                localStorage.removeItem("jwt");
                set({user:null});
                useJournalStore.getState().cacheReset();
                // console.log("Logged out successfully.");
            }catch(err){
                console.log("Error occured while logging out: ", err);
            }
            
        },
        checkAuth: async ()=>{
            try{
                set({isLoading:true})
                const token = localStorage.getItem("jwt");
                if(!token){
                    set({user:null, isLoading:false});
                    return;
                }
                const res = await api.get("/user/check-auth");
                console.log("checking auth...", res.data);
                set({user:res.data});
                // console.log(res);
            }catch(err){
                // console.log("Error while checking Auth:", err);
                localStorage.removeItem("jwt");
                set({user:null});
            }finally{
                set({isLoading:false});
            }
        }
    }),
    {
        name: "auth-storage",
        partialize: (state) => ({ user: state.user }),
    }
));

export default useAuthStore;