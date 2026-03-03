import VerifyOTPPage from "@/components/partnerDashboard/VerifyOtp";

export default function Page({ searchParams }: { searchParams?: any }) {
  const email = searchParams?.email || "";
  return <VerifyOTPPage searchParams={{ email }} />;
}