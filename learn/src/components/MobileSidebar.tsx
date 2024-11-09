import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { Button, Separator } from "@/components/ui";
import { SidebarItem } from "@/components";
import { ClerkLoading, ClerkLoaded, UserButton, SignedIn } from "@clerk/nextjs";

import { buttonVariants } from "@/components/ui/Button";
import { getUserSubscription } from "@/server/db/queries";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/Sheet";

import { Menu } from "lucide-react";
import { Promo } from "@/components";
import { sidebarItems } from "@/constants";

const MobileSidebar = async () => {
  const userSubscriptionData = getUserSubscription();
  const user = await currentUser();

  const [userSubscription] = await Promise.all([userSubscriptionData]);

  const isPro = !!userSubscription?.isActive;

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white h-9 w-9" />
      </SheetTrigger>

      <SheetContent
        className="z-[100] flex flex-col h-full border-r-2 p-0 px-4"
        side="left"
      >
        <SheetClose asChild>
          <Link href="/learn">
            <div className="flex items-center gap-x-3 px-4 py-8">
              <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />

              <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
                KannadaMitra
              </h1>
            </div>
          </Link>
        </SheetClose>

        <div className="flex flex-1 flex-col gap-y-2">
          {sidebarItems.map((item, i) => (
            <SheetClose asChild key={i}>
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({
                    variant: "sidebarOutline",
                    className: "h-[52px] justify-start",
                  })
                )}
              >
                <Image
                  alt={item.label}
                  src={item.iconSrc}
                  height={32}
                  width={32}
                  className="mr-5 md:mr-3 lg:mr-5"
                />

                {item.label}
              </Link>
            </SheetClose>
          ))}
        </div>

        <Separator className="h-0.5" />

        <div className="flex flex-col gap-y-4 mt-4">
          <div className="flex items-center justify-center gap-x-2 mb-4">
            <ClerkLoading>
              <SignedIn>
                <Button
                  disabled
                  size="rounded"
                  className="h-[40px] w-[40px] animate-pulse bg-gray-200 ring ring-border"
                />

                <div className="flex flex-col h-[52px] w-[158px] gap-y-1 p-2">
                  <div className="h-16 bg-gray-200 animate-pulse rounded-xl" />
                  <div className="h-12 bg-gray-200 animate-pulse rounded-xl" />
                </div>
              </SignedIn>
            </ClerkLoading>

            <ClerkLoaded>
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonPopoverCard: {
                        pointerEvents: "initial",
                        width: "300px",
                      },
                      userButtonAvatarBox: {
                        height: "40px",
                        width: "40px",
                      },
                    },
                  }}
                />

                <div className="flex flex-col w-full p-2">
                  <span className="text-sm font-bold">
                    {user?.firstName || "Anon"}
                  </span>

                  <span className="text-xs font-semibold">
                    {user?.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>

        <Promo
          isMobile
          className={cn("mb-4", {
            hidden: isPro,
          })}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;