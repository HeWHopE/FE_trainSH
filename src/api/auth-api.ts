import { toast } from "react-toastify";

interface AuthPayload {
  email: string;
  password: string;
  name?: string;
}

export const signIn = async ({
  email,
  password,
}: AuthPayload): Promise<
  { access_token: string; refresh_token: string } | undefined
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Sign-in failed");
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    toast.error("Failed to login");
    // Return undefined or handle it differently if needed
    return undefined;
  }
};

export const signUp = async ({ email, password, name }: AuthPayload) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Sign-up failed");
    }

    return await response.json();
  } catch (err) {
    console.log(err);

    toast.error("Faild to login");
  }
};
