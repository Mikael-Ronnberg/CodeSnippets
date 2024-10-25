import { redirect } from "next/navigation";
import { db } from "@/db";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // This is a server action!

    "use server";

    //Check the users inputs and make sure theryre valid
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

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

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        <button type="submit" className=" rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
