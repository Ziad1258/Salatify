import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import TogglerProvider, { TogglerContext } from "./context/togContext";
import NavMobile from "./components/navbar/NavMobile";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const metadata = {
  title: "Saltify",
  description:
    "Saltify is islamic website provide many services like Prayer Times and Sunnah and Qibla", 
    
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="../../public/vercel.svg" />
      </head>

      <body className={` dark:bg-dark dark:text-white ${poppins.className}`}>
      <TogglerProvider>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <NavMobile />
            <div
              className=" px-3 md:px-0 py-10  flex-1 "
              style={{ marginTop: "65px" }}
            >
              <div className="container mx-auto">{children}</div>
            </div>
            <Footer />
          </div>
        </TogglerProvider>
      </body>
    </html>
  );
}
