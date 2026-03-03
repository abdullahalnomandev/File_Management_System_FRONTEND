import VerifyOTP from "./VerifyOTP";

export default function VerifyOTPPage({ searchParams }: { searchParams: { email?: string } }) {
  return <VerifyOTP email={searchParams.email || ""} />;
}