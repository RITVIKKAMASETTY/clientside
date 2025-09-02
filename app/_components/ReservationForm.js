"use client";
import { differenceInDays } from "date-fns";
import { createReservation } from "../_lib/actions";
import { useReservation } from "./ReservationContext";
function ReservationForm({ cabin,user }) {
  const { range,resetRange } = useReservation();
  const { maxCapacity, regularprice, discount,id} = cabin;
  const startdate=range.from;const enddate=range.to;const numnights=differenceInDays(enddate,startdate);const cabinprice=((regularprice-discount)*numnights);const bookingDate={startdate,enddate,numnights,cabinprice,cabinid:id};console.log(JSON.stringify(bookingDate)+"hsbsbsh");const createReservationWithData=createReservation.bind(null,bookingDate);
  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>
      <form action={async (formData)=>{ await createReservationWithData(formData);
        resetRange();}} className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numguests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
// "use client";
// import { differenceInDays } from "date-fns";
// import { createReservation } from "../_lib/actions";
// import { useReservation } from "./ReservationContext";

// function ReservationForm({ cabin, user }) {
//   const { range } = useReservation();
//   const { maxCapacity, regularprice, discount, id } = cabin;

//   // Handle submit manually to always get fresh values
//   async function handleSubmit(formData) {
//     if (!range?.from || !range?.to) {
//       alert("Please select start and end dates");
//       return;
//     }

//     const startdate = range.from;
//     const enddate = range.to;
//     const numnights = differenceInDays(enddate, startdate);
//     const cabinprice = (regularprice - discount) * numnights;

//     const bookingDate = {
//       startdate,
//       enddate,
//       numnights,
//       cabinprice,
//       cabinid: id,
//       numguests: formData.get("numguests"),
//       observations: formData.get("observations"),
//     };

//     console.log("📦 Booking Data:", bookingDate);
//     await createReservation(bookingDate);
//   }

//   return (
//     <div className="scale-[1.01]">
//       {/* Header */}
//       <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
//         <p>Logged in as</p>

//         <div className="flex gap-4 items-center">
//           <img
//             referrerPolicy="no-referrer"
//             className="h-8 rounded-full"
//             src={user.image}
//             alt={user.name}
//           />
//           <p>{user.name}</p>
//         </div>
//       </div>

//       {/* Form */}
//       <form
//         action={handleSubmit}
//         className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
//       >
//         {/* Guests */}
//         <div className="space-y-2">
//           <label htmlFor="numGuests">How many guests?</label>
//           <select
//             name="numguests"
//             id="numGuests"
//             className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
//             required
//           >
//             <option value="">Select number of guests...</option>
//             {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
//               <option value={x} key={x}>
//                 {x} {x === 1 ? "guest" : "guests"}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Notes */}
//         <div className="space-y-2">
//           <label htmlFor="observations">
//             Anything we should know about your stay?
//           </label>
//           <textarea
//             name="observations"
//             id="observations"
//             className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
//             placeholder="Any pets, allergies, special requirements, etc.?"
//           />
//         </div>

//         {/* Submit */}
//         <div className="flex justify-end items-center gap-6">
//           <p className="text-primary-300 text-base">
//             {range?.from && range?.to
//               ? `From ${range.from.toDateString()} to ${range.to.toDateString()}`
//               : "Start by selecting dates"}
//           </p>

//           <button
//             disabled={!range?.from || !range?.to}
//             className="bg-accent-500 px-8 min-w-[200px] py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
//           >
//             {!range?.from || !range?.to ? "Select dates" : "Reserve now"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ReservationForm;
