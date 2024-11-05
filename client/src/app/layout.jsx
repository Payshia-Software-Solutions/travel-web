import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import PageFooter from "./Components/footer/footer";
import PageHeader from "./Components/header/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ceylon Odyssey",
  description: "Perfect Destination Awaits",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <PageHeader />
        <div className="content-container">{children}</div>
        <PageFooter />
      </body>
    </html>
  );
}
