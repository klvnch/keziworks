import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelvin (Kesi) · Links",
  description:
    "Full-stack developer links — F1 telemetry dashboard, portfolio, and social profiles.",
};

export default function BioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
