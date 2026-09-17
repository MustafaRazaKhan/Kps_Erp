import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { EnquiryProvider } from "@/store/common/context/enquiry.context";
import { ToastContainer } from "react-toastify";
import { SidebarProvider } from "@/store/common/context/toggle.sidebar.context";
import { SchoolProvider } from "@/store/user/admin/context/school.context";
import { ClassProvider } from "@/store/user/admin/context/class.context";
import { UserProvider } from "@/store/user/admin/context/user.context";
import { FeeProvider } from "@/store/user/admin/context/fee.context";
import { StudentProvider } from "@/store/user/admin/context/student.context";
import { ThemeProvider } from "@/store/user/admin/context/theme.context";
import { ModalProvider } from "@/store/common/context/modal.context";
import "./globals.css";
import Providers from "./providers";
import { AuthProvider } from "@/store/user/admin/context/auth.context";
import { TransportProvider } from "@/store/user/admin/context/transport.context";
import { StudentPortalProvider } from "@/store/user/student/context/student-portal.context";

const OpenSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krishna Public School",
  description: "Learn,Grow,Excel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${OpenSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <ToastContainer />
          <AuthProvider>
            <ThemeProvider>
              <ModalProvider>
                <EnquiryProvider>
                  <SidebarProvider>
                    <SchoolProvider>
                      <ClassProvider>
                        <UserProvider>
                          <TransportProvider>
                            <FeeProvider>
                              <StudentProvider>
                                <StudentPortalProvider>
                                  {children}
                                </StudentPortalProvider>
                              </StudentProvider>
                            </FeeProvider>
                          </TransportProvider>
                        </UserProvider>
                      </ClassProvider>
                    </SchoolProvider>
                  </SidebarProvider>
                </EnquiryProvider>
              </ModalProvider>
            </ThemeProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
