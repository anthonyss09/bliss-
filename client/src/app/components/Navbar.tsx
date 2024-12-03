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
import CheckoutRow from "./CheckoutRow";
import {
  useGetCartQuery,
  selectCartData,
} from "../../lib/features/cart/cartSlice";

export default function Navbar() {
  const [sidebarDropped, setSidebarDropped] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const { customerAccessToken, customer } = useAppSelector(selectAuthData);
  const { showAlert, alertMessage, alertType } =
    useAppSelector(selectAlertData);

  const pathname = usePathname();

  useLoginCustomerQuery({
    customerAccessToken: customerAccessToken,
  });
  const { cartId, cartCount } = useAppSelector(selectCartData);
  useGetCartQuery(cartId);

  const yPosition = useRef(0);
  const windowWidth = useRef(0);

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

  function handleScroll() {
    if (sidebarDropped) {
      return;
    }
    const el = document.getElementById("navbar");

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

      yPosition.current = window.scrollY;
    }
  }

  function toggleSidebar(bool: boolean) {
    const body = document.getElementById("body");

    if (bool && body) {
      body.style.overflow = "hidden";
      body.style.height = "100vh";
    } else if (!bool && body) {
      body.style.overflow = "visible";
      toggleForm(false);
    }
    setSidebarDropped(bool);

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

  function handleResize() {
    if (windowWidth.current < 660 && window.innerWidth > 660) {
      setSidebarDropped(false);
      toggleForm(false);
      windowWidth.current = window.innerWidth;
    } else if (windowWidth.current > 660 && window.innerWidth < 660) {
      toggleForm(false);
      windowWidth.current = window.innerWidth;
    }
  }
  function handlePageClick() {
    toggleSidebar(false);
  }

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
    <>
      <Alert
        alertMessage={alertMessage}
        showAlert={showAlert}
        alertType={alertType}
      />{" "}
      <nav
        id="navbar"
        className={`w-screen fixed top-0 z-30  bg-white duration-700 ease-in-out`}
      >
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
        {cartCount > 0 && <CheckoutRow pathname={pathname} />}
      </nav>
    </>
  );
}
