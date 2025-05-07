import { ChartNoAxesCombined } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  icons,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];
function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((MenuItem) => (
        <div
          key={MenuItem.id}
          onClick={() => {
            navigate(MenuItem.path);
            setOpen(false);
          }}
          className="flex text-lg items-center gap-2 rounded-md px-3 py-2 text-muted-foreground cursor-pointer hover:bg-muted hover:text-foreground"
        >
          {MenuItem.icon}
          <span>{MenuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}
const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="h-full flex flex-col">
            <SheetHeader className="border-b">
              <SheetTitle className="text-2xl font-extrabold">
                <div
                  onClick={() => navigate("/admin/dashboard")}
                  className=" flex cursor-pointer items-center gap-2 my-5"
                >
                  <ChartNoAxesCombined size={30} />
                  <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </div>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex ">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className=" flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};

export default AdminSidebar;
