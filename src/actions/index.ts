"use server";
import { redirect } from "next/navigation";
import { db } from "@/db";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippet/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  //Check the users inputs and make sure theryre valid
  const title = formData.get("title");
  const code = formData.get("code");

  if (typeof title !== "string" || title.length < 3) {
    return {
      message: "Title must be longer",
    };
  }
  if (typeof code !== "string" || title.length < 10) {
    return {
      message: "Code must be longer",
    };
  }

  //Create a new record in the database

  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });
  //redirect the user back to root route

  redirect("/");
}
