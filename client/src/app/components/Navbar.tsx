"use client";
import BigSidebar from "./BigSidebar";
import { useState, useEffect, useRef } from "react";
import LoginForm from "./LoginForm";
import NavbarInner from "./NavbarInner";

export default function Navbar() {
  const [sidebarDropped, setSidebarDropped] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const yPosition = useRef(0);
  const windowWidth = useRef(0);

  function closeNav() {
    const el = document.getElementById("navbar");
    const navInner = document.getElementById("navbar-inner");
    if (el && navInner) {
      el.style.height = "0";
      navInner.style.height = "0";
      navInner.style.overflowY = "hidden";
    }
  }

  function openNav() {
    const el = document.getElementById("navbar");
    const navInner = document.getElementById("navbar-inner");

    if (el && navInner) {
      el.style.height = "96px";
      navInner.style.height = "100%";
      navInner.style.overflowY = "visible";
    }
  }

  function handleScroll(e: any) {
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
          el.style.boxShadow = "4px 4px 10px rgb(180,180,180)";
        } else {
          el.style.boxShadow = "none";
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
    setSidebarDropped(false);
    if (windowWidth.current < 660 && window.innerWidth > 660) {
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
      <LoginForm formOpen={formOpen} toggleForm={toggleForm} />
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
    </nav>
  );
}
