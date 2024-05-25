import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import TanStackQuery from "./TanStackQuery";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className="bg-background">
        <StoreProvider>
          <TanStackQuery>
            <main>
              <Toaster />
              {children}
            </main>
          </TanStackQuery>
        </StoreProvider>
      </body>
    </html >
  );
}
