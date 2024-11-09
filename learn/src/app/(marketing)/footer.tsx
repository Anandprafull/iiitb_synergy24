import Image from "next/image";
import { Button } from "@/components/ui";

const Footer = () => {
  return (
    <footer className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button
          size="lg"
          variant="defaultOutline"
          className="w-full cursor-default hover:bg-transparent"
        >
          <Image
            src="/kannada.svg"
            alt="Kannada"
            height={0}
            width={0}
            className="mr-4 rounded-md"
            style={{ height: "32px", width: "32px" }}
          />
          Kannada
        </Button>

      </div>
    </footer>
  );
};

export default Footer;
