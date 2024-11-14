"use client";
import BigSidebar from "./BigSidebar";
import { useState, useEffect, useRef } from "react";
import LoginForm from "./LoginForm";
import NavbarInner from "./NavbarInner";
import {
  useLoginCustomerQuery,
  selectAuthData,
} from "../../lib/features/auth/authSlice";
import { useAppSelector } from "../../lib/hooks";
import AccountCenter from "./AccountCenter";
import Alert from "./Alert";
import { selectAlertData } from "../../lib/features/alerts/alertsSlice";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [sidebarDropped, setSidebarDropped] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const { customerAccessToken, customer } = useAppSelector(selectAuthData);
  const { showAlert, alertMessage, alertType } =
    useAppSelector(selectAlertData);

  const pathname = usePathname();
  console.log(pathname);

  const {
    data: authenticationData,
    isLoading: authenticationLoading,
    isSuccess: authenticationSuccess,
    isError: authenticationIsError,
    error: authenticationError,
  } = useLoginCustomerQuery({
    customerAccessToken: customerAccessToken,
  });

  const yPosition = useRef(0);
  const windowWidth = useRef(0);
  const showCartRow = useRef(false);

  function closeNav() {
    const el = document.getElementById("navbar");
    const navInner = document.getElementById("navbar-inner");
    if (el && navInner) {
      el.style.transform = "translateY(-96px)";
    }
  }

  function openNav() {
    const el = document.getElementById("navbar");
    const navInner = document.getElementById("navbar-inner");

    if (el && navInner) {
      el.style.transform = "translateY(0)";
    }
  }

  function handleScroll(e: any) {
    if (sidebarDropped) {
      return;
    }
    const el = document.getElementById("navbar");
    const checkoutRow = document.getElementById("checkout-row");
    if (typeof window !== "undefined") {
      if (window.scrollY > yPosition.current && window.scrollY > 250) {
        closeNav();
      } else {
        openNav();
      }
      if (el) {
        if (window.scrollY > 250) {
          el.style.boxShadow = "2px 2px 4px #00000010";
        } else {
          el.style.boxShadow = "none";
        }
      }
      if (checkoutRow) {
        if (
          pathname === "/cart" &&
          window.scrollY > 300 &&
          window.innerWidth < 660
        ) {
          checkoutRow.style.height = "120px";
          checkoutRow.style.padding = "16px";
          checkoutRow.style.borderBottom = "1px solid #00000005";
        } else {
          checkoutRow.style.height = "0";
          checkoutRow.style.padding = "0";
          checkoutRow.style.borderBottom = "none";
        }
      }

      yPosition.current = window.scrollY;
    }
  }

  function toggleSidebar(bool: boolean) {
    const body = document.getElementById("body");
    setSidebarDropped(bool);

    if (bool && body) {
      body.style.overflow = "hidden";
    } else if (!bool && body) {
      body.style.overflow = "visible";
      toggleForm(false);
    }

    const childrenBody = document.getElementById("children-body");

    if (bool && childrenBody) {
      childrenBody.addEventListener("click", handlePageClick);
    } else if (childrenBody) {
      childrenBody.removeEventListener("click", handlePageClick);
    }
  }

  function toggleForm(bool: boolean) {
    setFormOpen(bool);
  }

  function handleResize(e: any) {
    if (windowWidth.current < 660 && window.innerWidth > 660) {
      setSidebarDropped(false);
      toggleForm(false);
      windowWidth.current = window.innerWidth;
    } else if (windowWidth.current > 660 && window.innerWidth < 660) {
      toggleForm(false);
      windowWidth.current = window.innerWidth;
    }
  }
  function handlePageClick(e: any) {
    toggleSidebar(false);
  }

  useEffect(() => {}, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    windowWidth.current = window.innerWidth;
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <nav
      id="navbar"
      className={`w-screen fixed top-0 z-30  bg-white duration-700 ease-in-out`}
    >
      <Alert
        alertMessage={alertMessage}
        showAlert={showAlert}
        alertType={alertType}
      />
      {customer.id ? (
        <AccountCenter formOpen={formOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <LoginForm formOpen={formOpen} toggleForm={toggleForm} />
      )}

      <NavbarInner
        sidebarDropped={sidebarDropped}
        toggleSidebar={toggleSidebar}
        formOpen={formOpen}
        toggleForm={toggleForm}
      />

      <BigSidebar
        sidebarDropped={sidebarDropped}
        toggleSidebar={toggleSidebar}
        toggleForm={toggleForm}
        formOpen={formOpen}
      />
      {pathname === "/cart" && (
        <div id="checkout-row" className="h-0 overflow-hidden bg-white sm:px-8">
          {" "}
          <div className="w-full flex justify-between mb-4">
            <p className="font-semibold sm:text-lg">Total:</p>
            <p className="font-semibold sm:text-lg">value</p>
          </div>
          <button className="h-12 w-full bg-[#bed3fb] hover:bg-[#2b9df0] hover:text-white font-semibold tracking-wide">
            Checkout
          </button>
        </div>
      )}
    </nav>
  );
}
