import SignIn from "@/components/SignIn";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

export default function Home(props: Props) {
  return (
    <div className="h-screen">
      <SignIn
        error={props.searchParams?.error}
        callbackUrl={props.searchParams?.callbackUrl}
      />
    </div>
  );
}
