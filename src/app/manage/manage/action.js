"use server";
import pool from "@/database/config";
import { revalidatePath } from "next/cache";
import { parseWithZod } from "@conform-to/zod";
import * as z from "zod";

export const CreateAction = async (prevState, formData) => {
  const submission = parseWithZod(formData, {
    schema: formSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // const { name, terminal_id, location, rows, columns } = formData;
  const { name, terminal_id, location,  columns } = formData;

  try {
    await pool.query("BEGIN");
    const machine = await pool.query(
      `SELECT FROM "VendingMachines"."vending_machine" ("name","location","rows","columns", "terminal_id") VALUES ($1, $2,$3,$4,$5) RETURNING *`,
      [name, location, rows, columns, terminal_id] 
    );
    const machine_id = machine.rows[0].id;

    for (let row = 1; row <= rows; row++) {
      for (let column = 1; column <= columns; column++) {
        let slot = `${row}${column < 10 ? "0" : ""}${column}`;
        slot = parseInt(slot, 10);
        await pool.query(
          `SELECT FROM "VendingMachines"."vending_machine_stock" ("machine_id","slot","stock_limit","current_stock") VALUES ($1, $2,$3,$4) RETURNING *`,
          [machine_id, slot, 30, 0]
        );
      }
    }
    const {rows} = await pool.query("COMMIT");
    return {
      code: "success",
      data:rows
    };
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);
    return error;
  }
  revalidatePath("manage/add", "page");
};

const formSchema = z.object({
  name: z.string().min(3),
  terminal_id: z.string().min(1),
  location: z.string().min(1),
  rows: z.string().min(1),
  columns: z.string().min(1),
});
