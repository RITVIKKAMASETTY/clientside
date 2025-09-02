"use server";
import { redirect } from "next/navigation";
import { supabase } from "./supabase";
import { signIn, signOut,auth } from "@/app/_lib/auth";
import { updateGuest } from "./data-service";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service"; 
export async function signInAction() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}

export async function updateForm(formData){//all form data automatically comes with using native form data api
    const session=await auth();
    if(!session){
        throw new Error("You must be signed in");
    }
const nationalid=formData.get("nationalid");
const [nationality,countryflag]=formData.get("nationality").split("%");
if(!/^[a-zA-Z0-9]{6,8}$/.test(nationalid)){
    throw new Error("please provide valid national id");
}
await updateGuest(session.user.guestid,{nationalid,nationality,countryflag});
revalidatePath("/account");//revalidate after doing serveraction
console.log("Updating guest with id:", session.user.guestid);
}
export async function deleteReservation(bookingid){
    const session=await auth();
    if(!session){
        throw new Error("You must be signed in");
    }
    const guestBookings=await getBookings(session.user.guestid);
    const bookingToDelete=guestBookings.find((booking)=>booking.id===bookingid);
    if(!bookingToDelete){
        throw new Error("Booking not found");
    }
   const {error}= await supabase.from("bookings").delete().eq("id",bookingid);
   if(error){
    console.error(error);
    throw new Error("Booking could not be deleted");
   }
    revalidatePath("/account/reservations");
}
export async function updateReservation(formData){
    const bookingid=formData.get("bookingId");
    const session=await auth();
    if(!session){
        throw new Error("You must be signed in");
    }
    const guestBookings=await getBookings(session.user.guestid);
    const guestBooking=guestBookings.map((booking)=>booking.id);
    if(!guestBooking.includes(Number(bookingid))){
        throw new Error("Booking not found");
    }
//     const bookingToUpdate=guestBookings.find((booking)=>booking.id===bookingid);
//     if(!bookingToUpdate){
//         throw new Error("Booking not found");
//     }
    const numGuests=formData.get("numGuests").slice(0,1000);
    const observations=formData.get("observations").slice(0,1000);
    console.log(numGuests,observations+"iuqbwnkw2qow2qd");
    if(isNaN(numGuests)||numGuests<1||numGuests>10){
        throw new Error("Please provide valid number of guests");
    }
   const {error}= await supabase.from("bookings").update({numguests:numGuests,observation:observations}).eq("id",bookingid);
   if(error){
    console.error(error);
    throw new Error("Booking could not be updated");
   } revalidatePath("/account/reservations/edit/"+bookingid);
   redirect("/account/reservations");
}
export async function createReservation(bookingData,formdata){
    const session=await auth();
    if(!session){
        throw new Error("You must be signed in");
    }
   const newBooking={...bookingData,gustid:session.user.guestid,numguests:Number(formdata.get("numguests")),observation:formdata.get("observations").slice(0,1000),extraprice:0,totalprice:bookingData.cabinprice,ispaid:false,hasbreakfast:false,status:"unconfirmed"};console.log(newBooking);
   const {error}=await supabase.from("bookings").insert([newBooking]);
   if(error){
    console.error(error);
    throw new Error("Booking could not be created");
   }
   revalidatePath(`/cabins/${bookingData.cabinid}`);redirect("/thankyou");
}