import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";
import useAuthStore from "./authStore";

const useProfileStore = create((set,get)=>({
    updateProfile:async (formData)=>{
        try{
            const updateProfilePromise = api.patch("/user/update", formData);
            toast.promise(updateProfilePromise, {
                loading:"updating profile...",
                success:"profile updated successfully",
                error:"Could not update profile!",
            })
            const res = await updateProfilePromise;
            useAuthStore.setState((state)=>({
                user: {
                    ...state.user,
                    ...res.data.data
                }
            }))
        }catch(error){
            console.log("error in updateProfile of useProfileStore", error);
        }
        
    }
}))

export default useProfileStore;