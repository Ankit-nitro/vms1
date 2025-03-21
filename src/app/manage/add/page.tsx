import { Metadata } from "next";
import { AddMachineForm } from "@/components/dashboard/add-machine-form";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Nitro Vending machine Dashboard.",
};

export default function AddMachine() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Add a vending machine
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 ">
            <AddMachineForm />
          </div>
        </div>
      </div>
    </>
  );
}
