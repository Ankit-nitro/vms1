"use server";
import pool from "@/database/config";
import { revalidatePath } from "next/cache";
import { parseWithZod } from "@conform-to/zod";
import * as z from "zod";

export const CreateAction = async ( formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: formSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const name:FormDataEntryValue |  null = formData.get("name");
  const terminal_id: FormDataEntryValue | null = formData.get("terminal_id");
  const location: FormDataEntryValue | null = formData.get("location");
  // const rows: FormDataEntryValue |number| null = (formData.get("rows"));
  // const columns: FormDataEntryValue |number| null = formData.get("columns");

  const rows: number = parseInt(formData.get("rows") as string, 10) || 0;
const columns: number = parseInt(formData.get("columns") as string, 10) || 0;

  try {
    await pool.query("BEGIN");
    const machine = await pool.query(
      `INSERT INTO "VendingMachines"."vending_machine" ("name","location","rows","columns", "terminal_id") VALUES ($1, $2,$3,$4,$5) RETURNING *`,
      [name, location, rows, columns, terminal_id]
    );
    const machine_id = machine.rows[0].id;

    for (let row = 1; row <= rows; row++) {
      for (let column = 1; column <= columns; column++) {
        let slot: number | string = `${row}${column < 10 ? "0" : ""}${column}`;
        slot = parseInt(slot, 10);
        await pool.query(
          `INSERT INTO "VendingMachines"."vending_machine_stock" ("machine_id","slot","stock_limit","current_stock", "terminal_id") VALUES ($1, $2,$3,$4,$5) RETURNING *`,
          [machine_id, slot, 12, 12, terminal_id]
        );
      }
    }
    await pool.query("COMMIT");
    return {
      code: "success",
      message: "Machine has been created successfully!",
    };
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);
    return error;
  }
  revalidatePath("manage/add", "page");
};

export const AddProductAction = async (product: product) => {
  const { productId, name, description, barcode } = product;

  try {
    const result = await pool.query(
      `SELECT * FROM  "VendingMachines"."vending_machine_product" where nitropos_id=$1  `,
      [productId]
    );
    if (result.rows.length > 0) {
      return {
        code: "failed",
        message: "The product is already in the system",
      };
    }
    await pool.query("BEGIN");
    await pool.query(
      `INSERT INTO "VendingMachines"."vending_machine_product" ("name","description","barcode","nitropos_id") VALUES ($1, $2,$3,$4) `,
      [name, description, barcode, productId]
    );
    await pool.query("COMMIT");
    revalidatePath("product/add");
    return {
      code: "success",
      message: "Product has been Added successfully!",
    };
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);

    return {
      code: "failed",
      message: "server error Please try again!",
    };
  }
  // revalidatePath("manage/add", "page");
};

const formSchema = z.object({
  name: z.string().min(3),
  terminal_id: z.string().min(1),
  location: z.string().min(1),
  rows: z.string().min(1),
  columns: z.string().min(1),
});
// const productSchema = z.object({
//   name: z.string().min(3),
//   id: z.string().min(1),
//   description: z.string().min(1),
//   barcode: z.string().min(1),
// });
type product = {
  productId: number;
  nitropos_id: number;
  name: string;
  description: string;
  barcode: string;
};
