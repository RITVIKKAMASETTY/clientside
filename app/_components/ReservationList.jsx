"use client"
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";
export default function ReservationList({bookings}) {
  const [optimisticBookings,optimisticDelete]=useOptimistic(bookings,(curBookings,id)=>{return curBookings.filter((booking)=>booking.id!==id);});//if adding new state [...curbookings,newBooking]
  async function handleDelete(id){
    optimisticDelete(id);
    await deleteReservation(id);
  }
  return (
    <ul className="space-y-6">
    {optimisticBookings.map((booking) => (
      <ReservationCard booking={booking} key={booking.id} onDelete={handleDelete}/>
    ))}
  </ul>
  )
}
