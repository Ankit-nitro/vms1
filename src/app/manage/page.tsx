// import { Metadata } from "next";
// import { SingleMachine } from "@/components/dashboard/single-machine";
// import pool from "@/database/config";

// export const metadata: Metadata = {
//   title: "Manage Machines",
//   description: "Nitro Vending machine Dashboard.",
// };


// interface MapElements {
//   rows:number| string| null, 
//   columns:number| string| null, 
//   terminal_id:number| string| null, 
//   created_at:number| string| null,
// }
export default async function AddMachine() {
//   const machines = await pool.query(
//     `SELECT * FROM "VendingMachines".vending_machine
// ORDER BY id ASC `
//   );

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-center  mb-15 mt-10">
            <h2 className="text-3xl font-bold tracking-tight text-center">
              Manage vending machines
            </h2>
          </div>

          {/* <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
            {machines?.rows?.map((m: MapElements ) => {
              return <SingleMachine key={m?.terminal_id} {...m} />;
            })}
          </div> */}
        </div>
      </div>
    </>
  );
}
