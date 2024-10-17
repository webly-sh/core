export const route = async (req: Request): Promise<Response> => {
  const formData = await req.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);

  return new Response("Login successful", { status: 200 });
};
