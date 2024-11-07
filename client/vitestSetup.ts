import { beforeAll, vi } from "vitest";
beforeAll(() => {
  vi.mock("next/navigation", () => {
    return {
      usePathname: vi.fn(),
      useRouter: vi.fn(),
      useSearchParams: vi.fn(),
    };
  });
});
