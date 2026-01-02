import "server-only";
import { getRadioInfo } from "@/http/radio";

export async function RadioName() {
  const { name } = await getRadioInfo();
  return (
    <p className="font-bold text-2xl text-inherit font-lobster">
      {name}
    </p>
  );
}
