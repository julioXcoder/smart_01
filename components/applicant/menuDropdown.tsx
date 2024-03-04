"use client";

import { useEffect, useState, ReactNode } from "react";
import { IoMenu } from "react-icons/io5";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const MenuDropdown = () => {
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos < scrollPos) {
        setShow(true);
      } else {
        setShow(false);
      }
      setScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPos]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          size={"icon"}
          variant={"outline"}
          className={`fixed right-4 md:hidden ${
            show ? "top-[4.73rem]" : "top-2"
          }`}
        >
          <IoMenu className="size-6 flex-shrink-0" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you`&rsquo;`re
            done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-2">
          <div className="h-4 w-2/3">draft</div>
          <div className="h-4 w-2/3">programmes</div>
          <div className="h-4 w-2/3">checklist</div>
          <div className="h-4 w-2/3">finance</div>
          <div className="h-4 w-2/3">payment</div>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDropdown;
