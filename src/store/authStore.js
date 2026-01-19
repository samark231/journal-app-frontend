import {create} from "zustand";
import api from "../api/axios";
import useJournalStore from "./JournalStore";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

const useAuthStore = create(persist(
    (set, get)=>({
        user:null,
        isLoggingIn: false,
        isSigningUp:false,
        isLoading:false,

        login: async (formData)=>{
            try{
                // console.log(formData);
                set({isLoggingIn:true});
                // console.log(get().isLoggingIn);
                // await new Promise(resolve => setTimeout(resolve, 5000));
                const loginPromise = api.post("/public/login", formData);
                toast.promise(loginPromise,{
                    loading:"logging in...",
                    success:"logged in successfully",
                    error:"could not log in, check credentials",
                })
                const res = await loginPromise;
                console.log(res.data.data);
                localStorage.setItem("jwt", res.data.data.jwt);
                set({user:res.data.data.userData});
                return true;
            }catch(err){
                console.log("Error while loggin in: ", err);
                return false;
            }finally{
                set({isLoggingIn:false});
            }
            
        },
        signup: async (formData)=>{
            console.log(formData);
            try{
                set({isSigningUp:true});
                
                const signupPromise = api.post("/public/signup", formData);
                toast.promise(signupPromise,{
                    loading:"signing up...",
                    success:"Account created",
                    error:"Could not create your account...",
                })
                const res = await signupPromise;
                return await get().login({"usernameOrEmail": formData.username, "password": formData.password});
            }catch(err){
                console.log("Error while signing up:", err.response.data||err);
                throw err;
            }finally{
                set({isSigningUp:false});
            }
        },

        logout: async ()=>{
            try{
                localStorage.removeItem("jwt");
                set({user:null});
                useJournalStore.getState().cacheReset();
                toast.success("Logged out successfully.");
                // console.log("Logged out successfully.");
            }catch(err){
                console.log("Error occured while logging out: ", err);
                toast.error("Error while logging out.");
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
                set({user:res.data.data});
                // console.log("go");
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