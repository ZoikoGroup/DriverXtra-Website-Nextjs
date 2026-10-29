import { fontVariables } from "./fonts";
import SignInAside from "./SignInAside";
import SignInPanel from "./SignInPanel";

export default function SignIn() {
  return (
    <div
      className={`${fontVariables} grid w-full grid-cols-1 bg-[#F2F8FC] font-[family-name:var(--font-plex)] lg:grid-cols-[749fr_691fr]`}
    >
      <SignInAside />
      <SignInPanel />
    </div>
  );
}
